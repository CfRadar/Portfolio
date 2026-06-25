import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AmbientGlow = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#00FFB3] blur-[120px] opacity-20"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#00C8FF] blur-[120px] opacity-20"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[40%] w-[45vw] h-[45vw] rounded-full bg-[#7B61FF] blur-[120px] opacity-15"
        animate={{
          x: [0, 40, -60, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};


const DataStreams = () => {
  // Use a fixed set of random values so it doesn't change on re-render
  const streams = React.useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 5,
      height: 100 + Math.random() * 200,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      {streams.map((stream, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-[1px]"
          style={{
            left: stream.left,
            height: `${stream.height}px`,
            background: 'linear-gradient(to bottom, transparent, rgba(0, 200, 255, 0.8), transparent)'
          }}
          initial={{ y: -stream.height, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const ScanlineOverlay = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03] z-50"
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent 50%, #000 51%)`,
        backgroundSize: '100% 4px',
      }}
    />
  );
};

const FloatingSymbols = () => {
  const symbols = ['_', '$', '{}', '</>', 'npm', 'git', 'AI', 'sudo'];
  
  const elements = React.useMemo(() => {
    return Array.from({ length: 25 }).map(() => {
      const depth = Math.random(); // 0 to 1
      return {
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: 0.5 + depth * 1.5,
        blur: Math.max(0, (1 - depth) * 4),
        opacity: 0.1 + depth * 0.4,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        yOffset: 20 + Math.random() * 30,
        xOffset: 10 + Math.random() * 20,
      };
    });
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-[#E6FFF8] font-mono whitespace-nowrap"
          style={{
            left: el.left,
            top: el.top,
            scale: el.scale,
            filter: `blur(${el.blur}px)`,
            opacity: el.opacity,
          }}
          animate={{
            y: [`-${el.yOffset}px`, `${el.yOffset}px`, `-${el.yOffset}px`],
            x: [`-${el.xOffset}px`, `${el.xOffset}px`, `-${el.xOffset}px`],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {el.symbol}
        </motion.div>
      ))}
    </div>
  );
};

const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const particles: {x: number, y: number, vx: number, vy: number}[] = [];
    const numParticles = Math.floor((width * height) / 20000); // Responsive particle count
    const connectionDistance = 150;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen instead of bouncing for a more seamless feel
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 179, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
    />
  );
};

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#050816] overflow-hidden -z-10">
      <AmbientGlow />
      <ParticleSystem />
      <DataStreams />
      <FloatingSymbols />
      <ScanlineOverlay />
    </div>
  );
};

export default AnimatedBackground;
