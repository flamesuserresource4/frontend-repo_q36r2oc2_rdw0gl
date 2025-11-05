import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import SkillsContact from './components/SkillsContact';

const ease = [0.25, 0.1, 0.25, 1];

export default function App() {
  // SEO basics
  useEffect(() => {
    document.title = 'Nathan Aaron — Creative Technologist';
  }, []);

  // Interactive cursor with magnetic effect
  const cursorRef = useRef(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  useEffect(() => {
    const magnets = document.querySelectorAll('[data-magnet]');
    const onMove = (e) => {
      magnets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        const dist = Math.hypot(mx, my);
        const strength = Math.max(0, 1 - dist / 200);
        el.style.transform = `translate(${mx * 0.1 * strength}px, ${my * 0.1 * strength}px)`;
      });
    };
    const clear = () => {
      magnets.forEach((el) => (el.style.transform = 'translate(0,0)'));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', clear);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', clear);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E] font-inter text-white">
      {/* Smooth page transition overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease }}
        className="pointer-events-none fixed inset-0 z-40 bg-[#0E0E0E]"
      />

      <header className="fixed inset-x-0 top-0 z-30">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
            <a href="#home" className="rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white" data-magnet>
              NA
            </a>
            <div className="flex gap-1">
              {[
                { href: '#about', label: 'About' },
                { href: '#projects', label: 'Projects' },
                { href: '#skills', label: 'Skills' },
                { href: '#contact', label: 'Contact' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  data-magnet
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <SkillsContact />
      </main>

      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FEC712]/40 bg-[#FEC712]/20 shadow-xl shadow-[#FEC712]/20"
        style={{ left: sx, top: sy }}
      />
    </div>
  );
}
