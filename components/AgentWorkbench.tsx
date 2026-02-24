
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Cpu, Zap, Shield, Globe, Database, Activity, Search, ChevronRight, Command, Code } from 'lucide-react';
import { ADVANCED_SCRIPTS, AUTOMATION_SUGGESTIONS } from '../constants';

export const AgentWorkbench: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<{ type: 'cmd' | 'sys' | 'err', msg: string }[]>([
    { type: 'sys', msg: 'Sovereign Agent Workbench v6.5 initialized.' },
    { type: 'sys', msg: 'ZHOST Kernel Sync: 100% Complete.' },
    { type: 'sys', msg: 'Awaiting executive command...' },
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLogs = [...logs, { type: 'cmd' as const, msg: input }];
    setLogs(newLogs);
    setInput('');

    // Simulate response
    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'sys' as const, msg: `Executing: ${input}...` }]);
      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'sys' as const, msg: `Command processed. No anomalies detected.` }]);
      }, 1000);
    }, 500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col gap-8">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Terminal size={28} className="text-emerald-400" />
            Agent Workbench
          </h2>
          <p className="text-white/50 mt-1">Direct kernel access and autonomous script execution.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
            New Session
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* Terminal Area */}
        <div className="lg:col-span-2 flex flex-col bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
            </div>
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">zhost@sovereign:~</span>
            <div className="w-12"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-2 scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 ${log.type === 'cmd' ? 'text-white' : log.type === 'err' ? 'text-red-400' : 'text-emerald-400/70'}`}>
                <span className="shrink-0 opacity-30">{log.type === 'cmd' ? '>' : '#'}</span>
                <p className="leading-relaxed">{log.msg}</p>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          <form onSubmit={handleCommand} className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-4">
            <div className="flex-1 relative">
              <Command className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command or script path..."
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm"
              />
            </div>
            <button type="submit" className="p-3 bg-emerald-500 hover:bg-emerald-600 text-black rounded-xl transition-all">
              <Send size={20} />
            </button>
          </form>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6 overflow-y-auto scrollbar-hide">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Code size={14} className="text-emerald-400" />
              Advanced Scripts
            </h3>
            <div className="space-y-2">
              {ADVANCED_SCRIPTS.map(script => (
                <button key={script.name} className="w-full p-3 bg-black/40 border border-white/5 rounded-xl text-left hover:border-emerald-500/30 transition-all group">
                  <p className="text-sm font-mono text-white group-hover:text-emerald-400 transition-colors">{script.name}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-tighter mt-1">{script.role}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-amber-400" />
              Automation Suggestions
            </h3>
            <div className="space-y-3">
              {AUTOMATION_SUGGESTIONS.map(suggestion => (
                <div key={suggestion.title} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-sm font-bold text-white mb-1">{suggestion.title}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{suggestion.description}</p>
                  <button className="mt-3 text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                    Execute <ChevronRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
