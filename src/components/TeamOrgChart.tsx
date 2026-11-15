import React from 'react';
import { motion } from 'motion/react';
import { Code2, CalendarRange, Briefcase, Megaphone, Crown, Users, type LucideIcon } from 'lucide-react';
import { orgChart, getTeamPeople, initialsOf, deputyRole, isStaffed, type OrgUnit } from '../data/teamData';
import { useLanguage } from '../context/LanguageContext';
import './TeamOrgChart.css';

type Person = ReturnType<typeof getTeamPeople>[0];

const DEPUTY_ICONS: Record<string, LucideIcon> = {
  tech: Code2,
  admin: Briefcase,
  sales: Megaphone,
  planning: CalendarRange,
};

const pairs = <T,>(list: T[]): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += 2) out.push(list.slice(i, i + 2));
  return out;
};

const Avatar: React.FC<{ person?: Person }> = ({ person }) => (
  <span className={`org-av ${person ? '' : 'org-av--vacant'}`}>
    {person ? (
      person.image ? (
        <img src={person.image} alt="" loading="lazy" decoding="async" />
      ) : (
        <span>{initialsOf(person.displayName)}</span>
      )
    ) : (
      '+'
    )}
  </span>
);

/** Large person card: CEO, board, deputies. Vacant when person is missing. */
const BigNode: React.FC<{
  person?: Person;
  vacantRole?: string;
  size: 'xl' | 'lg';
  onSelect: (p: Person) => void;
  fa: boolean;
  delay?: number;
}> = ({ person, vacantRole, size, onSelect, fa, delay = 0 }) => {
  const anim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
  };
  if (!person) {
    return (
      <motion.div className={`org-big org-big--${size} org-big--vacant`} {...anim}>
        <Avatar />
        {vacantRole && (
          <span className="org-big__text">
            <strong>{vacantRole}</strong>
          </span>
        )}
      </motion.div>
    );
  }
  return (
    <motion.button type="button" className={`org-big org-big--${size}`} onClick={() => onSelect(person)} {...anim}>
      <Avatar person={person} />
      <span className="org-big__text">
        <strong>{person.displayName}</strong>
        <small>{person.displayRole}</small>
      </span>
    </motion.button>
  );
};

/** Compact seat inside a unit or a staff box: "مسئول" / "کارشناس". */
const Seat: React.FC<{ person?: Person; tag: string; onSelect: (p: Person) => void; fa: boolean }> = ({
  person,
  tag,
  onSelect,
  fa,
}) =>
  person ? (
    <button type="button" className="org-seat" onClick={() => onSelect(person)}>
      <Avatar person={person} />
      <span className="org-seat__text">
        <strong>{person.displayName}</strong>
        <small>{tag}</small>
      </span>
    </button>
  ) : (
    <div className="org-seat org-seat--vacant">
      <Avatar />
      <span className="org-seat__text">
        <small>{tag}</small>
      </span>
    </div>
  );

interface TeamOrgChartProps {
  onSelect: (person: Person) => void;
}

/**
 * Org chart laid out like the holding's paper chart:
 * CEO → board → staff positions flanking the spine → four deputies, each with
 * its units in facing pairs either side of the deputy's stem. Pure CSS lines.
 */
export const TeamOrgChart: React.FC<TeamOrgChartProps> = ({ onSelect }) => {
  const { language } = useLanguage();
  const fa = language === 'fa';
  const people = getTeamPeople(language);
  const byId = (id?: string) => (id ? people.find((p) => p.id === id) : undefined);
  const t = (o: { titleFa: string; titleEn: string }) => (fa ? o.titleFa : o.titleEn);

  const unitCell = (unit: OrgUnit) => {
    const lead = byId(unit.leadId);
    const members = unit.memberIds.map((id) => byId(id)).filter(Boolean) as Person[];
    return (
      <div key={unit.id} className="org-unit">
        <div className="org-unit__title">{t(unit)}</div>
        <div className="org-unit__seats">
          {lead && <Seat person={lead} tag={fa ? 'مسئول' : 'Lead'} onSelect={onSelect} fa={fa} />}
          {members.map((m) => (
            <Seat key={m.id} person={m} tag={fa ? 'کارشناس' : 'Specialist'} onSelect={onSelect} fa={fa} />
          ))}
        </div>
      </div>
    );
  };

  const staff = orgChart.staff.filter((seat) => byId(seat.personId));

  return (
    <div className="org">
      {/* CEO */}
      <span className="org-chip org-chip--root">
        <Crown className="w-4 h-4" />
        {fa ? 'مدیرعامل' : 'Chief Executive Officer'}
      </span>
      <BigNode person={byId(orgChart.ceoId)} size="xl" onSelect={onSelect} fa={fa} />
      <div className="org-line" aria-hidden="true" />

      {/* Board */}
      <section className="org-board" aria-label={fa ? 'هیات مدیره' : 'Board of Directors'}>
        <h3 className="org-board__title">
          <Users className="w-5 h-5" />
          {fa ? 'هیات مدیره' : 'Board of Directors'}
        </h3>
        <div className="org-board__row">
          {orgChart.boardIds.map((id, i) => (
            <BigNode key={id} person={byId(id)} size="lg" onSelect={onSelect} fa={fa} delay={0.05 + i * 0.05} />
          ))}
        </div>
      </section>

      {/* Staff positions that are filled, in facing pairs along the spine (the spine runs on) */}
      {staff.length > 0 ? (
      <div className="org-pairs org-pairs--through org-pairs--staff">
        {pairs(staff).map((row, ri) => (
          <div key={ri} className={`org-pair ${row.length === 1 ? 'org-pair--single' : ''}`}>
            {row.map((seat) => (
              <div key={seat.id} className="org-staff">
                <div className="org-staff__title">{t(seat)}</div>
                <Seat person={byId(seat.personId)} tag={t(seat)} onSelect={onSelect} fa={fa} />
              </div>
            ))}
          </div>
        ))}
      </div>
      ) : (
        <div className="org-line" aria-hidden="true" />
      )}

      {/* Deputies */}
      <div className="org-deputies">
        {orgChart.deputies.map((dep, di) => {
          const Icon = DEPUTY_ICONS[dep.id] ?? Briefcase;
          const units = dep.units.filter(isStaffed);
          return (
            <section key={dep.id} className="org-deputy" aria-label={t(dep)}>
              <span className="org-chip">
                <Icon className="w-4 h-4" />
                {t(dep)}
              </span>
              <BigNode
                person={byId(dep.deputyId)}
                vacantRole={deputyRole(dep, fa)}
                size="lg"
                onSelect={onSelect}
                fa={fa}
                delay={0.1 + di * 0.05}
              />
              {units.length > 0 && (
              <div className="org-pairs">
                {pairs(units).map((row, ri) => (
                  <div key={ri} className={`org-pair ${row.length === 1 ? 'org-pair--single' : ''}`}>
                    {row.map(unitCell)}
                  </div>
                ))}
              </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};
