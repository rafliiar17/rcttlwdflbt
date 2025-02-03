import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type ResourcesType = {
  [key: string]: {
    translation: Record<string, string>;
  };
};

const resources: ResourcesType = {
  en: {
    translation: {
      "Home": "Home",
      "About Me": "About Me",
      "Education": "Education",
      "Work": "Work History",
      "Skills": "Skills",
      "Project": "Project",
      "Certificate": "Certificate List",
      "Contact Information": "Contact Information",
      "~\\Home": "~\\Home",
      "~\\Education": "~\\Education",
      "~\\Experience": "~\\Experience",
      "~\\Skills": "~\\Skills",
      "~\\Project": "~\\Project",
      "~\\Certificate": "~\\Certificate",
      "~\\Contact": "~\\Contact",
      "Work and Internship": "Work and Internship",
      "Weather in": "Weather in",
    }
  },
  id: {
    translation: {
      "Home": "Beranda",
      "About Me": "Tentang Saya",
      "Education": "Pendidikan",
      "Work": "Riwayat Kerja",
      "Skills": "Keterampilan",
      "Project": "Proyek",
      "Certificate": "Sertifikat Saya",
      "Contact Information": "Informasi Kontak",
      "~\\Home": "~\\Beranda",
      "~\\Education": "~\\Pendidikan",
      "~\\Experience": "~\\Pengalaman",
      "~\\Skills": "~\\Keahlian",
      "~\\Project": "~\\Proyek",
      "~\\Certificate": "~\\Sertifikat",
      "~\\Contact": "~\\Kontak",
      "Work and Internship": "Riwayat Kerja dan Magang",
      "Weather in": "Cuaca di  ",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || process.env.REACT_APP_LANG || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  } as i18n.InitOptions);

export const changeLanguage = (lng: string): void => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
};

export default i18n;