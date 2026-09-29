import type { TeamPerson } from '../data/teamData';
import './TeamPhotoCard.css';

type TeamPhotoCardProps = {
  person: TeamPerson & { displayName: string; displayRole: string };
};

export function TeamPhotoCard({ person }: TeamPhotoCardProps) {
  return (
    <article className="team-photo-card" aria-label={person.displayName}>
      <img className="team-photo-card__image" src={person.image} alt={person.displayName} loading="lazy" />
      <div className="team-photo-card__shade" aria-hidden="true" />
      <div className="team-photo-card__border" aria-hidden="true" />
      <div className="team-photo-card__content">
        <h3 className="team-photo-card__name">{person.displayName}</h3>
        <span className="team-photo-card__role">{person.displayRole}</span>
      </div>
    </article>
  );
}
