import { educationList } from '../../data/education';
import SectionTitle from '../Common/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Education.css';

export default function Education() {
  const titleRef = useScrollReveal();
  return (
    <section id="education" className="education-section">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="Academic Background" title="Education" />
        </div>
        <div className="edu-grid">
          {educationList.map((edu, i) => (
            <EduCard key={edu.id} edu={edu} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduCard({ edu, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`edu-card fade-in fade-in-delay-${delay}`}>
      <div className="edu-icon"><i className={edu.icon} /></div>
      <div className="edu-degree">{edu.degree}</div>
      <div className="edu-institution">{edu.institution}</div>
      <div className="edu-meta">
        <span className="edu-meta-item"><i className="fas fa-calendar" /> {edu.years}</span>
      </div>
      <div className="edu-cgpa"><i className="fas fa-star" /> CGPA: {edu.cgpa}</div>
    </div>
  );
}
