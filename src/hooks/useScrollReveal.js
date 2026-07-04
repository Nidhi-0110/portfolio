import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          // Animate skill bars inside this element
          el.querySelectorAll('.skill-bar-fill[data-pct]').forEach(bar => {
            bar.style.width = bar.getAttribute('data-pct') + '%';
          });
        }
      },
      { threshold: options.threshold ?? 0.12, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold]);

  return ref;
}
