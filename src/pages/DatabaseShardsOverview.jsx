import { useState } from 'react';
import { 
  Database, 
  Server, 
  HardDrive, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Layers,
  RefreshCw
} from 'lucide-react';
import { HOSTINGER_SHARDED_DB_CONFIG } from '../config/shardedDbConfig';

export default function DatabaseShardsOverview() {
  const [activeShard, setActiveShard] = useState('db_core_auth');
  const [filter, setFilter] = useState('all');

  const dbList = Object.entries(HOSTINGER_SHARDED_DB_CONFIG.databases).map(([key, item]) => ({
    key,
    ...item
  }));

  const totalQuotaMb = HOSTINGER_SHARDED_DB_CONFIG.totalDatabases * HOSTINGER_SHARDED_DB_CONFIG.databaseQuotaMb;
  const totalUsedMb = dbList.reduce((acc, db) => acc + db.estimatedSizeMb, 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mb-3 border border-emerald-500/30">
              <Server className="w-3.5 h-3.5" />
              <span>Hostinger Shared Hosting Topology</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              10x Sharded MySQL Database Architecture
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              To overcome Hostinger's strict 3 GB per MySQL database limit, NinetyPTE shards data across 10 specialized databases. Each database stays well below the 3072 MB limit while providing massive horizontal scale.
            </p>
          </div>

          {/* Aggregate Quota Meter */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 min-w-[260px]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Total Cluster Quota:</span>
              <span className="font-bold text-white">30.0 GB (10x 3GB)</span>
            </div>
            <div className="text-2xl font-black text-emerald-400">
              {(totalUsedMb / 1024).toFixed(1)} GB / {(totalQuotaMb / 1024).toFixed(0)} GB
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all" 
                style={{ width: `${(totalUsedMb / totalQuotaMb) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Average shard utilization: {((totalUsedMb / totalQuotaMb) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Shard Architecture Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Database Shards Directory (10/10 Online)</h2>
            <p className="text-xs text-slate-500">Live operational status and table distribution per Hostinger database</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> All Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dbList.map((db) => {
            const usagePercent = ((db.estimatedSizeMb / 3072) * 100).toFixed(0);
            return (
              <div 
                key={db.key}
                onClick={() => setActiveShard(db.key)}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition cursor-pointer flex flex-col justify-between ${
                  activeShard === db.key 
                    ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md' 
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-xs font-bold">
                      Shard #{db.dbId}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      MySQL InnoDB
                    </span>
                  </div>

                  <h3 className="font-mono font-bold text-slate-900 text-sm mb-1 truncate" title={db.name}>
                    {db.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {db.purpose}
                  </p>

                  {/* Usage Meter */}
                  <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Storage Used:</span>
                      <span className="text-slate-800 font-mono font-bold">
                        {db.estimatedSizeMb} MB / 3072 MB
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          usagePercent > 80 ? 'bg-rose-500' :
                          usagePercent > 60 ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Limit: 3.0 GB</span>
                      <span className="font-bold text-slate-600">{usagePercent}% used</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Tables ({db.tables.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {db.tables.map((tbl, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {tbl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Routing Architecture Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 mb-2">
          How Dynamic Query Routing Works in Hostinger
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          When the client (React.js) requests questions, evaluations, or records user attempts, the API router in PHP/Node.js automatically inspects the domain context and routes the query to the correct Hostinger MySQL instance without cross-database bottleneck:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-indigo-600 font-bold block mb-1">1. User Auth / Billing</span>
            <p className="text-slate-600 font-normal">Directs to <code className="font-mono text-indigo-700">db_core_auth</code>. Holds user sessions and subscription tiers.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-amber-700 font-bold block mb-1">2. Question Banks</span>
            <p className="text-slate-600 font-normal">Sharded by section (<code className="font-mono text-amber-800">qb_speaking</code>, <code className="font-mono text-amber-800">qb_writing</code>, etc.) for zero contention.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-emerald-700 font-bold block mb-1">3. User Practice Attempts</span>
            <p className="text-slate-600 font-normal">Range-sharded by User ID (<code className="font-mono text-emerald-800">attempts_1</code> for 1-50K, <code className="font-mono text-emerald-800">attempts_2</code> for 50K+).</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100">
            <span className="text-purple-700 font-bold block mb-1">4. Community & Tools</span>
            <p className="text-slate-600 font-normal">Discussions and heavy audio metadata isolated in dedicated shards under 3GB.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
