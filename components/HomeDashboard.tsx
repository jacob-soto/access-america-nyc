
import React from 'react';
import { Activity, Shield, Zap, Globe, Cpu, Database, TrendingUp, AlertCircle } from 'lucide-react';
import { DATA_ASSETS, CRITICAL_INFRASTRUCTURE, ACTIVE_PORTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const HomeDashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Sovereign Liquidity" 
          value="$8.99B" 
          change="+12.5%" 
          icon={TrendingUp} 
          color="text-emerald-400" 
        />
        <StatCard 
          title="Active Nodes" 
          value="1,245" 
          change="Stable" 
          icon={Globe} 
          color="text-blue-400" 
        />
        <StatCard 
          title="Security Score" 
          value="98.2" 
          change="+0.4" 
          icon={Shield} 
          color="text-purple-400" 
        />
        <StatCard 
          title="System Load" 
          value="12%" 
          change="-2.1%" 
          icon={Cpu} 
          color="text-amber-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity size={20} className="text-emerald-400" />
              Asset Growth Stream
            </h3>
            <div className="flex gap-2">
              {['1H', '1D', '1W', '1M'].map(t => (
                <button key={t} className="px-3 py-1 text-[10px] font-bold bg-white/5 hover:bg-white/10 rounded-lg transition-colors">{t}</button>
              ))}
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA_ASSETS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ fill: '#10b981', r: 4 }} 
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#0a0a0a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Infrastructure Status */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Database size={20} className="text-blue-400" />
            Critical Infrastructure
          </h3>
          <div className="space-y-4">
            {CRITICAL_INFRASTRUCTURE.map(node => (
              <div key={node.id} className="p-4 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${node.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{node.id}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{node.provider} • {node.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-white/60">{node.uplink}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Active Ports</h3>
          <div className="space-y-4">
            {ACTIVE_PORTS.slice(0, 3).map(port => (
              <div key={port.port} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                    <Zap size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{port.service}</p>
                    <p className="text-[10px] text-white/40">Port {port.port}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                  {port.bypassStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">System Alerts</h3>
          <div className="space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3">
              <AlertCircle size={18} className="text-amber-400 shrink-0" />
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Unusual traffic detected on Node-GCP-01. AI Audit recommended.
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3">
              <Zap size={18} className="text-blue-400 shrink-0" />
              <p className="text-xs text-blue-200/70 leading-relaxed">
                Quantum Link stabilized. Latency reduced to 12ms.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Shield size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-black font-bold text-xl mb-2">Sovereign Protection</h3>
            <p className="text-black/60 text-sm leading-relaxed">
              Your assets are secured by Aegis-V6.5 and Protocol Fidelis Mortem.
            </p>
          </div>
          <button className="mt-6 w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-black/80 transition-colors relative z-10">
            View Security Logs
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 bg-white/5 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 ${change.startsWith('+') ? 'text-emerald-400' : 'text-white/40'}`}>
        {change}
      </span>
    </div>
    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{title}</h4>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </div>
);
