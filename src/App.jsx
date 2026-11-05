import { useState } from 'react'
import { Sparkles, CheckCircle2, Rocket, Code2, RefreshCw } from 'lucide-react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col">
      {/* Navbar */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-900 shadow-lg shadow-teal-500/20">
              SV
            </div>
            <span className="font-bold text-lg tracking-wider text-slate-100">
              SHIVANANDI-VISTA
            </span>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Vite + React + Tailwind
          </span>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Project initialized successfully
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Welcome to SHIVANANDI-VISTA
        </h1>

        <p className="max-w-2xl text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
          Your modern React application is up and running with lightning-fast Vite build tooling and Tailwind CSS styling ready for development.
        </p>

        {/* Counter Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm max-w-md w-full shadow-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
            Interactive Test Component
          </p>
          <div className="text-5xl font-extrabold text-teal-400 mb-6">
            {count}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold transition flex items-center gap-2 shadow-lg shadow-teal-500/25 active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              Increment Count
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-medium transition flex items-center gap-2 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-1">Vite Dev Server</h3>
            <p className="text-sm text-slate-400">Instant server start with lightning fast Hot Module Replacement (HMR).</p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-1">Tailwind CSS</h3>
            <p className="text-sm text-slate-400">Utility-first CSS framework configured with PostCSS and Autoprefixer.</p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-1">React 18 & Lucide</h3>
            <p className="text-sm text-slate-400">Modern component ecosystem with Lucide icons pre-configured.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        SHIVANANDI-VISTA &bull; Edit <code className="text-slate-300 bg-white/5 px-2 py-0.5 rounded">src/App.jsx</code> to start building
      </footer>
    </div>
  )
}

