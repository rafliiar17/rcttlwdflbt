import { useState, useEffect, useCallback, ComponentType } from "react";
import { DarkThemeToggle } from "flowbite-react";
import { FaHome, FaGraduationCap, FaSuitcase, FaTools, FaClipboardList, FaCertificate, FaCaretRight, FaPhone } from "react-icons/fa";
import { ASCII } from "./components/TerminalHeader";
import { db } from "./firebase"; // Import Firebase db
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const iconMap = {
  home: FaHome,
  "graduation-cap": FaGraduationCap,
  suitcase: FaSuitcase,
  tools: FaTools,
  "clipboard-list": FaClipboardList,
  certificate: FaCertificate,
  contact: FaPhone
} as const;

const getTabContent = (activeTab: number) => {
  const tabComponents = [
    import("./tabs/Contact"),
    import("./tabs/Education"),
    import("./tabs/Experience"),
    import("./tabs/Skills"),
    import("./tabs/Projects"),
    import("./tabs/Certificate")
  ];
  return tabComponents[activeTab];
};

const tabsContent = [
  { label: "Introduction", icon: "home" },
  { label: "Education", icon: "graduation-cap" },
  { label: "Experience", icon: "suitcase" },
  { label: "Skills", icon: "tools" },
  { label: "Projects", icon: "clipboard-list" },
  { label: "Certificate", icon: "certificate" }
] as const;

function Container() {
  const [activeTab, setActiveTab] = useState(0);
  const [TabContent, setTabContent] = useState<ComponentType | null>(null);
  const [visitorName, setVisitorName] = useState("Guest");
  const hostName = window.location.hostname;
  const currentDir = `/home/${visitorName}/`;

  const fetchVisitorName = useCallback(async (id: string) => {
    try {
      const q = query(collection(db, "visitors"), where("id", "==", parseInt(id)));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setVisitorName(userData.name);
      }
    } catch (error) {
      setVisitorName("Guest");
    }
  }, []);

  const initializeAndFetchVisitor = useCallback(async () => {
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      try {
        const visitorsCollection = collection(db, "visitors");
        const visitorsSnapshot = await getDocs(visitorsCollection);
        visitorId = (visitorsSnapshot.size + 1).toString();
        localStorage.setItem("visitorId", visitorId);
        await addDoc(visitorsCollection, { id: parseInt(visitorId), name: "Guest" });
      } catch (error) {
        // console.error("Error initializing visitor ID:", error);
      }
    }
    await fetchVisitorName(visitorId);
  }, [fetchVisitorName]);

  useEffect(() => {
    let isMounted = true;
    getTabContent(activeTab).then((module) => {
      if (isMounted) {
        setTabContent(() => module.default as ComponentType);
      }
    });
    return () => { isMounted = false; };
  }, [activeTab]);

  useEffect(() => {
    initializeAndFetchVisitor();
  }, [initializeAndFetchVisitor]);

  return (
    <main className="flex min-h-screen items-center justify-center dark:bg-gray-900 p-8">
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden flex flex-col" style={{ width: '90vw', height: '90vh' }}>
        <div className="flex items-center justify-between bg-gray-800 pl-5 pr-5 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-white text-lg" >  {visitorName}@{hostName}</div>

          <DarkThemeToggle className="text-white hover:bg-gray-700 focus:ring-gray-700" />
        </div>

        <div className="flex border-b border-gray-700">
          {tabsContent.map((tab, index) => {
            const Icon = iconMap[tab.icon as keyof typeof iconMap];
            return (
              <button
                key={tab.label}
                className={`size-12 px-10 py-3 text-lg font-semibold border-b-4 flex-1 flex items-center justify-center ${activeTab === index ? "text-white border-green-400" : "text-gray-400 border-transparent hover:text-white hover:border-gray-500"}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
                {Icon && <Icon className="ml-2 w-4 h-4" />}
              </button>
            );
          })}
        </div>

        <div className="p-10 text-lg font-mono text-green-400 overflow-y-auto flex-1">
          <ASCII />
          <div className="mb-8 flex items-center">
            <FaCaretRight className="text-gray-500 mr-2" />
            <span className="text-gray-400">{visitorName}@127.0.0.1:</span>
            <span className="text-blue-400 ml-1">{currentDir}{tabsContent[activeTab].label.toLowerCase()}</span>
            <span className="text-gray-400 ml-1">$</span>
            <div className="animate-pulse ml-1">▊</div>
          </div>
          {TabContent ? <TabContent /> : <div className="text-gray-400">Loading content...</div>}
        </div>
      </div>
    </main>
  );
}

export default Container;