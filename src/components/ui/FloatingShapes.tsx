"use client";
import { motion } from "framer-motion";
import { cn } from "../../utils";

interface FloatingShapesProps {
  className?: string;
}

export const FloatingShapes = ({ className }: FloatingShapesProps) => {
  // Horizontal arrangement of shapes - Dark Green theme - Subtle version
  const shapes = [
    // Top row - horizontal alignment
    { type: 'pill', x: '5%', y: '15%', width: '180px', height: '80px', color: '#00ff88', opacity: 0.12, delay: 0 },
    { type: 'pill', x: '25%', y: '12%', width: '220px', height: '90px', color: '#14b8a6', opacity: 0.1, delay: 0.2 },
    { type: 'circle', x: '50%', y: '18%', width: '100px', height: '100px', color: '#22d3ee', opacity: 0.08, delay: 0.4 },
    { type: 'pill', x: '70%', y: '10%', width: '200px', height: '85px', color: '#00ff88', opacity: 0.1, delay: 0.6 },

    // Middle row
    { type: 'circle', x: '8%', y: '45%', width: '120px', height: '120px', color: '#14b8a6', opacity: 0.08, delay: 0.3 },
    { type: 'pill', x: '30%', y: '50%', width: '250px', height: '100px', color: '#22d3ee', opacity: 0.06, delay: 0.5 },
    { type: 'pill', x: '60%', y: '48%', width: '200px', height: '80px', color: '#00ff88', opacity: 0.08, delay: 0.7 },
    { type: 'circle', x: '85%', y: '42%', width: '140px', height: '140px', color: '#14b8a6', opacity: 0.1, delay: 0.1 },

    // Bottom row
    { type: 'pill', x: '10%', y: '78%', width: '200px', height: '90px', color: '#22d3ee', opacity: 0.08, delay: 0.4 },
    { type: 'circle', x: '35%', y: '82%', width: '110px', height: '110px', color: '#00ff88', opacity: 0.1, delay: 0.6 },
    { type: 'pill', x: '55%', y: '75%', width: '240px', height: '95px', color: '#14b8a6', opacity: 0.06, delay: 0.2 },
    { type: 'pill', x: '80%', y: '80%', width: '180px', height: '75px', color: '#22d3ee', opacity: 0.08, delay: 0.8 },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.width,
            height: shape.height,
            borderRadius: shape.type === 'circle' ? '50%' : '9999px',
            background: `radial-gradient(ellipse at center, ${shape.color} 0%, transparent 70%)`,
            opacity: shape.opacity,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: shape.opacity,
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
