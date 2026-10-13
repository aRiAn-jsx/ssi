// Forwards website form submissions to the SSI holding Telegram bot.
// This file exists only for the Telegram bot integration: the bot stores each
// submission and notifies its admins.
//
// Environment variables (nothing is sent unless both are set):
//   BOT_FORMS_URL     base URL of the bot's HTTP server, e.g. https://bot.example.com
//   BOT_FORMS_SECRET  shared secret (SITE_FORMS_SECRET in the bot's .env)
import { createHmac } from 'crypto';

const SITE = 'ssi';
const RETRY_DELAYS_MS = [0, 2000, 8000];
const TIMEOUT_MS = 5000;

export interface BotFormPayload {
  form: string;
  form_title: string;
  site_ref: string;
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  fields?: Record<string, string>;
  page?: string;
}

async function send(url: string, secret: string, body: string): Promise<void> {
  // Signature: HMAC-SHA256 over "timestamp.body" — the secret never travels on the wire.
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
  const response = await fetch(`${url}/api/forms/${SITE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forms-Timestamp': timestamp,
      'X-Forms-Signature': `sha256=${signature}`,
    },
    body,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  // A 4xx will not be fixed by retrying (wrong secret or bad payload).
  if (response.status >= 500) throw new Error(`bot responded ${response.status}`);
  if (!response.ok) console.warn(`[bot-forms] rejected by bot: ${response.status}`);
}

// Call without awaiting so the visitor's response never waits for the bot. Never throws.
export async function forwardToBot(payload: BotFormPayload): Promise<void> {
  const url = (process.env.BOT_FORMS_URL || '').replace(/\/+$/, '');
  const secret = process.env.BOT_FORMS_SECRET || '';
  if (!url || !secret) return;

  const body = JSON.stringify(payload);
  for (const delay of RETRY_DELAYS_MS) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    try {
      await send(url, secret, body);
      return;
    } catch (err) {
      console.warn(`[bot-forms] ${payload.form} ${payload.site_ref} not delivered: ${(err as Error).message}`);
    }
  }
}
