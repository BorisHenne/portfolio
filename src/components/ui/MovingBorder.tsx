"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) => {
  return (
    <Component
      className={cn(
        "relative p-[1px] overflow-hidden bg-transparent",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${rx}) / calc(${ry})` }}
      >
        <MovingBorderGradient duration={duration} rx={rx} ry={ry}>
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#00D4FF_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorderGradient>
      </div>
      <div
        className={cn(
          "relative bg-dark-950 border border-gray-800 backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${rx} * 0.96) / calc(${ry} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
};

const MovingBorderGradient = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useRef<ReturnType<typeof requestAnimationFrame>>();
  const [pathLength, setPathLength] = useState<number>(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      if (pathRef.current && pathLength > 0) {
        const point = pathRef.current.getPointAtLength(progress * pathLength);
        const transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
        const child = pathRef.current.parentElement?.querySelector(
          ".moving-border-child"
        ) as HTMLElement;
        if (child) {
          child.style.transform = transform;
        }
      }
      requestAnimationFrame(animate);
    };
    progress.current = requestAnimationFrame(animate);
    return () => {
      if (progress.current) cancelAnimationFrame(progress.current);
    };
  }, [pathLength, duration]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute h-full w-full"
      width="100%"
      height="100%"
    >
      <rect
        fill="none"
        width="100%"
        height="100%"
        rx={rx}
        ry={ry}
        ref={pathRef}
      />
      <foreignObject width="100%" height="100%">
        <div className="moving-border-child absolute">{children}</div>
      </foreignObject>
    </svg>
  );
};

export const Button = ({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) => {
  return (
    <Component
      className={cn(
        "relative text-xl h-16 w-40 p-[1px] overflow-hidden bg-transparent",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: duration ?? 4, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: "-100%",
            background:
              "conic-gradient(from 0deg, transparent, #00D4FF, #E91E8C, transparent 40%)",
          }}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-dark-950 text-sm antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
};
