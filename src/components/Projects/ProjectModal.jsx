import { useEffect, useRef } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div className="modal-backdrop" ref={backdropRef} onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="modal-card">
        <div className="modal-banner" style={{ background: project.bannerColor }}>
          <span className="modal-banner-icon">{project.bannerEmoji}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{project.name}</h2>
          <p className="modal-desc">{project.description}</p>

          <h4 className="modal-section-heading">Key Features</h4>
          <ul className="modal-features">
            {project.features.map((f, i) => (
              <li key={i}><i className="fas fa-check-circle" /> {f}</li>
            ))}
          </ul>

          <div className="modal-outcome">
            <i className="fas fa-trophy" /> {project.outcome}
          </div>

          <h4 className="modal-section-heading">Technologies</h4>
          <div className="modal-tech">
            {project.tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
          </div>

          <div className="modal-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <i className="fab fa-github" /> View on GitHub
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary" >
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
