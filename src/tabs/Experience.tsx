import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ExperienceData from "../data/Experience.json";



interface ExperienceCompany {
  name: string;
  logo: string;
  status: string;
  position_time: string;
  description: {
    task: string;
    details: string;
  }[];
}

interface LanguageData {
  companies: ExperienceCompany[];
}

interface ExperienceData {
  companies: ExperienceCompany[];
  lang: {
    [key: string]: LanguageData;
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  exit: { opacity: 0, y: -20 },
};

interface CompanyCardProps {
  company: ExperienceCompany;
  isOpen: (index: number) => boolean;
  toggleDetails: (index: number) => void;
}

const CompanyCard = ({ company, isOpen, toggleDetails }: CompanyCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      className="relative group backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 rounded-2xl shadow-2xl p-8 mb-8 hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/20"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />

      <div className="flex items-start mb-6">
        <div className="relative w-20 h-20 shrink-0 mr-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          <img
            src={imgError ? "/fallback-logo.png" : company.logo}
            alt={`${company.name} logo`}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-lg bg-white/5 p-2 backdrop-blur-sm border border-white/10"
          />
        </div>

        <div className="flex-1">
          <motion.p
            className="text-xs font-semibold text-purple-400 mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/20"
            whileHover={{ scale: 1.02 }}
          >
            🏢 {company.status}
          </motion.p>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
            {company.name}
          </h2>
          <p className="text-gray-300/90 text-sm font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {company.position_time}
          </p>
        </div>
      </div>

      <LayoutGroup>
        <div className="space-y-4">
          {company.description.map((desc, descIndex) => (
            <div
              key={descIndex}
              className="relative pl-6 before:absolute before:left-0 before:top-6 before:h-[calc(100%-24px)] before:w-0.5 before:bg-purple-500/30"
            >
              <motion.button
                className="w-full text-left flex items-start focus:outline-none group"
                onClick={() => toggleDetails(descIndex)}
                aria-expanded={isOpen(descIndex)}
                layout
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-500/80 group-hover:bg-purple-400 transition-colors flex items-center justify-center">
                  <motion.div
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    animate={{ scale: isOpen(descIndex) ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                </div>

                <motion.div className="ml-4 flex-1" layout="position">
                  <div className="flex items-center">
                    <motion.span
                      className="text-xl mr-3 text-purple-400"
                      animate={{ rotate: isOpen(descIndex) ? 90 : 0 }}
                    >
                      ➔
                    </motion.span>
                    <h3 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors">
                      {desc.task}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen(descIndex) && (
                      <motion.div
                        className="overflow-hidden ml-10 mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="space-y-3 pb-2">
                          {desc.details.split("\n").map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="text-gray-300/90 text-sm flex items-start leading-relaxed"
                            >
                              <span className="text-purple-400 mr-3 mt-1">
                                ▸
                              </span>
                              {line}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </motion.article>
  );
};

export function Experience() {
  const [openDetails, setOpenDetails] = useState<Record<number, boolean>>({});
  const experiences = ExperienceData.lang?.en?.companies || ExperienceData.companies;

  const toggleDetails = (index: number) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isOpen = (index: number) => !!openDetails[index];

  if (!experiences?.length) {
    return (
      <motion.div
        className="text-yellow-400 text-lg p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ⚠️ No experience data available
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Professional Journey
      </motion.h1>

      <LayoutGroup>
        <AnimatePresence mode="wait">
          {experiences.map((company, index) => (
            <CompanyCard
              key={`exp-${index}`}
              company={company}
              isOpen={isOpen}
              toggleDetails={toggleDetails}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

export default Experience;