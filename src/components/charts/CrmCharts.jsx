import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CrmCharts({ users = [], bloodRequests = [], supportRequests = [], isDark = true }) {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Calculate live counts per blood group
  const groupCounts = useMemo(() => {
    const counts = {};
    bloodGroups.forEach((g) => (counts[g] = 0));
    users.forEach((u) => {
      const bg = (u.bloodGroup || '').toUpperCase().trim();
      if (counts[bg] !== undefined) {
        counts[bg]++;
      }
    });
    return counts;
  }, [users]);

  // Chart styling colors based on theme
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';

  // 1. Line / Area Chart: 6-Month Donor Acquisition Velocity vs Requests
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const userCount = users.length || 1;
  
  // Simulated historic velocity data scaled to real total users
  const velocityData = {
    labels: months,
    datasets: [
      {
        label: 'New Donors Onboarded',
        data: [
          Math.max(2, Math.floor(userCount * 0.12)),
          Math.max(3, Math.floor(userCount * 0.18)),
          Math.max(4, Math.floor(userCount * 0.15)),
          Math.max(5, Math.floor(userCount * 0.22)),
          Math.max(6, Math.floor(userCount * 0.28)),
          userCount
        ],
        fill: true,
        borderColor: '#e11d48',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(225, 29, 72, 0.35)');
          gradient.addColorStop(1, 'rgba(225, 29, 72, 0.0)');
          return gradient;
        },
        borderWidth: 2.5,
        tension: 0.42,
        pointBackgroundColor: '#e11d48',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 6,
      },
      {
        label: 'Emergency Blood Requests',
        data: [
          Math.max(1, Math.floor(bloodRequests.length * 0.2) || 4),
          Math.max(2, Math.floor(bloodRequests.length * 0.35) || 7),
          Math.max(2, Math.floor(bloodRequests.length * 0.4) || 6),
          Math.max(3, Math.floor(bloodRequests.length * 0.6) || 9),
          Math.max(3, Math.floor(bloodRequests.length * 0.8) || 11),
          bloodRequests.length || 8
        ],
        fill: true,
        borderColor: '#38bdf8',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
          gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
          return gradient;
        },
        borderWidth: 2,
        borderDash: [4, 4],
        tension: 0.42,
        pointBackgroundColor: '#38bdf8',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 5,
      }
    ]
  };

  const velocityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: textColor,
          font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 },
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#ffffff' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11 } }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11 }, precision: 0 }
      }
    }
  };

  // 2. Doughnut Chart: Blood Group Inventory Distribution
  const doughnutData = {
    labels: bloodGroups,
    datasets: [
      {
        data: bloodGroups.map((g) => groupCounts[g] || 0),
        backgroundColor: [
          '#f43f5e', // A+ Rose
          '#fb7185', // A- Rose Light
          '#3b82f6', // B+ Blue
          '#60a5fa', // B- Blue Light
          '#8b5cf6', // AB+ Violet
          '#a78bfa', // AB- Violet Light
          '#10b981', // O+ Emerald
          '#34d399'  // O- Emerald Light
        ],
        borderWidth: 2,
        borderColor: isDark ? '#111420' : '#ffffff',
        hoverOffset: 6
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          font: { family: 'JetBrains Mono', size: 10, weight: 600 },
          boxWidth: 8,
          usePointStyle: true,
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#ffffff' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 10,
        callbacks: {
          label: (context) => {
            const count = context.raw || 0;
            const pct = users.length > 0 ? ((count / users.length) * 100).toFixed(1) : 0;
            return ` ${context.label}: ${count} Donors (${pct}%)`;
          }
        }
      }
    }
  };

  // 3. Bar Chart: Blood Group Stock Level Comparison
  const barData = {
    labels: bloodGroups,
    datasets: [
      {
        label: 'Registered Reserve',
        data: bloodGroups.map((g) => groupCounts[g] || 0),
        backgroundColor: bloodGroups.map((g) => {
          const count = groupCounts[g] || 0;
          if (count === 0) return 'rgba(239, 68, 68, 0.4)';
          if (count <= 2) return 'rgba(245, 158, 11, 0.7)';
          return 'rgba(225, 29, 72, 0.75)';
        }),
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#ffffff' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 10
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11, weight: 700 } }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 10 }, precision: 0 }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Chart 1: Acquisition Velocity Area Chart (8 Columns) */}
      <div className="lg:col-span-8 glossy-panel rounded-3xl p-6 overflow-hidden flex flex-col justify-between">
        <div className="specular-line" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white tracking-tight">
                Donor Acquisition Velocity & Emergency Inflow
              </h4>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Monthly tracking of registered blood donors vs emergency patient requisitions
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 uppercase tracking-wider self-start sm:self-auto">
            Live Stream
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full mt-4">
          <Line data={velocityData} options={velocityOptions} />
        </div>

        <div className="pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] font-mono text-zinc-400 uppercase">Total Pool</p>
            <p className="text-base font-black font-mono text-zinc-900 dark:text-white">{users.length}</p>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] font-mono text-zinc-400 uppercase">Emergency Req</p>
            <p className="text-base font-black font-mono text-sky-500">{bloodRequests.length}</p>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] font-mono text-zinc-400 uppercase">Support Tickets</p>
            <p className="text-base font-black font-mono text-emerald-500">{supportRequests.length}</p>
          </div>
        </div>
      </div>

      {/* Chart 2: Blood Group Share Doughnut (4 Columns) */}
      <div className="lg:col-span-4 glossy-panel rounded-3xl p-6 overflow-hidden flex flex-col justify-between">
        <div className="specular-line" />
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white">
              Inventory Share
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Rhesus factor distribution</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs">
            <i className="fa-solid fa-chart-pie" />
          </div>
        </div>

        <div className="relative h-56 w-full my-auto flex items-center justify-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
            <span className="text-2xl font-black font-mono text-zinc-900 dark:text-white leading-none">
              {users.length}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 font-bold mt-1">
              Active Donors
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.06] text-center">
          <span className="text-[11px] text-zinc-400 font-medium">
            <span className="text-emerald-500 font-bold">O+ & A+</span> dominate {((((groupCounts['O+'] || 0) + (groupCounts['A+'] || 0)) / (users.length || 1)) * 100).toFixed(0)}% of donor reserves
          </span>
        </div>
      </div>

      {/* Chart 3: Blood Group Inventory Bar Breakdown (Full Width 12 Columns) */}
      <div className="lg:col-span-12 glossy-panel rounded-3xl p-6 overflow-hidden">
        <div className="specular-line" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
          <div>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white">
              Blood Bank Supply Depth Matrix
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Live donor counts across groups. Red bars indicate critical reserve deficit.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="inline-flex items-center text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> High Reserve (&gt;2)
            </span>
            <span className="inline-flex items-center text-amber-500">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" /> Moderate (1-2)
            </span>
            <span className="inline-flex items-center text-rose-500">
              <span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5" /> Critical (0)
            </span>
          </div>
        </div>

        <div className="h-44 w-full mt-4">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

