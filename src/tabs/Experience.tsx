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
  lang: {
    [key: string]: LanguageData;
  };
}

// Update the experiences access to handle potential undefined values
// const experiences = ExperienceData.lang.en?.companies || [];

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
      className="group relative mb-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/15"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />

      <div className="mb-6 flex items-start">
        <div className="relative mr-6 h-20 w-20 shrink-0">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 opacity-30 blur transition-opacity group-hover:opacity-50" />
          <img
            src={imgError ? "/fallback-logo.png" : company.logo}
            alt={`${company.name} logo`}
            onError={() => setImgError(true)}
            className="h-full w-full rounded-lg border border-white/10 bg-white/5 object-contain p-2 backdrop-blur-sm"
          />
        </div>

        <div className="flex-1">
          <motion.p
            className="mb-2 inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400"
            whileHover={{ scale: 1.02 }}
          >
            🏢 {company.status}
          </motion.p>
          <h2 className="mb-1 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
            {company.name}
          </h2>
          <p className="flex items-center text-sm font-medium text-gray-300/90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4 text-cyan-400"
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
                className="group flex w-full items-start text-left focus:outline-none"
                onClick={() => toggleDetails(descIndex)}
                aria-expanded={isOpen(descIndex)}
                layout
              >
                <div className="absolute left-0 top-2 flex h-3 w-3 items-center justify-center rounded-full bg-purple-500/80 transition-colors group-hover:bg-purple-400">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-white"
                    animate={{ scale: isOpen(descIndex) ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                </div>

                <motion.div className="ml-4 flex-1" layout="position">
                  <div className="flex items-center">
                    <motion.span
                      className="mr-3 text-xl text-purple-400"
                      animate={{ rotate: isOpen(descIndex) ? 90 : 0 }}
                    >
                      ➔
                    </motion.span>
                    <h3 className="text-lg font-semibold text-gray-100 transition-colors group-hover:text-cyan-300">
                      {desc.task}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen(descIndex) && (
                      <motion.div
                        className="ml-10 mt-4 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="space-y-3 pb-2">
                          {desc.details.split("\n").map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="flex items-start text-sm leading-relaxed text-gray-300/90"
                            >
                              <span className="mr-3 mt-1 text-purple-400">
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
  const experiences = ExperienceData.lang.en?.companies || [];

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
        className="p-4 text-lg text-yellow-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ⚠️ No experience data available
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.h1
        className="mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent"
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