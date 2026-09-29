import type { TeamPerson } from '../data/teamData';
import './TeamPhotoCard.css';

type TeamPhotoCardProps = {
  person: TeamPerson & { displayName: string };
  memberLabel: string;
};

export function TeamPhotoCard({ person, memberLabel }: TeamPhotoCardProps) {
  return (
    <article className="team-photo-card" aria-label={person.displayName}>
      <img className="team-photo-card__image" src={person.image} alt={person.displayName} loading="lazy" />
      <div className="team-photo-card__shade" aria-hidden="true" />
      <div className="team-photo-card__border" aria-hidden="true" />
      <div className="team-photo-card__content">
        <span className="team-photo-card__label">{memberLabel}</span>
        <h3 className="team-photo-card__name">{person.displayName}</h3>
      </div>
    </article>
  );
}
