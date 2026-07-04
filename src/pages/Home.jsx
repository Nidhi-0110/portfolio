import { Suspense, lazy } from 'react';
import Hero from '../components/Hero/Hero';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const About          = lazy(() => import('../components/About/About'));
const Skills         = lazy(() => import('../components/Skills/Skills'));
const Experience     = lazy(() => import('../components/Experience/Experience'));
const Projects       = lazy(() => import('../components/Projects/Projects'));
const Education      = lazy(() => import('../components/Education/Education'));
const Certifications = lazy(() => import('../components/Certifications/Certifications'));
// const Achievements   = lazy(() => import('../components/Achievements/Achievements'));
const Contact        = lazy(() => import('../components/Contact/Contact'));

export default function Home({ addToast }) {
  return (
    <main>
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        {/* <Achievements /> */}
        <Contact addToast={addToast} />
      </Suspense>
    </main>
  );
}
