'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ACHIEVEMENTS } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About <span className="text-green-primary">CBCTrack</span>
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Kenya&apos;s Premier School Management System for CBC Implementation
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/images/about/cbc_used.jpg"
                alt="CBC Track being used in a Kenyan primary school"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-primary rounded-full opacity-20"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 leading-relaxed">
                CBCTrack was born out of a pressing need we observed across Kenyan primary schools. When the Ministry of Education introduced the Competency-Based Curriculum (CBC) in 2017, schools struggled with the increased documentation, continuous assessment requirements, and the shift to tracking individual learner achievements.
              </p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed">
                Founded by a team of experienced educators and technology experts in Nairobi, we set out to create a solution that would empower teachers and school administrators to implement CBC effectively while reducing paperwork and administrative burdens.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                We&apos;re committed to transforming primary education in Kenya through innovative digital solutions that make CBC implementation seamless, efficient, and effective for every school regardless of its resources or location.
              </p>
            </div>

            {/* Values */}
            <div className="grid gap-4 mt-8">
              {[
                { icon: '🎯', title: 'Purpose-Built for CBC', desc: 'Designed specifically for the Kenyan Competency-Based Curriculum with input from KICD certified educators.' },
                { icon: '🔄', title: 'Continuous Innovation', desc: 'Regular updates aligned with CBC policy changes and Ministry of Education requirements.' },
                { icon: '🤝', title: 'Kenyan Support', desc: 'Local customer support team that understands the unique challenges of Kenyan schools.' }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="text-2xl">{value.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Why Schools Choose CBCTrack
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </div>
                <p className="text-sm text-gray-600">
                  {achievement.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Leading Kenyan Primary Schools in CBC Excellence
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover how CBCTrack can transform your school&apos;s CBC implementation and administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">
              <a href="https://cbctrack.com/demo-request" target="_blank" rel="noopener noreferrer">
                Schedule a Free Demo
              </a>
            </Button>
            <Button variant="outline">
              <a href="#footer">Contact Our Team</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}