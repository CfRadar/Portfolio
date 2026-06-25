import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const TerminalVisualizer = () => {
  const [lines, setLines] = useState<string[]>([]);
  const dummyLogs = [
    "INITIALIZING SECURE PROTOCOL...",
    "HANDSHAKE: OK",
    "BYPASSING FIREWALL [node_77]...",
    "ACCESS GRANTED.",
    "LOADING ENCRYPTION MODULES...",
    "AWAITING USER PAYLOAD...",
    "SYMMETRIC KEY GENERATED: 0x4F92B...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < dummyLogs.length) {
        setLines(prev => [...prev, dummyLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex w-full h-full border border-[#1e293b] bg-[#050816]/50 p-6 flex-col relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00FFB3]/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00FFB3]/50" />
      
      <div className="flex items-center justify-between mb-8 border-b border-[#1e293b] pb-4">
        <h3 className="font-mono text-[#00C8FF] text-sm tracking-widest">SYS_DIAGNOSTICS</h3>
        <div className="flex gap-2">
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#00FFB3]" />
          <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
        </div>
      </div>

      <div className="flex-1 font-mono text-xs text-gray-500 flex flex-col gap-2">
        {lines.map((line, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className={i === lines.length - 1 ? "text-[#00FFB3]" : ""}
          >
            <span className="text-gray-700 mr-2">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
            {line}
          </motion.div>
        ))}
        {lines.length === dummyLogs.length && (
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-4 bg-[#00FFB3] mt-2" />
        )}
      </div>

      {/* Rotating radar element at bottom */}
      <div className="absolute bottom-6 left-6 w-32 h-32 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          className="w-full h-full rounded-full border border-dashed border-[#00C8FF] flex items-center justify-center"
        >
          <div className="w-1/2 h-1/2 border border-[#00FFB3] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS environment variables (VITE_...).");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        {
          publicKey: publicKey,
        }
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMessage(err?.text || err?.message || String(err));
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <section className="relative w-full bg-[#03050c] text-white font-sans overflow-hidden py-24 border-t border-[#1e293b]/50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00C8FF" strokeWidth="0.5" strokeOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contactGrid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-mono font-bold tracking-widest text-white mb-2"
          >
            <span className="text-[#00FFB3] mr-4">&gt;</span>
            CONNECT_WITH_ME
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-[#00C8FF] ml-2"
            >_</motion.span>
          </motion.h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest">ESTABLISH SECURE LINK TO LOCAL_HOST</p>
        </div>

        {/* 2-Column Grid Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Visualizer */}
          <TerminalVisualizer />

          {/* Right Column: Form Container */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full bg-[#0a0f1e]/80 backdrop-blur-md border border-[#1e293b] rounded p-8 relative shadow-[0_0_50px_rgba(0,200,255,0.05)]"
          >
            {/* Cyberpunk Corners */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00C8FF]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00C8FF]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#00C8FF]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00C8FF]" />

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 h-full justify-between">
              
              {/* NAME FIELD */}
              <div className={`border transition-colors flex items-center gap-4 px-4 py-3 bg-[#050816]/50 ${focusedField === 'name' ? 'border-[#00FFB3] shadow-[0_0_15px_rgba(0,255,179,0.15)]' : 'border-[#1e293b]'}`}>
                <span className={`font-mono text-xs md:text-sm whitespace-nowrap ${focusedField === 'name' ? 'text-[#00FFB3]' : 'text-gray-500'}`}>
                  &gt; IDENTITY:
                </span>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="enter_designation..."
                  className="flex-1 bg-transparent text-white font-mono text-sm placeholder-gray-700 outline-none w-full"
                  required 
                />
              </div>

              {/* EMAIL FIELD */}
              <div className={`border transition-colors flex items-center gap-4 px-4 py-3 bg-[#050816]/50 ${focusedField === 'email' ? 'border-[#00FFB3] shadow-[0_0_15px_rgba(0,255,179,0.15)]' : 'border-[#1e293b]'}`}>
                <span className={`font-mono text-xs md:text-sm whitespace-nowrap ${focusedField === 'email' ? 'text-[#00FFB3]' : 'text-gray-500'}`}>
                  &gt; RETURN_ADDR:
                </span>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="sys@domain.com"
                  className="flex-1 bg-transparent text-white font-mono text-sm placeholder-gray-700 outline-none w-full"
                  required 
                />
              </div>

              {/* MESSAGE FIELD */}
              <div className={`border transition-colors flex flex-col gap-2 px-4 py-3 bg-[#050816]/50 flex-1 ${focusedField === 'message' ? 'border-[#00C8FF] shadow-[0_0_15px_rgba(0,200,255,0.15)]' : 'border-[#1e293b]'}`}>
                <span className={`font-mono text-xs md:text-sm ${focusedField === 'message' ? 'text-[#00C8FF]' : 'text-gray-500'}`}>
                  &gt; PAYLOAD_DATA:
                </span>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Initialize transmission block..."
                  className="flex-1 w-full bg-transparent text-white font-mono text-sm placeholder-gray-700 outline-none resize-none min-h-[120px]"
                  required 
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="relative w-full py-4 mt-2 border border-[#00C8FF] text-[#00C8FF] font-mono tracking-widest font-bold uppercase overflow-hidden group hover:bg-[#00C8FF]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00C8FF]/20 to-transparent skew-x-12"
                />
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'idle' && "TRANSMIT_DATA"}
                  {status === 'sending' && "ENCRYPTING_PAYLOAD..."}
                  {status === 'success' && <span className="text-[#00FFB3]">LINK_ESTABLISHED</span>}
                  {status === 'error' && <span className="text-red-500">TRANSMISSION_FAILED</span>}
                </span>
              </button>
              
            </form>
          </motion.div>
        </div>

        {/* Console Log readout */}
        <div className="mt-8 text-center h-8 font-mono text-xs">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-[#00FFB3]"
              >
                [SYSTEM]: Data successfully transmitted to anurag312006yadav@gmail.com
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-red-500"
              >
                [ERR_0x9]: {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
