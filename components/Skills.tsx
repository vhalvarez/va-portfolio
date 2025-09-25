import { EvervaultCard, Icon } from "./ui/evervault-card";
import { IconType } from "react-icons";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiVuedotjs,
  SiNodedotjs, SiExpress, SiNestjs, SiPhp, SiLaravel,
  SiFlutter, SiDart, SiMysql, SiPostgresql, SiMongodb, SiOracle,
  SiDocker, SiGit, SiJest
} from "react-icons/si";
import { FaCube, FaCubes, FaSitemap, FaExchangeAlt, FaProjectDiagram, FaAws, FaJava } from "react-icons/fa";
import { TbHexagon } from "react-icons/tb";
import { RiFlowChart } from "react-icons/ri";
import { IoLayers } from "react-icons/io5";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const ICONS: Record<string, IconType> = {
  "JS": SiJavascript,
  "TS": SiTypescript,
  "REACT.JS": SiReact,
  "NEXT.JS": SiNextdotjs,
  "VUE.JS": SiVuedotjs,

  "NODE.JS": SiNodedotjs,
  "EXPRESS": SiExpress,
  "NESTJS": SiNestjs,
  "PHP": SiPhp,
  "LARAVEL": SiLaravel,
  "JAVA": FaJava,

  "REACT NATIVE": SiReact,
  "FLUTTER": SiFlutter,
  "DART": SiDart,

  "MYSQL": SiMysql,
  "POSTGRES": SiPostgresql,
  "MONGODB": SiMongodb,
  "ORACLE": SiOracle,

  "DOCKER": SiDocker,
  "GIT": SiGit,
  "AWS": FaAws,

  "MONOLÍTICO": FaCube,
  "MICROSERVICIOS": FaCubes,
  "MVC": FaSitemap,
  "MVVM": RiFlowChart,
  "ARQ. HEXAGONAL": TbHexagon,
  "CLEAN ARCHITECTURE": IoLayers,
  "CQRS": FaExchangeAlt,
  "DDD": FaProjectDiagram,

  "JEST": SiJest, 
  "PEST": SiLaravel,   
};

type SkillGroup = { title: string; items: string[] };

const GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["JS", "TS", "REACT.JS", "NEXT.JS", "VUE.JS"],
  },
  {
    title: "Backend",
    items: ["NODE.JS", "EXPRESS", "NESTJS", "PHP", "LARAVEL", "JAVA"],
  },
  {
    title: "Mobile",
    items: ["REACT NATIVE", "FLUTTER", "DART"],
  },
  {
    title: "Databases",
    items: ["MYSQL", "POSTGRES", "MONGODB", "ORACLE"],
  },
  {
    title: "DevOps & Cloud",
    items: ["DOCKER", "GIT", "AWS"],
  },
  {
    title: "Arquitectura & Patrones",
    items: [
      "MONOLÍTICO",
      "MICROSERVICIOS",
      "MVC",
      "MVVM",
      "ARQ. HEXAGONAL",
      "CLEAN ARCHITECTURE",
      "CQRS",
      "DDD",
    ],
  },
  {
    title: "Testing",
    items: ["JEST", "PEST"],
  },
];

// Hints opcionales: se muestran debajo del título si existen.
const HINTS: Record<string, string> = {
  // Frontend
  "JS": "Foundation of the web/frontend.",
  "TS": "Static typing on top of JS.",
  "REACT.JS": "Declarative UI with components.",
  "NEXT.JS": "SSR/SSG, routing, full-stack React.",
  "VUE.JS": "Reactivity and Single-File Components.",

  // Backend
  "NODE.JS": "JS on the server, event loop.",
  "EXPRESS": "Minimal HTTP framework for Node.",
  "NESTJS": "Modular architecture & DI for Node.",
  "PHP": "Classic backend language.",
  "LARAVEL": "Elegant PHP framework.",
  "JAVA": "OO, enterprise, JVM ecosystem.",

  // Mobile
  "REACT NATIVE": "Native mobile apps with React.",
  "FLUTTER": "Native-like UI across platforms (Dart).",
  "DART": "Language used by Flutter.",

  // Databases
  "MYSQL": "Popular relational SQL database.",
  "POSTGRES": "Advanced SQL with rich extensions.",
  "MONGODB": "Document-oriented NoSQL, flexible schema.",
  "ORACLE": "Enterprise RDBMS (PL/SQL).",

  // DevOps & Cloud
  "DOCKER": "Containers for portability & reproducibility.",
  "GIT": "Distributed version control.",
  "AWS": "Cloud compute, storage, and networking.",

  // Architecture & Patterns
  "MONOLÍTICO": "Single app, single deploy. Great for MVP.",
  "MICROSERVICIOS": "Independent services, domain-based scaling.",
  "MVC": "Model–View–Controller separation.",
  "MVVM": "View + reactive ViewModel.",
  "ARQ. HEXAGONAL": "Ports & Adapters; decouple the domain.",
  "CLEAN ARCHITECTURE": "Layered rings; domain at the center.",
  "CQRS": "Separate reads and writes.",
  "DDD": "Ubiquitous language and rich domain model.",

  // Testing
  "JEST": "Unit/integration testing for Node/Nest.",
  "PEST": "Fluent syntax over PHPUnit for Laravel.",
};


function SkillCard({ label }: { label: string }) {
  const SkillIcon = ICONS[label];

  return (
    <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 d text-white" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-whitetext-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3  text-white" />

      {SkillIcon && (
        <EvervaultCard text={<SkillIcon
          aria-hidden
          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 opacity-90"
        />} />
      )}

     
      <div className="relative z-10 mt-auto p-2">
        <h3 className="text-white mt-4 text-sm font-bold px-2">{label}</h3>
        {HINTS[label] && (
          <p className="text-sm font-light border border-white/[0.2] rounded-full mt-4 text-white px-4 py-0.5">{HINTS[label]}</p>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="text-white pt-[80px] sm:pt-[84px] lg:pt-[96px] pb-12 sm:pb-14">
      <p className="font-medium leading-[0.82] tracking-tight text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[10vw] text-center">
        Skills
      </p>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {GROUPS.map((group) => (
          <div key={group.title} className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight py-4">
              <TypewriterEffectSmooth words={group.title} />
              
            </h2>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.items.map((skill) => (
                <SkillCard key={skill} label={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
