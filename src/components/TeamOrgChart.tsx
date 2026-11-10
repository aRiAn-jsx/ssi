import React from 'react';
import { motion } from 'motion/react';
import { Code2, CalendarRange, Briefcase, Crown, type LucideIcon } from 'lucide-react';
import { orgChart, getTeamPeople, initialsOf } from '../data/teamData';
import { useLanguage } from '../context/LanguageContext';
import './TeamOrgChart.css';

type Person = ReturnType<typeof getTeamPeople>[0];
type Size = 'xl' | 'lg' | 'md' | 'sm';

const DEPUTY_ICONS: Record<string, LucideIcon> = {
  tech: Code2,
  planning: CalendarRange,
  admin: Briefcase,
};

const Avatar: React.FC<{ person: Person }> = ({ person }) => (
  <span className="org-node__avatar">
    {person.image ? (
      <img src={person.image} alt="" loading="lazy" decoding="async" />
    ) : (
      <span>{initialsOf(person.displayName)}</span>
    )}
  </span>
);

/** A person in the chart: round photo, name, role. Opens the profile. */
const Node: React.FC<{ person: Person; size: Size; onSelect: (p: Person) => void; delay?: number }> = ({
  person,
  size,
  onSelect,
  delay = 0,
}) => (
  <motion.button
    type="button"
    className={`org-node org-node--${size}`}
    onClick={() => onSelect(person)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
  >
    <Avatar person={person} />
    <span className="org-node__text">
      <strong>{person.displayName}</strong>
      <small>{person.displayRole}</small>
    </span>
  </motion.button>
);

const SoonNode: React.FC<{ fa: boolean }> = ({ fa }) => (
  <div className="org-node org-node--sm org-node--soon">
    <span className="org-node__avatar">+</span>
    <span className="org-node__text">
      <strong>{fa ? 'به‌زودی' : 'Coming soon'}</strong>
      <small>{fa ? 'عضو جدید' : 'New member'}</small>
    </span>
  </div>
);

interface TeamOrgChartProps {
  onSelect: (person: Person) => void;
}

/**
 * Root-style org chart: council + CEO → three deputies → units, with each
 * unit's members branching off a vertical rail. Pure CSS connectors; the
 * deputy columns stack on tablets/phones.
 */
export const TeamOrgChart: React.FC<TeamOrgChartProps> = ({ onSelect }) => {
  const { language } = useLanguage();
  const fa = language === 'fa';
  const people = getTeamPeople(language);
  const byId = (id: string) => people.find((p) => p.id === id)!;

  return (
    <div className="org">
      {/* Root */}
      <div className="org__root">
        <span className="org__chip org__chip--root">
          <Crown className="w-4 h-4" />
          {fa ? 'شورای عالی و مدیریت ارشد' : 'Supreme Council & Executive Management'}
        </span>
        <div className="org__root-row">
          <Node person={byId(orgChart.councilId)} size="xl" onSelect={onSelect} />
          <span className="org__root-link" aria-hidden="true" />
          <Node person={byId(orgChart.ceoId)} size="xl" onSelect={onSelect} delay={0.05} />
        </div>
      </div>

      <div className="org__trunk" aria-hidden="true" />

      {/* Deputies */}
      <div className="org__deputies">
        {orgChart.deputies.map((dep, di) => {
          const Icon = DEPUTY_ICONS[dep.id] ?? Briefcase;
          return (
            <section key={dep.id} className="org__deputy" aria-label={fa ? dep.titleFa : dep.titleEn}>
              <span className="org__chip">
                <Icon className="w-4 h-4" />
                {fa ? dep.titleFa : dep.titleEn}
              </span>
              <Node person={byId(dep.deputyId)} size="lg" onSelect={onSelect} delay={0.1 + di * 0.05} />

              {dep.units.length > 0 && (
                <div className="org__units">
                  {dep.units.map((unit) => (
                    <div key={unit.id} className="org__unit">
                      <span className="org__unit-title">{fa ? unit.titleFa : unit.titleEn}</span>
                      {unit.leadId && <Node person={byId(unit.leadId)} size="md" onSelect={onSelect} delay={0.2} />}
                      <ul className={`org__branch ${unit.leadId ? 'org__branch--under-lead' : ''}`}>
                        {unit.memberIds.map((id, mi) => (
                          <li key={id}>
                            <Node person={byId(id)} size="sm" onSelect={onSelect} delay={0.25 + mi * 0.04} />
                          </li>
                        ))}
                        {Array.from({ length: unit.comingSoon ?? 0 }, (_, i) => (
                          <li key={`soon-${i}`}>
                            <SoonNode fa={fa} />
                          </li>
                        ))}
                      </ul>
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
