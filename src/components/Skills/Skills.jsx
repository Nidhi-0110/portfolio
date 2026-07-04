import { useRef, useEffect } from 'react';
import { skillCategories } from '../../data/skills';
import SectionTitle from '../Common/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Skills.css';

function SkillBars({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.querySelectorAll('.skill-bar-fill[data-pct]').forEach(bar => {
            bar.style.width = bar.getAttribute('data-pct') + '%';
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bars" ref={ref}>
      {items.map(item => (
        <div key={item.name} className="skill-bar-item">
          <div className="skill-bar-top">
            <span className="skill-bar-name">{item.name}</span>
            <span className="skill-bar-pct">{item.pct}%</span>
          </div>
          <div className="skill-bar-track">
            <div className="skill-bar-fill" data-pct={item.pct} style={{ width: 0 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillCategory({ category, delay }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`skill-category fade-in fade-in-delay-${delay}${category.fullWidth ? ' skill-full-width' : ''}`}
    >
      <div className="skill-cat-header">
        <div className="skill-cat-icon"><i className={category.icon} /></div>
        <span className="skill-cat-title">{category.title}</span>
      </div>
      {category.type === 'bars' ? (
        <SkillBars items={category.items} />
      ) : (
        <div className="skill-tags">
          {category.items.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  const titleRef = useScrollReveal();
  return (
    <section id="skills">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="What I know" title="Skills & Expertise" />
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.id} category={cat} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
