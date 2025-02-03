import { useEffect, useState } from "react";
import { FaGithub, FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Introduction from "./Introduction";

const Contact = () => {
    const [profile, setProfile] = useState({});
    const [jobsData, setJobsData] = useState({});
    const [selectedJobId, setSelectedJobId] = useState("");
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(false);

    // Add default language constant
    const defaultLang = 'en';

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileRef = collection(db, "CONFIG");
                const profileSnapshot = await getDocs(profileRef);
                
                if (!profileSnapshot.empty) {
                    const profileDoc = profileSnapshot.docs.find(doc => doc.id === "Profile_profile");
                    const profileHighlightDoc = profileSnapshot.docs.find(doc => doc.id === "Introduction_lang");

                    if (profileDoc && profileHighlightDoc) {
                        // 1. Get jobselected from profile data
                        const profileData = profileDoc.data()?.profile?.details || {};
                        setProfile(profileData);
                        setSelectedJobId(profileData?.jobselected || "");

                        // 2. Get lang data with default language
                        const langData = profileHighlightDoc.data() || {};
                        const jobs = langData.lang?.[defaultLang]?.jobs || {};
                        setJobsData(jobs);
                    }
                }
            } catch (error) {
                // console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfileData();
    }, []);

    const contacts = [
        { icon: FaGithub, link: profile.github, color: "text-white", hover: "hover:text-gray-400" },
        { icon: FaTwitter, link: profile.x, color: "text-blue-400", hover: "hover:text-blue-300" },
        { icon: FaWhatsapp, link: profile.whatsapp, color: "text-green-500", hover: "hover:text-green-400" },
        { icon: FaLinkedin, link: profile.linkedin, color: "text-blue-500", hover: "hover:text-blue-400" },
        { icon: FaInstagram, link: profile.instagram, color: "text-pink-500", hover: "hover:text-pink-400" },
        { icon: FaEnvelope, link: profile.email ? `mailto:${profile.email}` : "", color: "text-red-500", hover: "hover:text-red-400" },
        { icon: FaPhone, link: profile.phone ? `tel:${profile.phone}` : "", color: "text-green-300", hover: "hover:text-green-200" },
    ];

    if (loading) return <div className="mt-20 text-center text-white">Loading...</div>;

    // Handle job title display
    const selectedJob = jobsData[selectedJobId]?.highlight;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex min-h-[1vh] flex-col items-center justify-center bg-gradient-to-br text-white"
        >
            {/* Introduction Modal */}
            {showIntro && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-10">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative max-h-[90%]  pb-10 w-full max-w-[90%] rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl shadow-black/50 overflow-hidden"
        >
            {/* Gradient Border with Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/40 to-purple-500/40 opacity-30 blur-xl" />

            {/* Animated Background with Subtle Motion */}
            <div className="absolute inset-0 -z-10 opacity-50">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"
                />
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
                />
            </div>

            {/* Header with Smooth Hover Effects */}
            <div className="relative flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-white/5 p-8">
                <h2 className="text-4xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {profile.name}&nbsp; - [{selectedJob}]
                    </span>
                </h2>
                <motion.button 
                    onClick={() => setShowIntro(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group rounded-full p-2 transition-all duration-300 hover:bg-white/10"
                >
                    <svg className="h-8 w-8 text-gray-300 transition-transform group-hover:rotate-90 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>
            </div>

            {/* Content with Smooth Entrance Animation */}
            <div className="custom-scrollbar relative max-h-[70vh] overflow-y-auto px-8 py-6 text-lg">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-6 leading-relaxed text-gray-300/90"
                >
                    <Introduction />
                </motion.div>
            </div>

            {/* Footer with Fade Effect */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"
            />
        </motion.div>
    </div>
)}


    
            {/* Main Content Container */}
            <div className="flex w-full max-w-6xl px-4">
                {/* Left Section - Profile */}
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 pr-8"
                >
                    <div className="ml-[-40%] flex flex-col items-center">
                        <div className="relative rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                            <div className="group relative rounded-full border-4 border-white/10 transition-all duration-300 hover:border-transparent">
                                <img 
                                    src={profile.photos || "/img/default.jpg"} 
                                    alt="Profile" 
                                    className="h-40 w-40 rounded-full object-cover shadow-2xl transition-all duration-500 hover:scale-95" 
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-gray-900/60 to-transparent" />
                            </div>
                        </div>
                        
                        <h1 className="mt-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            {profile.name || "John Doe"}
                        </h1>
                        <p className="mt-2 font-medium tracking-wider text-gray-300/90">{selectedJob}</p>
                        
                        <button 
                            onClick={() => setShowIntro(true)}
                            className="group relative mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30"
                        >
                            <span className="relative z-10">View Introduction</span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </button>
                    </div>
                </motion.div>
    
                {/* Right Section - Contact Grid */}
                <div className="flex flex-1 flex-col items-center pl-12">
                    <div className="relative mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent">
                        Contact Me
                    </div>
                    <div className="flex flex-wrap justify-center gap-10">
                        
                        {contacts.map((item, index) => {
                            const Icon = item.icon;
                            const isRightIcon = ['Instagram', 'LinkedIn'].includes(item.label);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-300 ${
                                        item.link ? "cursor-pointer hover:bg-gradient-to-r from-blue-500 to-purple-600" : "cursor-default opacity-50"
                                    } shadow-lg hover:shadow-xl ${item.hover} ${isRightIcon ? 'ml-auto' : ''}`}
                                >   
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    
                                    <div className="relative flex h-32 flex-col items-center justify-center p-6">
                                        <Icon className={`text-4xl ${item.color} transition-colors duration-300`} />
                                        <span className="mt-3 text-sm font-medium tracking-wider text-gray-300/90">
                                            {item.label}
                                        </span>
                                    </div>
                                    
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0"
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
    
            {/* Animated Background Elements */}
            <div className="fixed inset-0 -z-10 opacity-20">
                <div className="absolute -left-64 -top-64 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
                <div className="absolute -bottom-64 -right-64 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
            </div>
        </motion.div>
    );
}
export default Contact;