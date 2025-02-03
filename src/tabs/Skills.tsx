// Skills.js
import { motion } from 'framer-motion';
import SklRaw from '../data/Skills.json';

const Skills = () => {
  // Animation configurations (remain the same)
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  // Process skills data (remain the same)
  const processSkillsData = () => {
    const categorized = [];
    const uncategorized = [];

    (SklRaw?.skills || []).forEach(entry => {
      if (entry?.category && entry?.skills) {
        categorized.push(entry);
      } else if (entry?.name) {
        uncategorized.push(entry);
      }
    });

    return { categorized, uncategorized };
  };

  const { categorized, uncategorized } = processSkillsData();

  // Reusable list section renderer with Tailwind
  const renderListSection = (title, items) => (
    items?.length > 0 && (
      <div className="mb-4" >
        <strong className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          {title}:
        </strong>
        <ul className="list-disc pl-6 space-y-1">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="text-gray-600 dark:text-gray-400">
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  );

  // Skill card component with Tailwind
  const SkillCard = ({ skill, index }) => (
<motion.div
  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  variants={item}
  whileHover={{ scale: 1.02 }}
  key={`skill-${index}-${skill.name}`}
>
  {skill.logo && (
    <div className="flex items-center justify-center mb-4">
      <img 
        src={skill.darkLogo ? skill.darkLogo : skill.logo} 
        alt={skill.name} 
        className="w-12 h-12 object-contain block dark:hidden"
      />
      <img 
        src={skill.logo} 
        alt={skill.name} 
        className="w-12 h-12 object-contain hidden dark:block"
      />
    </div>
  )}

  <div className="skill-content">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
      {skill.name}
    </h3>
    {skill.description && (
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {skill.description}
      </p>
    )}

    {renderListSection("Technologies", skill.technologies)}
    {renderListSection("Tools Used", skill.toolsUsed)}
    {renderListSection("Methodologies", skill.methodologies)}

    {skill.details?.map((detail, detailIndex) => (
      <div 
        key={`detail-${index}-${detailIndex}`}
        className="mb-4"
      >
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
          {detail.title}
        </h4>
        <ul className="list-disc pl-6 space-y-1">
          {detail.items?.map((item, itemIndex) => (
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
      className="container px-4 py-8 mt-[-60px]"
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
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
            variants={item}
          >
            {category.category}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
            variants={item}
          >
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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