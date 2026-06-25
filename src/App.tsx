import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/Hero/HeroSection';
import ProjectNetwork from './components/ProjectNetwork/ProjectNetwork';
import SkillNetwork from './components/SkillNetwork';
import LanguageTicker from './components/SkillNetwork/LanguageTicker';

function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10 w-full min-h-screen text-white">
        <HeroSection />
        <ProjectNetwork />
        <SkillNetwork />
        <LanguageTicker />
      </div>
    </>
  );
}

export default App;
