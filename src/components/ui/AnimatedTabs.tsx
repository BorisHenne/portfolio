"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils";

type Tab = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
};

export const AnimatedTabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex space-x-1 rounded-xl bg-dark-900/50 p-1 border border-gray-800/50",
          containerClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
              activeTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-gray-300",
              tabClassName
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className={cn(
                  "absolute inset-0 rounded-lg bg-primary-500/20 border border-primary-500/30",
                  activeTabClassName
                )}
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className={cn("mt-4", contentClassName)}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export const GlowingTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: {
  tabs: { id: string; label: string; icon?: React.ReactNode; color?: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            activeTab === tab.id
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="glow-tab"
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${tab.color || "#00ff88"}20, ${tab.color || "#00ff88"}10)`,
                border: `1px solid ${tab.color || "#00ff88"}40`,
                boxShadow: `0 0 20px ${tab.color || "#00ff88"}20`,
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
