'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FadeUp } from './text-reveal';

export interface ExperienceItem {
  period?: string;
  role?: string;
  company?: string;
  description?: string;
  technologies?: string[];
}

interface ExperienceTimelineProps {
  experience?: ExperienceItem[];
}

export default function ExperienceTimeline({ experience = [] }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated progress line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
        <motion.div
          className="w-full bg-gradient-to-b from-purple-500 to-pink-500 origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="space-y-16 md:space-y-24">
        {experience.map((exp, index) => (
          <FadeUp key={index} delay={index * 0.1}>
            <div 
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 md:gap-16`}
            >
              {/* Timeline node */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-stone-950 transform -translate-x-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Content */}
              <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <div className="glass rounded-2xl p-6 md:p-8 hover-glow transition-all duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-full mb-4">
                    {exp.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {exp.role}
                  </h3>
                  <h4 className="text-lg text-purple-400 mb-4">
                    {exp.company}
                  </h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
