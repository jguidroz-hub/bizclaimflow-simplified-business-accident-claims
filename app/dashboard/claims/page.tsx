'use client';
import { useState } from 'react';
import Link from 'next/link';

type Claim = { id: string; type: string; date: string; location: string; status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'denied'; amount: number; insurer: string; progress: number; };

const DEMO: Claim[] = [
  { id: 'BC-2024-001', type: 'Slip & Fall', date: '2026-02-10', location: 'Warehouse B - Loading Dock', status: 'under-review', amount: 12500, insurer: 'Hartford', progress: 60 },
  { id: 'BC-2024-002', type: 'Vehicle Accident', date: '2026-02-05', location: 'Delivery Route - Hwy 101', status: 'submitted', amount: 34200, insurer: 'Progressive Commercial', progress: 35 },
  { id: 'BC-2024-003', type: 'Equipment Damage', date: '2026-01-28', location: 'Manufacturing Floor', status: 'approved', amount: 8750, insurer: 'Hartford', progress: 100 },
  { id: 'BC-2024-004', type: 'Workers Comp', date: '2026-01-15', location: 'Office - 3rd Floor', status: 'approved', amount: 15300, insurer: 'State Fund', progress: 100 },
  { id: 'BC-2024-005', type: 'Property Damage', date: '2026-02-12', location: 'Storefront - Water damage', status: 'draft', amount: 22000, insurer: 'Nationwide', progress: 15 },
];

const statusColors: Record<string,string> = { draft:'bg-gray-100 text-gray-700', submitted:'bg-blue-100 text-blue-700', 'under-review':'bg-yellow-100 text-yellow-700', approved:'bg-green-100 text-green-700', denied:'bg-red-100 text-red-700' };

export default function ClaimsPage() {
  const [showNew, setShowNew] = useState(false);
  const totalPending = DEMO.filter(c=>!['approved','denied'].includes(c.status)).reduce((s,c)=>s+c.amount,0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="font-bold text-lg">📋 Claims Manager</h1>
        </div>
        <button onClick={()=>setShowNew(!showNew)} className="px-4 py-2 bg-black text-white text-sm rounded-lg">+ New Claim</button>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-gray-400 uppercase">Active Claims</p><p className="text-2xl font-bold">{DEMO.filter(c=>!['approved','denied'].includes(c.status)).length}</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-gray-400 uppercase">Pending Amount</p><p className="text-2xl font-bold">${(totalPending/1000).toFixed(1)}K</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-green-500 uppercase">Approved</p><p className="text-2xl font-bold text-green-600">${((DEMO.filter(c=>c.status==='approved').reduce((s,c)=>s+c.amount,0))/1000).toFixed(1)}K</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="text-xs text-gray-400 uppercase">Avg Resolution</p><p className="text-2xl font-bold">12 days</p></div>
        </div>
        <div className="space-y-3">
          {DEMO.map(claim=>(
            <div key={claim.id} className="bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400">{claim.id}</span>
                    <h3 className="font-semibold">{claim.type}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[claim.status]}`}>{claim.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">📍 {claim.location} · 📅 {claim.date} · 🏢 {claim.insurer}</p>
                </div>
                <p className="text-lg font-bold">${claim.amount.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="bg-blue-500 rounded-full h-2 transition-all" style={{width:claim.progress+'%'}} /></div>
                <span className="text-xs text-gray-500">{claim.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
