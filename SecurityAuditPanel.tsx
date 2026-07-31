import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  FileText, 
  RefreshCw, 
  Filter, 
  Award, 
  UserCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SecurityAuditItem, AuditStatus, SeverityLevel } from '../types/project';

interface SecurityAuditPanelProps {
  auditItems: SecurityAuditItem[];
  clientName: string;
  onUpdateStatus: (id: string, status: AuditStatus) => void;
  onRunAuditScan: () => void;
  isScanning: boolean;
}

export const SecurityAuditPanel: React.FC<SecurityAuditPanelProps> = ({
  auditItems,
  clientName,
  onUpdateStatus,
  onRunAuditScan,
  isScanning,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SecurityAuditItem['category'] | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | 'all'>('all');

  const categories: { id: SecurityAuditItem['category'] | 'all'; label: string }[] = [
    { id: 'all', label: 'All Security Categories' },
    { id: 'OWASP-Top-10', label: 'OWASP Top 10 Mitigations' },
    { id: 'Client-Confidentiality', label: 'Client NDA & Meet Compliance' },
    { id: 'Data-Privacy-GDPR', label: 'GDPR / HIPAA Data Privacy' },
  ];

  const filteredItems = auditItems.filter((item) => {
    const catMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const sevMatch = selectedSeverity === 'all' || item.severity === selectedSeverity;
    return catMatch && sevMatch;
  });

  const passedCount = auditItems.filter((i) => i.status === 'pass').length;
  const warningCount = auditItems.filter((i) => i.status === 'warning').length;
  const failCount = auditItems.filter((i) => i.status === 'fail').length;
  const totalCount = auditItems.length || 1;
  const complianceScore = Math.round((passedCount / totalCount) * 100);

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
            Critical Severity
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/20 text-orange-300 border border-orange-500/40">
            High Severity
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Medium Severity
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
            Low Severity
          </span>
        );
    }
  };

  const getStatusBadge = (status: AuditStatus) => {
    switch (status) {
      case 'pass':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Audit PASS
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Warning / Remediation
          </span>
        );
      case 'fail':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            FAIL
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            N/A
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Score */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                NDA & SOC2 Compliance
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {clientName} Security & Confidentiality Audit
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Strict client confidentiality verification, OWASP Top 10 web application security mitigations, and GDPR / HIPAA data privacy checks.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
              <div>
                <div className="text-xs text-slate-400">Security Score</div>
                <div className="text-2xl font-bold text-emerald-400">{complianceScore}%</div>
              </div>
              <div className="h-10 w-px bg-slate-700" />
              <div className="text-xs space-y-0.5">
                <div className="text-emerald-400 font-semibold">{passedCount} Passed</div>
                <div className="text-amber-400">{warningCount} Warnings</div>
                <div className="text-rose-400">{failCount} Failed</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onRunAuditScan}
              disabled={isScanning}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-4 py-3 rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Running Suite...' : 'Run Audit Suite'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as SeverityLevel | 'all')}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical Severity</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="low">Low Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  {item.category}
                </span>
                {getSeverityBadge(item.severity)}
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(item.status)}
                <select
                  value={item.status}
                  onChange={(e) => onUpdateStatus(item.id, e.target.value as AuditStatus)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
                >
                  <option value="pass">Audit PASS</option>
                  <option value="warning">Warning / Remediation</option>
                  <option value="fail">Audit FAIL</option>
                  <option value="not-applicable">Not Applicable</option>
                </select>
              </div>
            </div>

            <h4 className="text-base font-bold text-white">{item.title}</h4>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">{item.description}</p>

            {/* Mitigation Box */}
            <div className="mt-4 bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Mitigation & Technical Evidence</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.mitigationNotes}</p>
            </div>

            {/* Auditor signature */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                Audited By: <strong className="text-slate-200">{item.lastAuditedBy}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Last Audit: {item.lastAuditedDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
