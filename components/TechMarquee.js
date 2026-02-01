'use client';

import { motion } from 'motion/react';

export default function TechMarquee({ techStack = [] }) {
  // Double the items for seamless loop
  const items = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden py-8 group">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
        whileHover={{ animationPlayState: 'paused' }}
        style={{
          animationPlayState: 'running',
        }}
      >
        {items.map((tech, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 px-6 py-4 glass rounded-xl hover-glow cursor-pointer transition-all duration-300 group/item"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span className="text-2xl md:text-3xl font-bold text-gray-400 group-hover/item:text-purple-400 transition-colors">
              {tech.name}
            </span>
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              {tech.category}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Second row - reverse direction */}
      <motion.div
        className="flex gap-8 whitespace-nowrap mt-6"
        animate={{ x: ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          },
        }}
      >
        {items.reverse().map((tech, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 px-6 py-4 glass rounded-xl hover-glow cursor-pointer transition-all duration-300 group/item"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span className="text-2xl md:text-3xl font-bold text-gray-400 group-hover/item:text-pink-400 transition-colors">
              {tech.name}
            </span>
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              {tech.category}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
