import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

const PROJECTS = [
  {
    id: 'vision-ui',
    title: 'Vision UI Concepts',
    category: 'Experiments',
    color: '#FEC712',
    desc: 'Glassmorphic controls with haptic‑like motion.',
  },
  {
    id: 'realtime-visuals',
    title: 'Realtime Visuals',
    category: 'Art',
    color: '#00C9FF',
    desc: 'WebGL particles and audio‑reactive shaders.',
  },
  {
    id: 'product-site',
    title: 'Product Microsite',
    category: 'Client',
    color: '#ffffff',
    desc: 'A fluid launch experience with scroll choreography.',
  },
  {
    id: 'motion-kit',
    title: 'Motion Kit',
    category: 'Open Source',
    color: '#FEC712',
    desc: 'Composable motion primitives for expressive UIs.',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function Projects() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('All');

  const items = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative bg-[#0E0E0E] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Projects</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-2xl border px-4 py-2 text-sm transition-colors backdrop-blur-md ${
                  filter === c
                    ? 'border-[#FEC712]/50 bg-[#FEC712]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.6, ease } }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((p) => (
            <motion.button
              key={p.id}
              layout
              onClick={() => setActive(p)}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-xl shadow-black/20"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(60% 80% at 50% 0%, ${p.color}22, transparent)` }}
              />
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-wider text-white/60">{p.category}</div>
                <div className="mt-2 text-xl font-semibold">{p.title}</div>
                <p className="mt-2 text-sm text-white/70">{p.desc}</p>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl" style={{ background: p.color }} />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#121212]/90 p-0 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div>
                  <div className="text-sm uppercase tracking-wide text-white/60">Live Preview</div>
                  <div className="text-lg font-semibold">{active.title}</div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-white/20"
                >
                  Close
                </button>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {/* Simulated live preview with animated gradient */}
                <motion.div
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease }}
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(60% 80% at 20% 10%, rgba(254,199,18,0.25), transparent), radial-gradient(50% 80% at 80% 80%, rgba(0,201,255,0.25), transparent), #0E0E0E',
                  }}
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        'linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.06) 100%)',
                      backgroundSize: '200% 200%',
                      mixBlendMode: 'overlay',
                    }}
                  />
                </motion.div>
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80 backdrop-blur-md">
                  {active.desc}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
