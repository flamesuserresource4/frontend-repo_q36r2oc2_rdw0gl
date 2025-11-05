import { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const ease = [0.25, 0.1, 0.25, 1];

export default function Hero() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      mouseX.set(px);
      mouseY.set(py);
      rotateX.set(py * -10);
      rotateY.set(px * 10);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, rotateX, rotateY]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-[#0E0E0E] text-white"
    >
      {/* Spline 3D scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient/particles overlay - ensure interactions with Spline still possible */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-20 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(254,199,18,0.15),rgba(0,0,0,0))]" />
        <div className="absolute -inset-40 bg-[radial-gradient(40%_40%_at_70%_70%,rgba(0,201,255,0.15),rgba(0,0,0,0))]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-full items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-6"
          style={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-center font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Nathan <span className="text-[#FEC712]">Aaron</span>
            </span>
            <span className="mt-4 block text-lg font-light text-white/80 sm:text-xl">
              Creative Technologist • Building fluid human–computer moments
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm backdrop-blur-md transition-all duration-300 hover:border-[#FEC712]/40 hover:bg-[#FEC712]/10 hover:shadow-xl hover:shadow-[#FEC712]/20"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">View Projects →</span>
            </a>
            <a
              href="#contact"
              className="group rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm backdrop-blur-md transition-all duration-300 hover:border-[#00C9FF]/40 hover:bg-[#00C9FF]/10 hover:shadow-xl hover:shadow-[#00C9FF]/20"
            >
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">Get in Touch ↑</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
