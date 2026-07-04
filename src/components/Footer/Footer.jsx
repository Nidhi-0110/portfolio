import { scrollTo } from '../../utils/helpers';
import './Footer.css';

const QUICK_LINKS = ['about','skills','experience','projects','education','contact'];
const SOCIAL = [
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/nidhi-patel-8947592b1/', label: 'LinkedIn' },
  { icon: 'fab fa-github',      href: 'https://github.com/Nidhi-0110',          label: 'GitHub'   },
  { icon: 'fas fa-envelope',    href: 'mailto:patelnidhi1628@gmail.com',          label: 'Email'    },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">Nidhi Patel</div>
            <p className="footer-tagline">
              Data Analyst & Data Scientist passionate about transforming data into meaningful stories.
            </p>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-nav">
              {QUICK_LINKS.map(id => (
                <li key={id}>
                  <button className="footer-nav-link" onClick={() => scrollTo(id)}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Connect</div>
            <div className="footer-social-links">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="footer-social-link" aria-label={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; 2025 <span className="grad-text">Nidhi Patel</span>. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <i className="fas fa-heart" style={{ color: '#ef4444' }} /> in Gujarat, India
          </p>
        </div>
      </div>
    </footer>
  );
}
