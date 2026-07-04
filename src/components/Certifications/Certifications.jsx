import { certifications } from '../../data/certificates';
import SectionTitle from '../Common/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Certifications.css';

export default function Certifications() {
  const titleRef = useScrollReveal();
  return (
    <section id="certifications">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="Credentials" title="Certifications" />
        </div>
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} delay={(i % 4) + 1} />
          ))}
        </div>
        <p className="cert-note">
          * Certifications updated as listed on resume — please add official links and issuers as applicable.
        </p>
      </div>
    </section>
  );
}

function CertCard({ cert, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`cert-card fade-in fade-in-delay-${delay}`}>
      <div className="cert-icon"><i className={cert.icon} /></div>
      <div className="cert-name">{cert.name}</div>
      <div className="cert-issuer">{cert.issuer}</div>
      <div className="cert-year"><i className="fas fa-calendar-check" /> {cert.year}</div>
    </div>
  );
}
