import { useState, useCallback, memo } from "react";
import { projects } from "../../data/projects";
import SectionTitle from "../Common/SectionTitle";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ProjectModal from "./ProjectModal";
import "./Projects.css";

const ProjectCard = memo(function ProjectCard({ project, onOpen }) {
  const ref = useScrollReveal();
  return (
    <article
      ref={ref}
      className="project-card fade-in"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`View details for ${project.name}`}>
      <div
        className="project-banner"
        style={{ background: project.bannerColor }}>
        <span className="project-banner-icon">{project.bannerEmoji}</span>
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-name">{project.name}</h3>
        </div>
        <p className="project-desc">{project.description}</p>
        <div className="project-outcome">
          <i className="fas fa-trophy" /> {project.outcome}
        </div>
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t} className="project-tech-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-links" onClick={(e) => e.stopPropagation()}>
          {/* GitHub */}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link">
              <i className="fab fa-github"></i> View Code
            </a>
          ) : (
            <span className="project-link disabled">
              <i className="fab fa-github"></i> Code Not Available
            </span>
          )}

          {/* Live Demo */}
          {project.demo && project.demo !== "#" ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link">
              <i className="fas fa-external-link-alt"></i> Live Demo
            </a>
          ) : (
            <span className="project-link disabled">
              <i className="fas fa-external-link-alt"></i> Not Available
            </span>
          )}
        </div>

        {/* <div className="flex flex-wrap gap-3">
          <a
            href={project.github || "#"}
            target={project.github ? "_blank" : ""}
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300
      ${
        project.github
          ? "bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900 dark:hover:bg-slate-600 hover:scale-105"
          : "bg-gray-400 text-white cursor-not-allowed"
      }`}>
            <Github size={18} />
            {project.github ? "View Code" : "Not Available"}
          </a>
          {/* Live Demo */}
        {/* <a
            href={project.live || "#"}
            target={project.live ? "_blank" : ""}
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300
      ${
        project.live
          ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
          : "bg-gray-400 text-white cursor-not-allowed"
      }`}>
            <ExternalLink size={18} />
            {project.live ? "Live Demo" : "Not Available"}
          </a>
        </div> */}
      </div>
    </article>
  );
});

export default function Projects() {
  const titleRef = useScrollReveal();
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const openModal = useCallback((p) => setModal(p), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <section id="projects">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="What I've built" title="Projects" />
        </div>

        <div className="projects-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={openModal} />
          ))}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={closeModal} />}
    </section>
  );
}
