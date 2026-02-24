
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, Upload, FileText, Activity, Zap, Lock, Globe, Database } from 'lucide-react';
import { CLOUD_RESOURCES } from '../constants';
import { analyzeCloudData, analyzeCloudImage } from '../services';

export const AIAuditPanel: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<string | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState(CLOUD_RESOURCES[0]);
  const [securityScore, setSecurityScore] = useState(85);

  const runDeepAudit = async () => {
    setIsAuditing(true);
    try {
      const report = await analyzeCloudData(selectedResource);
      setAuditReport(report);
      // Simulate score change
      setSecurityScore(prev => Math.min(100, prev + 5));
    } catch (error) {
      console.error("Audit failed:", error);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result?.toString().split(',')[1];
      if (base64) {
        setImageAnalysis("Analyzing image...");
        try {
          const result = await analyzeCloudImage(base64, "Identify security vulnerabilities or misconfigurations in this cloud console screenshot.");
          setImageAnalysis(result);
        } catch (error) {
          console.error("Image analysis failed:", error);
          setImageAnalysis("Analysis failed.");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">AI Compliance & Audit</h2>
          <p className="text-white/50 mt-1">Multi-modal intelligence for cloud infrastructure security.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Security Score</p>
              <p className="text-xl font-black text-emerald-400">{securityScore}%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Shield size={20} className="text-emerald-400" />
            </div>
          </div>
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Real-time Monitoring</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resource Selection & Audit Trigger */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
              <Database size={16} className="text-emerald-400" />
              Target Resource
            </h3>
            <select 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              value={selectedResource.id}
              onChange={(e) => setSelectedResource(CLOUD_RESOURCES.find(r => r.id === e.target.value) || CLOUD_RESOURCES[0])}
            >
              {CLOUD_RESOURCES.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
              ))}
            </select>
            <button 
              onClick={runDeepAudit}
              disabled={isAuditing}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              {isAuditing ? (
                <Activity size={20} className="animate-spin" />
              ) : (
                <Zap size={20} className="group-hover:scale-110 transition-transform" />
              )}
              {isAuditing ? 'Auditing...' : 'Run Deep Audit'}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
              <Upload size={16} className="text-emerald-400" />
              Visual Analysis
            </h3>
            <p className="text-xs text-white/40">Upload screenshots of cloud consoles or network diagrams for AI visual inspection.</p>
            <label className="block">
              <span className="sr-only">Choose screenshot</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Audit Results */}
        <div className="lg:col-span-2 space-y-8">
          {auditReport && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-emerald-400" />
                  <h3 className="font-medium text-white">Audit Report: {selectedResource.name}</h3>
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Generated by Gemini 3.1 Pro</span>
              </div>
              <div className="p-6 prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-sm text-white/80 leading-relaxed">
                  {auditReport}
                </div>
              </div>
            </div>
          )}

          {imageAnalysis && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-emerald-400" />
                  <h3 className="font-medium text-white">Visual Security Analysis</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="whitespace-pre-wrap text-sm text-white/80 leading-relaxed bg-black/30 rounded-xl p-4 border border-white/5">
                  {imageAnalysis}
                </div>
              </div>
            </div>
          )}

          {!auditReport && !imageAnalysis && (
            <div className="h-64 flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/5 rounded-2xl">
              <Shield size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">No active audit data. Select a resource or upload an image to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Eye = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
