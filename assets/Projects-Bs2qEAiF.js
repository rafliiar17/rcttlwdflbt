import{j as e}from"./index-B3giTGwe.js";import{m as a}from"./proxy-P4oIl_jw.js";const o=[{project_img:"./img/python-data-generator.png",project_name:"Python LTB Generator",project_about:"Data generator from Python project to generate Land and Building Tax System",project_tool:"Python, MariaDB, MongoDB,",project_link:"https://github.com/rafliiar17/pbb-data-generator-python"},{project_img:"./img/mirror-ubuntu.png",project_name:"Mirror Repo Ubuntu Installer",project_about:`This script updates the mirror list for an Ubuntu system,
selects the best mirror based on connection times,
and updates the sources.list file accordingly.`,project_tool:"Wget, Curl, Netselect, bc, Vscode, VMware",project_link:"https://github.com/rafliiar17/mirror-repo-checker-ubuntu2204"},{project_img:"./img/navicat.png",project_name:"Navicat 17 Remove Trial",project_about:"Script powershell to bypass time trial of navicat application using batchfile",project_tool:"Powershell, Vscode",project_link:"https://github.com/rafliiar17/NAVICAT17-REMOVE-TRIAL"}],n={projects:o},l={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.2,delayChildren:.3}}},c={hidden:{opacity:0,y:30},visible:{opacity:1,y:0,transition:{type:"spring",stiffness:120}}},p={hidden:{opacity:0,scale:.8},visible:{opacity:1,scale:1}};function h(){return e.jsx("div",{className:"bg-transparent py-12",children:e.jsx("div",{className:"container mx-auto px-4 max-w-6xl",children:e.jsx(a.div,{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",variants:l,initial:"hidden",animate:"visible",children:n.projects.map((t,r)=>e.jsxs(a.div,{variants:c,className:"group bg-white rounded-xl shadow-[0px_4px_10px_rgba(34,197,94,0.5)] hover:shadow-[0px_6px_15px_rgba(34,197,94,0.7)] transition-all duration-300 ease-out",whileHover:{y:-10},children:[e.jsxs("div",{className:"relative overflow-hidden rounded-t-xl",children:[e.jsx(a.img,{src:t.project_img,alt:t.project_name,className:"w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105",initial:{scale:1},whileHover:{scale:1.1}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"})]}),e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-2xl font-bold mb-3 text-gray-800",children:t.project_name}),e.jsx("p",{className:"text-gray-600 mb-4 line-clamp-3 leading-relaxed",children:t.project_about}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(a.div,{className:"flex flex-wrap gap-2",children:t.project_tool.split(", ").map((i,s)=>e.jsx(a.span,{variants:p,className:"bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-full",children:i},s))}),e.jsx(a.a,{href:t.project_link,target:"_blank",rel:"noopener noreferrer",className:"text-gray-600 hover:text-blue-600 transition-colors",whileHover:{scale:1.2},whileTap:{scale:.9},children:e.jsx("i",{className:"fa-brands fa-github text-2xl"})})]})]})]},r))})})})}export{h as Projects,h as default};
