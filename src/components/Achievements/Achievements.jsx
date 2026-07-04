import { achievements } from '../../data/achievements';
import SectionTitle from '../Common/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Achievements.css';

export default function Achievements() {
  const titleRef = useScrollReveal();
  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="Highlights" title="Achievements" />
        </div>
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} item={a} delay={(i % 4) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ item, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`achievement-card fade-in fade-in-delay-${delay}`}>
      <div className="achievement-icon"><i className={item.icon} /></div>
      <div>
        <div className="achievement-title">{item.title}</div>
        <div className="achievement-desc">{item.description}</div>
      </div>
    </div>
  );
}
