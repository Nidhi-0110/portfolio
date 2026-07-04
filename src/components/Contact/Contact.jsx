import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import SectionTitle from '../Common/SectionTitle';
import Button from '../Common/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Contact.css';

/* =====================================================================
   EmailJS config — replace these three values after setting up EmailJS
   1. Public Key  → https://dashboard.emailjs.com/admin/account
   2. Service ID  → EmailJS > Email Services
   3. Template ID → EmailJS > Email Templates
   ===================================================================== */
const EMAILJS_PUBLIC_KEY  = 'lmmxdTf6vBavAIFGP';   // <-- REPLACE
const EMAILJS_SERVICE_ID  = 'service_qgbm7ir';   // <-- REPLACE
const EMAILJS_TEMPLATE_ID = 'template_u7nacfo';  // <-- REPLACE

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CONTACT_ITEMS = [
  { icon: 'fas fa-envelope',       label: 'Email',    value: 'patelnidhi1628@gmail.com',        href: 'mailto:patelnidhi1628@gmail.com' },
  { icon: 'fas fa-phone',          label: 'Phone',    value: '+91 87348 38561',                  href: 'tel:+918734838561' },
  { icon: 'fab fa-linkedin-in',    label: 'LinkedIn', value: 'linkedin.com/in/nidhi_patel',     href: 'https://www.linkedin.com/in/nidhi-patel-8947592b1/' },
  { icon: 'fab fa-github',         label: 'GitHub',   value: 'github.com/Nidhi_patel',          href: 'https://github.com/Nidhi-0110' },
  { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Mehsana, Gujarat, India',          href: null },
];

const INITIAL = { name: '', email: '', subject: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', subject: '', message: '' };

export default function Contact({ addToast }) {
  const titleRef   = useScrollReveal();
  const infoRef    = useScrollReveal();
  const formRef    = useScrollReveal();
  const ejsFormRef = useRef(null);

  const [fields, setFields]   = useState(INITIAL);
  const [errors, setErrors]   = useState(INITIAL_ERRORS);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const update = (field, value) => {
    setFields(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
    if (field === 'message') setCharCount(value.length);
  };

  const validate = () => {
    const errs = { ...INITIAL_ERRORS };
    let ok = true;
    if (!fields.name.trim()) { errs.name = 'Full name is required.'; ok = false; }
    else if (fields.name.trim().length < 2) { errs.name = 'Name must be at least 2 characters.'; ok = false; }
    if (!fields.email.trim()) { errs.email = 'Email address is required.'; ok = false; }
    else if (!EMAIL_RE.test(fields.email.trim())) { errs.email = 'Please enter a valid email address.'; ok = false; }
    if (!fields.subject.trim()) { errs.subject = 'Subject is required.'; ok = false; }
    else if (fields.subject.trim().length < 3) { errs.subject = 'Subject must be at least 3 characters.'; ok = false; }
    if (!fields.message.trim()) { errs.message = 'Message cannot be empty.'; ok = false; }
    else if (fields.message.trim().length < 10) { errs.message = 'Message must be at least 10 characters.'; ok = false; }
    setErrors(errs);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  fields.name.trim(),
          from_email: fields.email.trim(),
          subject:    fields.subject.trim(),
          message:    fields.message.trim(),
          to_name:    'Nidhi Patel',
        },
        EMAILJS_PUBLIC_KEY
      );
      addToast('Message sent! I\'ll get back to you within 24 hours.', 'success');
      setFields(INITIAL);
      setCharCount(0);
    } catch (err) {
      console.error('EmailJS error:', err);
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div ref={titleRef} className="fade-in">
          <SectionTitle label="Get in touch" title="Contact Me" />
        </div>
        <div className="contact-grid">
          {/* Info sidebar */}
          <aside ref={infoRef} className="contact-info fade-in fade-in-delay-1">
            <p className="contact-intro">
              I'm always open to discussing new opportunities, interesting data projects, or just
              having a great conversation about tech. Feel free to reach out!
            </p>
            <div className="contact-items">
              {CONTACT_ITEMS.map(item =>
                item.href ? (
                  <a key={item.label} href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-item"
                  >
                    <ContactItemInner item={item} />
                  </a>
                ) : (
                  <div key={item.label} className="contact-item contact-item-static">
                    <ContactItemInner item={item} />
                  </div>
                )
              )}
            </div>
          </aside>

          {/* Form */}
          <div ref={formRef} className="contact-form fade-in fade-in-delay-2">
            <div className="form-title">Send a Message</div>
            <form ref={ejsFormRef} onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <FormGroup label="Full Name" icon="fas fa-user" error={errors.name} required>
                  <input
                    type="text" className={`field ${errors.name ? 'error' : ''}`}
                    placeholder="Jane Smith" value={fields.name} maxLength={80}
                    onChange={e => update('name', e.target.value)}
                    aria-invalid={!!errors.name} aria-describedby="err-name"
                  />
                </FormGroup>
                <FormGroup label="Email Address" icon="fas fa-envelope" error={errors.email} required>
                  <input
                    type="email" className={`field ${errors.email ? 'error' : ''}`}
                    placeholder="jane@example.com" value={fields.email} maxLength={120}
                    onChange={e => update('email', e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                </FormGroup>
              </div>

              <FormGroup label="Subject" icon="fas fa-tag" error={errors.subject} required>
                <input
                  type="text" className={`field ${errors.subject ? 'error' : ''}`}
                  placeholder="e.g. Data Analyst Opportunity" value={fields.subject} maxLength={120}
                  onChange={e => update('subject', e.target.value)}
                  aria-invalid={!!errors.subject}
                />
              </FormGroup>

              <FormGroup label="Message" icon="fas fa-comment-dots" error={errors.message} required>
                <textarea
                  className={`field ${errors.message ? 'error' : ''}`}
                  placeholder="Tell me about your project or opportunity..."
                  value={fields.message} maxLength={2000}
                  onChange={e => update('message', e.target.value)}
                  aria-invalid={!!errors.message}
                />
                <div className={`char-counter ${charCount > 1800 ? 'warn' : ''}`}>
                  {charCount} / 2000
                </div>
              </FormGroup>

              <Button type="submit" variant="primary" disabled={loading} className="form-submit-btn">
                {loading
                  ? <><span className="spinner" /> Sending…</>
                  : <><i className="fas fa-paper-plane" /> Send Message</>
                }
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItemInner({ item }) {
  return (
    <>
      <div className="contact-item-icon"><i className={item.icon} /></div>
      <div>
        <div className="contact-item-label">{item.label}</div>
        <div className="contact-item-value">{item.value}</div>
      </div>
    </>
  );
}

function FormGroup({ label, icon, error, required, children }) {
  return (
    <div className="form-group">
      <label>
        {icon && <i className={icon} />} {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span className="field-error" role="alert">
          <i className="fas fa-circle-exclamation" /> {error}
        </span>
      )}
    </div>
  );
}
