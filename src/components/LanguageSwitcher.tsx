import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from 'flowbite-react'; // Import Flowbite Button

interface LanguageSwitcherProps {
    selectedLang?: string;
    onChangeLang?: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ selectedLang, onChangeLang }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<string>(selectedLang || i18n.language);

    useEffect(() => {
        if (selectedLang && selectedLang !== currentLanguage) {
            setCurrentLanguage(selectedLang);
        }
    }, [selectedLang, currentLanguage]);

    const changeLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'id' : 'en';
        i18n.changeLanguage(newLanguage);
        setCurrentLanguage(newLanguage);
        if (onChangeLang) {
            onChangeLang(newLanguage);
        }
    };

    return (
        <motion.div
            className="language-switcher fixed top-0 left-0 z-10 flex justify-center items-center mt-2 ml-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex items-center"
                whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#FABD2F",
                    transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                }}
            >
                <Button
                    color="warning" // Flowbite warning color for a yellowish background
                    onClick={changeLanguage}
                    className=" text-white font-semibold rounded-lg shadow-md"
                >
                    <AnimatePresence mode='wait'>
                        <motion.span
                            key={currentLanguage}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                        >
                            {currentLanguage.toUpperCase()}
                        </motion.span>
                    </AnimatePresence>
                </Button>
            </motion.div>
        </motion.div>
    );
}

export default LanguageSwitcher;
