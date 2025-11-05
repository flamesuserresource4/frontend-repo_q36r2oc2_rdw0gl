import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Cpu, Code, Palette } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1];

function Orb({ radius = 90, delay = 0, children }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12"
      style={{ transformOrigin: `${radius}px ${radius}px` }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 14, ease: 'linear', delay }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-xl shadow-black/30">
        {children}
      </div>
    </motion.div>
  );
}

export default function SkillsContact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-[#0E0E0E] text-white">
      {/* Skills */}
      <section id="skills" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold">Skills</h2>
          <div className="relative mx-auto mt-10 h-[360px] w-full max-w-xl">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,201,255,0.12),transparent)]" />
            <div className="absolute left-1/2 top-1/2 -ml-16 -mt-16 h-32 w-32 rounded-3xl border border-white/10 bg-white/5 text-center backdrop-blur-md shadow-xl shadow-black/30">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="text-sm uppercase tracking-wide text-white/60">Core</div>
                <div className="text-lg font-semibold text-[#FEC712]">Creative Tech</div>
              </div>
            </div>

            <Orb radius={120}>
              <Rocket className="h-6 w-6 text-[#FEC712]" />
            </Orb>
            <Orb radius={150} delay={1.5}>
              <Cpu className="h-6 w-6 text-[#00C9FF]" />
            </Orb>
            <Orb radius={180} delay={3}>
              <Code className="h-6 w-6 text-white" />
            </Orb>
            <Orb radius={210} delay={4.5}>
              <Palette className="h-6 w-6 text-white" />
            </Orb>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-24">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                'linear-gradient(120deg, rgba(254,199,18,0.15), rgba(0,201,255,0.15), rgba(254,199,18,0.15))',
              backgroundSize: '200% 200%',
              filter: 'blur(60px)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl shadow-black/20">
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="mt-2 text-white/80">Let’s build something fluid together.</p>

            {!sent ? (
              <form
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setTimeout(() => setSent(true), 500);
                }}
              >
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-[#FEC712]/40"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-white/10 bg:black/40 bg-black/40 p-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-[#00C9FF]/40"
                    placeholder="you@domain.com"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-white/70">Message</label>
                  <textarea
                    rows="4"
                    className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-black/40 p-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/20"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="w-full rounded-2xl border border-white/10 bg-gradient-to-r from-[#FEC712]/30 to-[#00C9FF]/30 px-6 py-3 font-medium backdrop-blur-md hover:border-white/20"
                    type="submit"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease }}
                className="mt-6 rounded-xl border border-white/10 bg-black/40 p-6 text-center"
              >
                <div className="text-2xl font-semibold text-[#FEC712]">Message sent!</div>
                <div className="mt-2 text-white/70">Thanks for reaching out. I’ll reply shortly.</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
