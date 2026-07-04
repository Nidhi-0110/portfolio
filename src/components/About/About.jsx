import { useScrollReveal } from "../../hooks/useScrollReveal";
import SectionTitle from "../Common/SectionTitle";
import { projects } from "../../data/projects";
import { experiences } from "../../data/experience";
import "./About.css";

const totalMonths = experiences.reduce((total, exp) => {
  if (!exp.setup) return total;
  const startDate = new Date(exp.start_date);
  const endDate = new Date(exp.end_date);

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  return total + months;
}, 0);

const STATS = [
  { num: `${totalMonths}+`, label: "Months Internship" },
  { num: `${projects.length}+`, label: "Projects Built" },
  { num: "9.0", label: "Diploma CGPA" },
  { num: "88%", label: "ML Model Accuracy" },
];

const CHIPS = [
  { icon: "fas fa-database", label: "Data Analytics" },
  { icon: "fas fa-robot", label: "Machine Learning" },
  { icon: "fas fa-chart-pie", label: "Data Visualization" },
  { icon: "fab fa-react", label: "React.js" },
  { icon: "fab fa-python", label: "Python" },
  { icon: "fas fa-brain", label: "Problem Solving" },
];

export default function About() {
  const titleRef = useScrollReveal();
  const visualRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="Get to know me" title="About Me" />
        </div>

        <div className="about-grid">
          <div
            ref={visualRef}
            className="about-card-visual fade-in fade-in-delay-1">
            <div className="about-avatar-large" aria-hidden="true">
              <span className="initials-lg">NP</span>
            </div>
            <div className="about-stats">
              {STATS.map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-num grad-text">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={contentRef}
            className="about-content fade-in fade-in-delay-2">
            <p>
              Hi, I'm Nidhi Patel, a <b>Data Analyst</b>, aspiring{" "}
              <b>Machine Learning Engineer</b>, and <b>Frontend Developer</b>,
              currently pursuing a <b>B.Tech in Computer Engineering</b> at
              Ganpat University in Mehsana, Gujarat. I have hands-on experience
              in <b>React.js</b>,<b>JavaScript</b>, <b>Python</b>, <b>SQL</b>,{" "}
              <b>Excel</b>, <b>Power BI</b>, and <b>Machine Learning</b>.
            </p>
            <p>
              During my internships at <b>Techmicra IT Solutions</b> and{" "}
              <b>Elevate Labs</b>, I built responsive web applications and
              analyzed data to generate actionable insights through data
              cleaning, visualization, dashboards, and machine learning. I enjoy
              solving real-world problems by combining analytical thinking with
              modern web technologies.
            </p>
            <p>
              I am driven by continuous learning, a structured problem-solving
              mindset, and a genuine curiosity about how data can transform
              industries. I am actively seeking opportunities where I can
              leverage my expertise in Data Analytics, Machine Learning, and to
              build innovative, impactful, and data-driven solutions.
            </p>
            <div className="about-highlights">
              {CHIPS.map((c) => (
                <span key={c.label} className="highlight-chip">
                  <i className={c.icon} /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
