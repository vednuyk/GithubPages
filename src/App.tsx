import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FolderRoot, 
  FileText, 
  Globe, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Menu
} from 'lucide-react';

// --- Types ---
type Tab = 'Introduce' | 'Project' | 'Post';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
  link?: string;
  side: 'left' | 'right';
}

// --- Data ---
const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "소프트웨어학과 전과",
    date: "2020.09.03",
    description: "컴퓨터 과학의 기초를 다지기 위해 소프트웨어학과로 전과를 결정하였습니다.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    side: 'left'
  },
  {
    id: 2,
    title: "첫 웹 프로젝트 수상",
    date: "2021.05.15",
    description: "React를 활용한 첫 포트폴리오 사이트로 교내 경진대회에서 우수상을 수상했습니다.",
    link: "https://github.com",
    side: 'right'
  },
  {
    id: 3,
    title: "IT 연합 동아리 활동",
    date: "2022.03.10",
    description: "다양한 전공의 학생들과 협업하며 실제 서비스의 기획부터 배포까지 경험했습니다.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
    side: 'left'
  }
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => (
  <aside className="w-full lg:w-80 bg-slate-950 text-slate-300 p-8 flex flex-col h-full lg:fixed lg:left-0 lg:top-0 border-r border-slate-900">
    <div className="flex flex-col items-center mb-12">
      <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-900 overflow-hidden mb-6 flex items-center justify-center">
        <span className="text-slate-500 text-sm">Profile photo</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">vednuyk</h1>
      <p className="text-purple-400 font-medium mb-4">Frontend Developer</p>
      <p className="text-sm text-slate-500 text-center leading-relaxed">
        I design meaningful digital experiences that solve real problems and create value.
      </p>
    </div>

    <nav className="flex-1 space-y-2">
      {[
        { id: 'Introduce' as Tab, icon: Home, label: 'Introduce' },
        { id: 'Project' as Tab, icon: FolderRoot, label: 'Project' },
        { id: 'Post' as Tab, icon: FileText, label: 'Post' }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
            activeTab === item.id 
              ? 'bg-slate-900 text-white shadow-lg' 
              : 'hover:bg-slate-900/50 hover:text-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-purple-500' : 'text-slate-500'}`} />
            <span className="font-medium">{item.label}</span>
          </div>
          {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
        </button>
      ))}
    </nav>

    <div className="pt-8 mt-auto border-t border-slate-900 flex flex-col gap-6">
      <div className="flex items-center gap-4 px-2">
        <a href="https://github.com/vednuyk" className="hover:text-purple-500 transition-colors"><Globe className="w-5 h-5" /></a>
        <a href="mailto:example@email.com" className="hover:text-purple-500 transition-colors"><Mail className="w-5 h-5" /></a>
      </div>
      <p className="text-xs text-slate-600">© 2026 vednuyk. All rights reserved.</p>
    </div>
  </aside>
);

const TimelineItemComponent = ({ item }: { item: TimelineItem }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative mb-20 flex w-full ${item.side === 'right' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`max-w-xl w-full flex flex-col ${item.side === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className="relative mb-2">
        <h3 className="text-xl font-bold text-slate-900 px-1">{item.title}</h3>
        <div className={`mt-2 h-0.5 bg-slate-300 relative w-full`}>
          <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-600 ${
            item.side === 'right' ? '-right-4' : '-left-4'
          }`} />
        </div>
      </div>
      
      <p className="text-slate-500 font-medium mb-4 mt-2 px-1">{item.date}</p>
      
      {item.image && (
        <div className="w-full max-w-md h-56 bg-slate-100 rounded-3xl overflow-hidden mb-4 border border-slate-200 flex items-center justify-center">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      )}

      {item.description && <p className="text-slate-600 leading-relaxed mb-4 max-w-md px-1">{item.description}</p>}
      
      {item.link && (
        <a href={item.link} className="inline-flex items-center gap-1 text-slate-400 hover:text-purple-600 transition-colors text-sm font-medium px-1">
          {item.side === 'right' && <ExternalLink className="w-3 h-3" />}
          View Project 
          {item.side === 'left' && <ExternalLink className="w-3 h-3" />}
        </a>
      )}
    </div>
  </motion.div>
);

const IntroduceSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full py-12 px-6 lg:pl-32 lg:pr-16"
  >
    <header className="mb-24">
      <div className="flex items-center gap-2 text-slate-400 mb-8 text-sm uppercase tracking-widest font-semibold">
        <div className="w-2 h-2 rounded-full bg-purple-500" /> Introduce
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">My Introduce</h2>
      <p className="text-slate-700 leading-relaxed text-lg max-w-2xl font-light">
        안녕하세요! 새로운 기술을 배우고 적용하는 것을 즐기는 개발자 <span className="text-slate-900 font-semibold underline decoration-purple-500/30 underline-offset-4">vednuyk</span>입니다. 
        단순한 코드 작성을 넘어 사용자에게 가치를 전달하는 감각적인 UI/UX를 추구합니다.
      </p>
    </header>

    <div className="w-full h-px bg-slate-200 mb-24 max-w-5xl" />

    <section className="max-w-5xl">
      <div className="flex items-center gap-4 mb-20">
        <h2 className="text-3xl font-bold text-slate-900">My Journey</h2>
        <ChevronRight className="text-slate-300 w-6 h-6" />
      </div>

      <div className="relative px-4">
        {/* Vertical Center Line for Journey */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />
        
        <div className="space-y-4">
          {timelineData.map(item => (
            <TimelineItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  </motion.div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Introduce');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-sans selection:bg-purple-100 selection:text-purple-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 lg:ml-80 p-4 lg:p-8 min-h-screen">
        <motion.div 
          className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 min-h-full relative overflow-hidden flex flex-col"
          layout
        >
          {/* Header Controls (Decorational) */}
          <div className="p-8 flex justify-end lg:hidden">
            <Menu className="w-6 h-6 text-slate-400" />
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'Introduce' && (
              <IntroduceSection key="introduce" />
            )}
            {activeTab === 'Project' && (
              <motion.div 
                key="project"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-16 text-slate-400 italic"
              >
                Project content coming soon...
              </motion.div>
            )}
            {activeTab === 'Post' && (
              <motion.div 
                key="post"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-16 text-slate-400 italic"
              >
                Post content coming soon...
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default App;
