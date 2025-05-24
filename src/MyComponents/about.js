import React from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 45 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: 'easeOut' } },
}

const About = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      className="p-10 space-y-6 transition-opacity duration-500"
      whileInView="show"
      viewport={{ once: true , amount: 0.5 }}
    >
      <motion.h1 variants={item} className="text-4xl mb-6">About Code Canvas</motion.h1>

      <motion.p variants={item}>
        Welcome to <b>Code Canvas</b> — where developers write, share, and grow together.
        <br /><br />
        We built Code Canvas with one goal in mind: <b>to empower developers to tell their stories, share their code, and build a community through writing</b>. Whether you’re documenting your first "Hello World", breaking down a complex algorithm, or sharing thoughts on the future of tech, this is your space to do it.
      </motion.p>

      <motion.h1 variants={item} className="text-2xl my-4">Why Code Canvas?</motion.h1>

      <motion.p variants={item}>
        In a world flooded with tutorials and docs, we wanted a place that feels more personal, more developer-first. Code Canvas is:<br /><br />
        🧠 <b>Built for Devs</b> – Syntax highlighting, Markdown support, GitHub integration, and code snippets that actually look good.  <br />
        📚 <b>Knowledge Hub</b> – From junior devs to seasoned engineers, everyone has something to teach (and learn). <br />
        🌱 <b>Community-Driven</b> – Leave comments, start conversations, and connect with other devs who get it.  <br />
        🚀 <b>Open & Evolving</b> – We believe in transparency and improvement. Expect frequent updates, new tools, and an evolving platform.
      </motion.p>

      <motion.h1 variants={item} className="text-2xl my-4">What Can You Write About?</motion.h1>

      <motion.p variants={item}>
        Anything related to development, tech, and your personal journey:<br />
        - Programming tips & tricks.<br />
        - Deep dives into frameworks or languages.<br />
        - DevOps, AI, and emerging technologies.<br />
        - Career stories and lessons learned.<br />
        - Open source projects, hackathons, or side hustles.
      </motion.p>

      <motion.h1 variants={item} className="text-2xl my-4">Made by Developers, for Developers</motion.h1>

      <motion.p variants={item}>
        We’re developers too. We know the thrill of solving a bug at 2AM, the satisfaction of a clean refactor, and the joy of sharing a cool snippet with someone who <i>actually</i> gets it.<br /><br />
        This isn’t just a blog — it’s a canvas for your ideas, your voice, your code.
      </motion.p>
    </motion.div>
  )
}

export default About

