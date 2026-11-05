import React, { useEffect, useRef } from 'react';

/**
 * Procedural WebGL moon.
 *
 * 1. Bake: a fragment shader writes an equirectangular map (1024×512) of the
 *    moon surface — craters at three scales + maria — as RGB = object-space
 *    bumped normal, A = albedo. It is baked in row strips over a few frames
 *    so no single frame stalls the GPU.
 * 2. Frame: a full-canvas shader ray-casts a sphere, looks up the baked map
 *    under the current rotation and lights it with a soft terminator, limb
 *    darkening, earthshine and an outer halo.
 *
 * Loop runs only while on screen and the tab is visible; dragging spins it.
 */

const MAP_W = 1024;
const MAP_H = 512;
const STRIP = 32; // rows baked per frame

const PRECISION = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const BAKE_FRAG = `${PRECISION}
uniform vec2 uSize;
uniform float uMode; // 0: normal + albedo, 1: maria + rays

float hash1(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
vec3 hash3(vec3 p) {
  p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(p) * 43758.5453);
}
float noise(vec3 x) {
  vec3 i = floor(x); vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash1(i), hash1(i + vec3(1, 0, 0)), f.x), mix(hash1(i + vec3(0, 1, 0)), hash1(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash1(i + vec3(0, 0, 1)), hash1(i + vec3(1, 0, 1)), f.x), mix(hash1(i + vec3(0, 1, 1)), hash1(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float s = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * noise(p); p *= 2.03; a *= 0.5; }
  return s;
}
float craters(vec3 p, float density) {
  vec3 i = floor(p); vec3 f = fract(p);
  float h = 0.0;
  for (int z = -1; z <= 1; z++)
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 o = hash3(i + g);
    if (o.z > density) continue;
    float r = 0.22 + 0.33 * hash1(i + g + 7.31);
    float d = length(g + o - f) / r;
    if (d < 1.7) {
      float bowl = (d * d - 1.0) * step(d, 1.0);
      float rim = exp(-pow((d - 1.0) / 0.2, 2.0)) * 0.42;
      h += bowl * 0.65 + rim;
    }
  }
  return h;
}
// near-side maria as seen from Earth (north up, +x = east/right, +z = toward viewer)
float cap(vec3 q, vec3 c, float r) {
  float d = acos(clamp(dot(q, normalize(c)), -1.0, 1.0));
  return exp(-pow(d / r, 2.0));
}
float maria(vec3 q) {
  float m = 0.0;
  m += cap(q, vec3(-0.6, 0.12, 0.79), 0.5);    // Oceanus Procellarum
  m += cap(q, vec3(-0.34, 0.54, 0.77), 0.36);  // Imbrium
  m += cap(q, vec3(0.24, 0.47, 0.85), 0.18);   // Serenitatis
  m += cap(q, vec3(0.42, 0.14, 0.9), 0.22);    // Tranquillitatis
  m += cap(q, vec3(0.8, 0.27, 0.54), 0.12);    // Crisium
  m += cap(q, vec3(0.6, -0.1, 0.79), 0.15);    // Fecunditatis
  m += cap(q, vec3(0.5, -0.27, 0.82), 0.1);    // Nectaris
  m += cap(q, vec3(-0.18, -0.36, 0.91), 0.17); // Nubium
  m += cap(q, vec3(-0.56, -0.4, 0.73), 0.11);  // Humorum
  m += cap(q, vec3(0.05, 0.72, 0.69), 0.16);   // Frigoris
  m += (fbm(q * 3.5 + vec3(3.1, 1.7, 0.4)) - 0.5) * 0.9 + (fbm(q * 9.0) - 0.5) * 0.35;
  return smoothstep(0.3, 0.72, m);
}
// two landmark craters with bright ray systems (Tycho / Copernicus-like)
const vec3 C1 = vec3(-0.13, -0.69, 0.71); // Tycho
const vec3 C2 = vec3(-0.33, 0.17, 0.93);  // Copernicus
float landmark(vec3 q, vec3 c, float rc) {
  float d = acos(clamp(dot(q, normalize(c)), -1.0, 1.0)) / rc;
  if (d > 1.9) return 0.0;
  return (d * d - 1.0) * step(d, 1.0) * 0.7
    + exp(-pow((d - 1.0) / 0.32, 2.0)) * 0.45
    + exp(-pow(d / 0.22, 2.0)) * 0.3; // central peak
}
float rays(vec3 q, vec3 c, float rc) {
  vec3 cn = normalize(c);
  float d = acos(clamp(dot(q, cn), -1.0, 1.0));
  vec3 up = abs(cn.y) > 0.9 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 b1 = normalize(cross(up, cn));
  vec3 b2 = cross(cn, b1);
  vec3 v = q - cn * dot(q, cn);
  float az = atan(dot(v, b2), dot(v, b1));
  // wispy streaks: angular noise, broken up along their length
  float streak = noise(vec3(cos(az) * 6.0, sin(az) * 6.0, 1.7)) * 0.55 + noise(vec3(cos(az) * 17.0, sin(az) * 17.0, 4.1)) * 0.45;
  streak = smoothstep(0.5, 0.95, streak);
  float breakup = smoothstep(0.25, 0.75, fbm(q * 9.0 + 2.3));
  float halo = exp(-pow((d - rc * 1.3) / (rc * 0.9), 2.0)) * 0.45; // bright ejecta blanket
  return (streak * breakup * exp(-d * 1.7) + halo) * smoothstep(rc * 0.95, rc * 1.4, d);
}
float height(vec3 q) {
  float m = maria(q);
  float keep = 1.0 - 0.85 * m; // maria are smooth lava plains
  float h = 0.35 * craters(q * 2.4, 0.1) * keep + 0.45 * craters(q * 6.0, 0.2) * keep + 0.32 * craters(q * 15.0, 0.32) * keep;
  h += landmark(q, C1, 0.05) + landmark(q, C2, 0.055);
  return h + (fbm(q * 22.0) - 0.5) * 0.18 * keep;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float lon = (uv.x - 0.5) * 6.2831853;
  float lat = (uv.y - 0.5) * 3.1415927;
  vec3 q = vec3(cos(lat) * cos(lon), sin(lat), cos(lat) * sin(lon));

  if (uMode > 0.5) {
    float ry = max(rays(q, C1, 0.05), rays(q, C2, 0.055) * 0.7);
    gl_FragColor = vec4(maria(q), ry, 0.0, 1.0);
    return;
  }

  vec3 up = abs(q.y) > 0.98 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 t1 = normalize(cross(up, q));
  vec3 t2 = cross(q, t1);
  float e = 0.004;
  float h0 = height(q);
  float h1 = height(normalize(q + e * t1));
  float h2 = height(normalize(q + e * t2));
  vec3 n = normalize(q - 0.016 * ((h1 - h0) / e * t1 + (h2 - h0) / e * t2));

  float m = maria(q);
  float alb = mix(0.82, 0.54, m)
    + (fbm(q * 5.0) - 0.5) * 0.16          // regional mottling
    + (fbm(q * 14.0) - 0.5) * 0.12 * m     // texture inside the maria
    + (fbm(q * 48.0) - 0.5) * 0.16;        // fine grain
  alb += clamp(h0, 0.0, 1.0) * 0.06 - clamp(-h0, 0.0, 1.0) * 0.02;
  alb += smoothstep(0.84, 1.0, noise(q * 95.0)) * 0.2 * (1.0 - 0.4 * m); // tiny bright craters

  gl_FragColor = vec4(n * 0.5 + 0.5, clamp(alb, 0.0, 1.0));
}
`;

const FRAME_FRAG = `${PRECISION}
uniform sampler2D uTex;
uniform sampler2D uTex2;
uniform vec2 uRes;
uniform mat3 uR;
uniform mat3 uRinv;
uniform vec3 uLight;
uniform vec3 uTint;
uniform vec3 uGlow;
uniform float uGlowAmt;
uniform float uEarthshine;
uniform float uReady;

void main() {
  float s = min(uRes.x, uRes.y);
  vec2 p = (gl_FragCoord.xy * 2.0 - uRes) / s / 0.88;
  float r = length(p);
  float aa = 2.5 / (s * 0.44);

  // halo fades out well before the canvas edge (r = 1/0.88 at mid-edges) so no box shows
  float halo = uGlowAmt * exp(-max(r - 1.0, 0.0) * 14.0) * smoothstep(1.0 - aa, 1.0 + aa, r) * (1.0 - smoothstep(1.03, 1.12, r));
  vec4 outc = vec4(uGlow * halo, halo);

  if (r < 1.0 + aa) {
    vec3 nv = vec3(p, sqrt(max(1.0 - r * r, 0.0)));
    vec3 q = uRinv * nv;
    float lon = atan(q.z, q.x);
    float lat = asin(clamp(q.y, -1.0, 1.0));
    vec2 uv = vec2(lon / 6.2831853 + 0.5, lat / 3.1415927 + 0.5);
    vec4 t = texture2D(uTex, uv);
    vec4 t2 = texture2D(uTex2, uv);
    vec3 nb = normalize(uR * (t.rgb * 2.0 - 1.0));

    // near-neutral grey; maria a touch cooler, bright ejecta rays
    vec3 surface = mix(vec3(1.0, 0.985, 0.96), vec3(0.94, 0.955, 0.99), t2.r);
    float albedo = t.a + t2.g * 0.32;

    // Lommel-Seeliger: why the real moon looks like a flat, evenly lit disc
    float mu0 = dot(nb, uLight);
    float mu = max(nv.z, 0.05);
    float ls = 2.0 * max(mu0, 0.0) / (max(mu0, 0.0) + mu);
    float soft = smoothstep(-0.03, 0.09, dot(nv, uLight)); // soft terminator
    vec3 col = uTint * surface * albedo * ls * soft * 1.02;
    col = mix(col, col * col * (3.0 - 2.0 * clamp(col, 0.0, 1.0)), 0.25);
    float night = 1.0 - smoothstep(-0.15, 0.2, dot(nv, uLight));
    col += uTint * uEarthshine * t.a * night;

    float a = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, r);
    outc = vec4(col * a, a) + outc * (1.0 - a);
  }
  gl_FragColor = outc * uReady;
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[moon] shader:', gl.getShaderInfoLog(sh));
  }
  return sh;
};
const program = (gl: WebGLRenderingContext, frag: string) => {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  return p;
};

// column-major 3×3 rotation: R = Rx(pitch) · Ry(yaw)
const rotation = (yaw: number, pitch: number) => {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  // rows of R
  const r = [
    [cy, 0, sy],
    [sp * sy, cp, -sp * cy],
    [-cp * sy, sp, cp * cy],
  ];
  const R = new Float32Array([r[0][0], r[1][0], r[2][0], r[0][1], r[1][1], r[2][1], r[0][2], r[1][2], r[2][2]]);
  const Rinv = new Float32Array([r[0][0], r[0][1], r[0][2], r[1][0], r[1][1], r[1][2], r[2][0], r[2][1], r[2][2]]);
  return { R, Rinv };
};

interface MoonProps {
  className?: string;
  isDark?: boolean;
  /** radians per second */
  speed?: number;
  /** fired once, when the surface is baked and the moon has faded in */
  onReady?: () => void;
}

export const Moon: React.FC<MoonProps> = ({ className = '', isDark = false, speed = 0.05, onReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(isDark);
  darkRef.current = isDark;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) {
      canvas.parentElement?.classList.add('moon-fallback');
      onReadyRef.current?.();
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const bakeProg = program(gl, BAKE_FRAG);
    const frameProg = program(gl, FRAME_FRAG);
    const bindQuad = (prog: WebGLProgram) => {
      const loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    // surface map (POT so S can wrap across the date line)
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, MAP_W, MAP_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // second map: maria mask + ray streaks (cheap; baked in one go)
    const tex2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, MAP_W, MAP_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo2 = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo2);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex2, 0);
    gl.viewport(0, 0, MAP_W, MAP_H);
    gl.useProgram(bakeProg);
    bindQuad(bakeProg);
    gl.uniform2f(gl.getUniformLocation(bakeProg, 'uSize'), MAP_W, MAP_H);
    gl.uniform1f(gl.getUniformLocation(bakeProg, 'uMode'), 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    let bakedRows = 0;
    const bakeStep = () => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, MAP_W, MAP_H);
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0, bakedRows, MAP_W, STRIP);
      gl.useProgram(bakeProg);
      bindQuad(bakeProg);
      gl.uniform2f(gl.getUniformLocation(bakeProg, 'uSize'), MAP_W, MAP_H);
      gl.uniform1f(gl.getUniformLocation(bakeProg, 'uMode'), 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.disable(gl.SCISSOR_TEST);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      bakedRows += STRIP;
    };

    const U = (n: string) => gl.getUniformLocation(frameProg, n);
    const u = {
      tex: U('uTex'), tex2: U('uTex2'), res: U('uRes'), R: U('uR'), Rinv: U('uRinv'), light: U('uLight'), tint: U('uTint'),
      glow: U('uGlow'), glowAmt: U('uGlowAmt'), earth: U('uEarthshine'), ready: U('uReady'),
    };
    // sun from the upper right, slightly in front: a waxing-gibbous look
    const L = [0.6, 0.06, 0.8];
    const Ln = Math.hypot(L[0], L[1], L[2]);

    // size
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // rotation + drag
    // tidally locked: the near side (+z) faces us; only a slow libration sway
    let yaw = 0;
    let pitch = 0.04;
    let clock = 0;
    let dragYaw = 0;
    let velocity = 0;
    let drag: { x: number; y: number } | null = null;
    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      velocity = 0;
      canvas.style.cursor = 'grabbing';
      try { canvas.setPointerCapture(e.pointerId); } catch { /* noop */ }
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      dragYaw -= dx * 0.006;
      pitch = Math.max(-0.6, Math.min(0.6, pitch + dy * 0.004));
      velocity = -dx * 0.006;
      drag = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      drag = null;
      canvas.style.cursor = 'grab';
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    let ready = 0;
    const draw = () => {
      const dark = darkRef.current;
      const { R, Rinv } = rotation(yaw, pitch);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(frameProg);
      bindQuad(frameProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(u.tex, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, tex2);
      gl.uniform1i(u.tex2, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniformMatrix3fv(u.R, false, R);
      gl.uniformMatrix3fv(u.Rinv, false, Rinv);
      gl.uniform3f(u.light, L[0] / Ln, L[1] / Ln, L[2] / Ln);
      if (dark) {
        gl.uniform3f(u.tint, 1.0, 1.0, 0.99);
        gl.uniform3f(u.glow, 0.62, 0.78, 1.0);
        gl.uniform1f(u.glowAmt, 0.16);
        gl.uniform1f(u.earth, 0.05);
      } else {
        gl.uniform3f(u.tint, 0.86, 0.89, 0.95);
        gl.uniform3f(u.glow, 0.55, 0.72, 0.95);
        gl.uniform1f(u.glowAmt, 0.22);
        gl.uniform1f(u.earth, 0.12);
      }
      gl.uniform1f(u.ready, ready);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let frame = 0;
    let running = false;
    let onScreen = true;
    let last = performance.now();
    const tick = (t: number) => {
      frame = 0;
      const dt = Math.min(t - last, 50) / 1000;
      last = t;
      if (bakedRows < MAP_H) {
        bakeStep();
      } else {
        const wasReady = ready >= 1;
        ready = Math.min(1, ready + dt * 1.6);
        if (!wasReady && ready >= 1) onReadyRef.current?.();
        if (!drag) {
          velocity *= Math.pow(0.04, dt);
          dragYaw += velocity;
          dragYaw *= Math.pow(0.35, dt); // spring back to the near side
          if (!reduceMotion) clock += dt;
          pitch += (0.04 + Math.cos(clock * 0.17) * 0.05 - pitch) * Math.min(1, dt * 1.5);
        }
        yaw = Math.sin(clock * speed * 2.2) * 0.14 + dragYaw;
        draw();
      }
      const settled = reduceMotion && bakedRows >= MAP_H && ready >= 1 && !drag && Math.abs(velocity) < 1e-4;
      if (running && !settled) frame = requestAnimationFrame(tick);
      else running = false;
    };
    // dev-only: drive frames by hand when the tab can't run rAF (hidden preview)
    if ((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV) {
      (canvas as HTMLCanvasElement & { __moon?: unknown }).__moon = {
        step: (ms = 16) => {
          const keep = running;
          running = false;
          tick(last + ms);
          running = keep;
        },
        state: () => ({ bakedRows, ready, yaw, error: gl.getError() }),
      };
    }

    const sync = () => {
      const should = onScreen && document.visibilityState === 'visible';
      if (should && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!should && running) {
        running = false;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    // reduced motion: re-run the loop when dragged
    const wake = () => sync();
    canvas.addEventListener('pointerdown', wake);
    sync();

    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerdown', wake);
      gl.deleteTexture(tex);
      gl.deleteTexture(tex2);
      gl.deleteFramebuffer(fbo);
      gl.deleteFramebuffer(fbo2);
      gl.deleteBuffer(quad);
      gl.deleteProgram(bakeProg);
      gl.deleteProgram(frameProg);
    };
  }, [speed]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab touch-pan-y"
        aria-label="ماه"
        role="img"
      />
    </div>
  );
};

export default Moon;
