import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/Hero/HeroSection';
import ProjectNetwork from './components/ProjectNetwork/ProjectNetwork';
import SkillNetwork from './components/SkillNetwork';

function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10 w-full min-h-screen text-white">
        <HeroSection />
        <ProjectNetwork />
        <SkillNetwork />
      </div>
    </>
  );
}

export default App;
