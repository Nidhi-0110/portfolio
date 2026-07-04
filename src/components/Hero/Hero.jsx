import { useEffect, useRef } from "react";
import Button from "../Common/Button";
import Resume from "../../assets/Nidhi_Resume.pdf";
import "./Hero.css";

const TITLES = [
  "Data Analyst",
  "ML Engineer",
  "Frontend Developer",
  "Data Storyteller",
];

export default function Hero() {
  const typedRef = useRef(null);
  const stateRef = useRef({ idx: 0, charIdx: 0, deleting: false, timer: null });

  useEffect(() => {
    const s = stateRef.current;

    function tick() {
      const current = TITLES[s.idx];
      if (!s.deleting) {
        s.charIdx++;
        if (typedRef.current)
          typedRef.current.textContent = current.slice(0, s.charIdx);
        if (s.charIdx === current.length) {
          s.deleting = true;
          s.timer = setTimeout(tick, 1800);
          return;
        }
      } else {
        s.charIdx--;
        if (typedRef.current)
          typedRef.current.textContent = current.slice(0, s.charIdx);
        if (s.charIdx === 0) {
          s.deleting = false;
          s.idx = (s.idx + 1) % TITLES.length;
        }
      }
      s.timer = setTimeout(tick, s.deleting ? 60 : 100);
    }

    s.timer = setTimeout(tick, 400);
    return () => clearTimeout(s.timer);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-inner">
        {/* Text */}
        <div className="hero-text">
          <div className="hero-greeting">
            <span className="dot" />
            Available for opportunities
          </div>

          <h1 className="hero-name">
            Nidhi
            <br />
            <span className="grad-text">Patel</span>
          </h1>

          <div className="hero-title-row">
            <span className="title-text">
              <span ref={typedRef} />
              <span className="typed-cursor" aria-hidden="true" />
            </span>
          </div>

          <p className="hero-tagline">
            Turning raw data into actionable insights
          </p>

          <p className="hero-intro">
            Aspiring Data Analyst with a strong foundation in data analysis,
            machine learning, & data visualization. Skilled at interpreting
            complex datasets & generating insights that support data-driven
            decision making. Passionate about building intelligent solutions at
            the intersection of data science.
          </p>

          <div className="hero-cta">
            <Button
              variant="primary"
              onClick={() => window.open(Resume, "_blank")}
              aria-label="View Resume">
              <i className="fas fa-eye" /> View Resume
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              <i className="fas fa-paper-plane" /> Contact Me
            </Button>
          </div>
        </div>

        {/* Avatar */}
        <div className="hero-avatar-wrap" aria-hidden="true">
          <div className="hero-avatar-ring">
            <div className="hero-avatar-inner">
              <span className="hero-avatar-initials">NP</span>
            </div>
          </div>
          <div className="hero-badge hero-badge-1">
            <i className="fas fa-chart-bar" /> Data Analyst
          </div>
          <div className="hero-badge hero-badge-2">
            <i className="fab fa-python" /> Python
          </div>
          <div className="hero-badge hero-badge-3">
            <i className="fas fa-brain" /> ML Engineer
          </div>
        </div>
      </div>
    </section>
  );
}
