import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Layout, Globe, ArrowRight, Code } from 'lucide-react';

const App: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 -z-10" />
        
        <div className="container mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Sensational Web Design</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              당신의 아이디어를 <br />
              <span className="text-purple-500">감각적인</span> 현실로
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              React와 Framer Motion으로 제작된 최첨단 반응형 웹사이트입니다. 
              부드러운 애니메이션과 세련된 UI를 통해 최고의 사용자 경험을 제공합니다.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 transition-colors rounded-xl font-semibold flex items-center justify-center gap-2 group">
                시작하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors rounded-xl font-semibold flex items-center justify-center gap-2">
                <Code className="w-4 h-4" /> GitHub 보기
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: "초고속 성능", desc: "Vite 기반의 최적화된 빌드로 눈 깜빡할 사이 로딩됩니다." },
              { icon: Layout, title: "완벽한 반응형", desc: "모바일, 태블릿, 데스크탑 모든 화면에서 완벽하게 보입니다." },
              { icon: Globe, title: "자동 배포", desc: "GitHub Actions를 통해 클릭 한 번으로 배포가 완료됩니다." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          © 2026 Sensational Web. Built with React & Tailwind CSS.
        </div>
      </footer>
    </div>
  );
};

export default App;
