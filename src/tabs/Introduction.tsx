import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// import LanguageSwitcher from "../components/LanguageSwitcher";

interface ProfileData {
  profile?: {
    details?: {
      name?: string;
      jobselected?: string;
      photos?: string;
    };
  };
}

interface JobData {
  [key: string]: {
    description: string;
    highlight: string;
    cv: string;
  };
}

const Introduction = () => {
  const [selectedLang, setSelectedLang] = useState();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [jobsData, setJobsData] = useState<JobData | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileRef = collection(db, "CONFIG");
        const profileSnapshot = await getDocs(profileRef);

        if (!profileSnapshot.empty) {
          const profileDoc = profileSnapshot.docs.find(
            (doc) => doc.id === "Profile_profile"
          );
          const profileHighlightDoc = profileSnapshot.docs.find(
            (doc) => doc.id === "Introduction_lang"
          );

          if (profileDoc) {
            const profileData = profileDoc.data() as ProfileData;
            const details = profileData?.profile?.details;
            const langData = profileHighlightDoc?.data();

            setProfileData(profileData);

            if (langData) {
              setJobsData(langData.lang[selectedLang]?.jobs);
              setSelectedJobId(details?.jobselected || null);
            }

            if (details?.photos) {
              localStorage.setItem("profilePhoto", details.photos);
              setPhoto(details.photos);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const savedPhoto = localStorage.getItem("profilePhoto") || null;
    setPhoto(savedPhoto);

    fetchProfileData();
  }, [selectedLang]);

  if (loading) return <div className="py-5 text-center">Loading...</div>;
  if (!profileData || !jobsData)
    return <div className="py-5 text-center">Data unavailable</div>;

  const selectedJob = selectedJobId ? jobsData[selectedJobId] : null;
  if (!selectedJob)
    return <div className="py-5 text-center">Job not found</div>;

  const highlightTerms = (content: string[], termsToHighlight: string[]) => {
    if (!Array.isArray(content)) return content;

    return content.map((line, i) => {
      const regex = new RegExp(`(${termsToHighlight.join("|")})`, "gi");
      const parts = line.split(regex);

      return (
        <React.Fragment key={i}>
          {parts.map((part, j) =>
            termsToHighlight.some(
              (term) => term.toLowerCase() === part.toLowerCase()
            ) ? (
              <motion.strong
                key={j}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="font-bold text-blue-600"
              >
                {part}
              </motion.strong>
            ) : (
              part
            )
          )}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <motion.div
      className="container mx-auto mb-[-20px] pr-1"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, when: "beforeChildren" },
        },
      }}
    >
      {/* <LanguageSwitcher selectedLang={selectedLang} onChangeLang={setSelectedLang} /> */}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedJobId}-${selectedLang}`}
          className="mb-1 text-center "
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
          }}
        >
          <motion.h1 className="mt-[-20px] py-2 pl-20 text-3xl font-semibold transition-transform hover:scale-105">
            {/* {profileName}  [{selectedJob.highlight}] */}
          </motion.h1>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-center space-y-6  md:flex-row md:items-start md:space-x-10 md:space-y-0">
        {/* Left Section: Photo + CV Button */}
        <motion.div
          className="flex flex-col items-center "
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "anticipate" } },
          }}
        >
          <motion.img
            src={photo || ""}
            alt="Profile"
            className="h-60 w-60 rounded-lg  border border-gray-300 object-cover shadow-lg transition-transform hover:scale-105"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={{
              hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
              tap: { scale: 0.95 },
            }}
            className="mt-4"
          >
            <a href={selectedJob.cv} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                <i className="fas fa-passport" />
                <motion.span>View CV</motion.span>
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Section: Description with Highlight */}
        <motion.div
          className="flex-1 text-left "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedJobId}-${selectedLang}-content`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 text-lg leading-relaxed"
            >
              {highlightTerms(selectedJob.description.split("\n"), [
                selectedJob.highlight,
              ])}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Introduction;