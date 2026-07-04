import { experiences } from '../../data/experience';
import SectionTitle from '../Common/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Experience.css';

export default function Experience() {
  const titleRef = useScrollReveal();
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="Work History" title="Experience" />
        </div>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`timeline-item fade-in fade-in-delay-${delay}`}>
      <div className="timeline-dot-wrap">
        <div className="timeline-dot"><i className={exp.icon} /></div>
      </div>
      <div className="timeline-card">
        <div className="timeline-meta">
          <h3 className="timeline-role">{exp.role}</h3>
          <span className="timeline-dates">
            <i className="fas fa-calendar-alt" /> {exp.start_date} – {exp.end_date}
          </span>
        </div>
        <div className="timeline-company">{exp.company}</div>
        <ul className="timeline-responsibilities">
          {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div className="timeline-tech">
          {exp.tech.map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
