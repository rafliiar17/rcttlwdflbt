import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  logo: string;
  darkLogo?: string;
  description?: string;
  technologies?: string[];
  toolsUsed?: string[];
  methodologies?: string[];
  details?: {
    title: string;
    items: string[];
  }[];
}

interface Category {
  category: string;
  skills: Skill[];
}

interface SkillEntry {
  category?: string;
  skills?: Skill[];
  name?: string;
  logo?: string;
  darkLogo?: string;
  description?: string;
  technologies?: string[];
  toolsUsed?: string[];
  methodologies?: string[];
  details?: {
    title: string;
    items: string[];
  }[];
}

import SklRaw from '../data/Skills.json';

const Skills: React.FC = () => {
  // Animation configurations
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
      },
    },
  };

  // Process skills data
  const processSkillsData = () => {
    const categorized: Category[] = [];
    const uncategorized: Skill[] = [];

    (SklRaw?.skills || []).forEach((entry: SkillEntry) => {
      if (entry?.category && entry?.skills) {
        categorized.push({
          category: entry.category,
          skills: entry.skills,
        });
      } else if (entry?.name) {
        uncategorized.push({
          name: entry.name,
          logo: entry.logo || '',
          description: entry.description,
          technologies: entry.technologies,
          toolsUsed: entry.toolsUsed,
          methodologies: entry.methodologies,
          details: entry.details,
        });
      }
    });

    return { categorized, uncategorized };
  };

  const { categorized, uncategorized } = processSkillsData();

  // Reusable list section renderer with Tailwind
  const renderListSection = (title: string, items: string[] | undefined) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <strong className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
          {title}:
        </strong>
        <ul className="list-disc space-y-1 pl-6">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="text-gray-600 dark:text-gray-400">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Skill card component with Tailwind
  const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <motion.div
      className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
      variants={item}
      whileHover={{ scale: 1.02 }}
      key={`skill-${index}-${skill.name}`}
    >
      {skill.logo && (
        <div className="mb-4 flex items-center justify-center">
          <img
            src={skill.darkLogo ? skill.darkLogo : skill.logo}
            alt={skill.name}
            className="block h-12 w-12 object-contain dark:hidden"
          />
          <img
            src={skill.logo}
            alt={skill.name}
            className="hidden h-12 w-12 object-contain dark:block"
          />
        </div>
      )}

      <div className="skill-content">
        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          {skill.name}
        </h3>
        {skill.description && (
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {skill.description}
          </p>
        )}

        {renderListSection('Technologies', skill.technologies)}
        {renderListSection('Tools Used', skill.toolsUsed)}
        {renderListSection('Methodologies', skill.methodologies)}

        {skill.details?.map((detail, detailIndex) => (
          <div
            key={`detail-${index}-${detailIndex}`}
            className="mb-4"
          >
            <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
              {detail.title}
            </h4>
            <ul className="list-disc space-y-1 pl-6">
              {detail.items.map((item, itemIndex) => (
                <li
                  key={`item-${index}-${detailIndex}-${itemIndex}`}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="container mt-[-60px] px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Render categorized skills */}
      {categorized.map((category, catIndex) => (
        <div
          className="mb-12"
          key={`category-${catIndex}-${category.category}`}
        >
          <motion.h2
            className="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
            variants={item}
          >
            {category.category}
          </motion.h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.skills?.map((skill, skillIndex) => (
              <SkillCard
                key={`skill-${catIndex}-${skillIndex}`}
                skill={skill}
                index={skillIndex}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Render uncategorized skills */}
      {uncategorized.length > 0 && (
        <div className="mb-12">
          <motion.h2
            className="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
            variants={item}
          >
            Other Skills
          </motion.h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {uncategorized.map((skill, index) => (
              <SkillCard
                key={`uncategorized-${index}`}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Skills;