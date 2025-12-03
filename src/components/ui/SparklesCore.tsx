"use client";
import { useId, useMemo, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#00ff88",
  particleDensity = 100,
}: SparklesCoreProps) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  }, [controls]);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: background,
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push" as const,
          },
          onHover: {
            enable: true,
            mode: "repulse" as const,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: particleColor,
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "out" as const,
          },
          random: true,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 400,
            height: 400,
          },
          value: particleDensity,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 1,
          },
          animation: {
            enable: true,
            speed: speed,
            sync: false,
            startValue: "random" as const,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: minSize,
            max: maxSize,
          },
        },
      },
      detectRetina: true,
    }),
    [background, particleColor, particleDensity, speed, minSize, maxSize]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      className={className}
    >
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </motion.div>
  );
};

// Composant wrapper pour encapsuler du texte avec des sparkles
type SparklesTextProps = {
  children: React.ReactNode;
  className?: string;
  sparklesClassName?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
};

export const SparklesText = ({
  children,
  className = "",
  sparklesClassName = "",
  particleColor = "#00ff88",
  particleDensity = 80,
  minSize = 0.4,
  maxSize = 1.2,
  speed = 1.5,
}: SparklesTextProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <SparklesCore
        className={`absolute inset-0 z-0 ${sparklesClassName}`}
        particleColor={particleColor}
        particleDensity={particleDensity}
        minSize={minSize}
        maxSize={maxSize}
        speed={speed}
      />
    </span>
  );
};
