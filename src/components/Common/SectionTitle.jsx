import './SectionTitle.css';

export default function SectionTitle({ label, title, className = '' }) {
  return (
    <div className={`section-header ${className}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}
