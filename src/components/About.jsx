import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

export default function About() {
  return (
    <section id="about" className="relative bg-[#0E0E0E] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#00C9FF]/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#FEC712]/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-xl shadow-black/20"
        >
          <h2 className="text-center text-3xl font-bold">About</h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            I'm Nathan Aaron, a creative technologist fusing code, design, and motion.
            I craft immersive interfaces that feel alive—fluid, tactile, and delightfully
            intuitive. My work spans WebGL, Framer Motion, and interactive systems that
            blur the line between product and art.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { k: 'Focus', v: 'Real‑time UI, WebGL, Motion Systems' },
              { k: 'Values', v: 'Clarity, Play, Accessibility' },
              { k: 'Now', v: 'Exploring Vision‑OS inspired paradigms' },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-md"
              >
                <div className="text-white/60">{item.k}</div>
                <div className="mt-1 font-medium text-white">{item.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
