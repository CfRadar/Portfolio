import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#020308] border-t border-[#1e293b]/50 py-8 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copy/Identity */}
        <div className="flex items-center gap-2">
          <span className="text-[#00FFB3] font-mono text-xs tracking-widest">&lt;</span>
          <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Anurag Yadav
          </span>
          <span className="text-[#00FFB3] font-mono text-xs tracking-widest">/&gt;</span>
        </div>

        {/* Right Side: Social Links */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/CfRadar/" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-500 hover:text-[#00C8FF] transition-colors font-mono text-xs tracking-widest uppercase"
          >
            [ GITHUB ]
          </a>
          
          <a 
            href="https://www.linkedin.com/in/anurag-yadav-142774338/" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-500 hover:text-[#00C8FF] transition-colors font-mono text-xs tracking-widest uppercase"
          >
            [ LINKEDIN ]
          </a>
          
          <a 
            href="https://x.com/CfRadar" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-500 hover:text-[#00C8FF] transition-colors font-mono text-xs tracking-widest uppercase"
          >
            [ X / TWITTER ]
          </a>

          <a 
            href="mailto:anurag312006yadav@gmail.com" 
            className="text-[#00FFB3] hover:text-white transition-colors font-mono text-xs tracking-widest uppercase ml-2 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFB3] animate-pulse" />
            EMAIL
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
