import dynamic from 'next/dynamic';
import Head from "next/head";
import Link from "next/link";
import { motion } from 'motion/react';
import { profileData } from "data/profile";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import TextReveal, { FadeUp, ScaleUp } from "@/components/TextReveal";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechMarquee from "@/components/TechMarquee";

// Dynamic import for R3F to avoid SSR issues
const Hero3D = dynamic(() => import('@/components/Hero3D'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-stone-950" />
});

export const siteTitle = "Sadman Yasar Sayem | Software Engineer";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Sadman Yasar Sayem - Software Engineer based in Malaysia. Building exceptional digital experiences with modern web technologies." />
        <meta property="og:image" content={profileData.profile} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-stone-950 text-white min-h-screen">
        <ScrollProgress />
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Hero3D />
          
          <div className="relative z-10 container-custom text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <img
                  src={profileData.profile}
                  alt={profileData.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-500/50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-purple-400 text-lg md:text-xl font-mono mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <h1 className="heading2Xl mb-6">
              <TextReveal delay={0.3}>
                {profileData.name}
              </TextReveal>
            </h1>

            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {profileData.tagline}
            </motion.h2>

            <motion.p
              className="max-w-2xl mx-auto text-lg text-gray-400 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {profileData.title} based in Malaysia, crafting exceptional digital experiences.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {profileData.urls.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.alt}
                  className="w-12 h-12 flex items-center justify-center rounded-full glass hover-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={social.iconPath} alt={social.name} className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#about"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.a>
              <Link href="/blog">
                <motion.span
                  className="px-8 py-4 border border-white/20 hover:border-purple-500/50 text-white font-medium rounded-full transition-colors inline-block cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read My Blog
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div className="w-1 h-2 bg-purple-500 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container-custom">
            <FadeUp>
              <h2 className="headingXl text-center mb-4">
                <span className="gradient-text">About Me</span>
              </h2>
              <p className="text-center text-gray-500 mb-16">Get to know me better</p>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScaleUp>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
                  <img
                    src={profileData.profile}
                    alt={profileData.name}
                    className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                  />
                </div>
              </ScaleUp>

              <FadeUp delay={0.2}>
                <div className="space-y-6">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {profileData.bio}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    When I'm not coding, you can find me exploring new technologies, 
                    contributing to open-source projects, or sharing my knowledge through 
                    blog posts and mentoring.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a
                      href="mailto:hello@sadmanyasar.dev"
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors inline-flex items-center gap-2"
                    >
                      <span>Get in Touch</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section bg-stone-900/50">
          <div className="container-custom">
            <FadeUp>
              <h2 className="headingXl text-center mb-4">
                <span className="gradient-text">Work Experience</span>
              </h2>
              <p className="text-center text-gray-500 mb-16">My professional journey</p>
            </FadeUp>

            <ExperienceTimeline experience={profileData.experience} />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="section">
          <div className="container-custom mb-12">
            <FadeUp>
              <h2 className="headingXl text-center mb-4">
                <span className="gradient-text">Tech Stack</span>
              </h2>
              <p className="text-center text-gray-500">Technologies I work with</p>
            </FadeUp>
          </div>

          <TechMarquee techStack={profileData.techStack} />
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} {profileData.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {profileData.urls.slice(0, 4).map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-purple-400 transition-colors"
                    aria-label={social.alt}
                  >
                    <img src={social.iconPath} alt={social.name} className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
