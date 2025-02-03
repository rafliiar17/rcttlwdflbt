import React from "react";
import { motion } from "framer-motion";
import Projraw from "../data/Project.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 }
  }
};

const toolVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export function Projects() {
  return (
    <div className="bg-transparent py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Projraw.projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-white rounded-xl shadow-[0px_4px_10px_rgba(34,197,94,0.5)] hover:shadow-[0px_6px_15px_rgba(34,197,94,0.7)] transition-all duration-300 ease-out"

              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <motion.img
                  src={project.project_img}
                  alt={project.project_name}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {project.project_name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {project.project_about}
                </p>
                
                <div className="flex justify-between items-center">
                  <motion.div className="flex flex-wrap gap-2">
                    {project.project_tool.split(", ").map((tool, i) => (
                      <motion.span
                        key={i}
                        variants={toolVariants}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-full"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.a
                    href={project.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fa-brands fa-github text-2xl"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;