import React from "react";
import Eduraw from "../data/Education.json";
import { motion } from "framer-motion";
import { GraduationCap, CalendarDays, School } from "lucide-react";

interface EducationEntry {
  name: string;
  logo?: string;
  degree?: string;
  time?: string;
}

interface EducationData {
  lang: {
    [language: string]: {
      [key: string]: EducationEntry;
    };
  };
}

interface EduProps {
  lang?: string;
}

export const Education: React.FC<EduProps> = ({ lang = "en" }) => {
  const educationData = (Eduraw as EducationData).lang[lang];

  const filteredSchools = educationData
    ? Object.values(educationData).filter((school) => school?.name?.trim())
    : [];

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white dark:text-white mb-4 relative inline-flex items-center"
        >
          <School className="w-8 h-8 mr-3 text-indigo-600 dark:text-indigo-400" />
          Education Journey
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              custom={index}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100/20 to-purple-100/20 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 shadow-lg">
                    <div className="w-full h-full rounded-[8px] bg-white dark:bg-gray-800 flex items-center justify-center">
                      {school.logo ? (
                        <img
                          src={school.logo}
                          alt={`${school.name} logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/placeholder-logo.png";
                          }}
                        />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {school.name}
                  </h3>
                </div>

                {school.degree && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <p className="text-base font-medium">{school.degree}</p>
                  </div>
                )}

                {school.time && (
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <p className="text-sm font-medium">{school.time}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center p-8 rounded-xl bg-gray-50 dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No education records found
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Education;