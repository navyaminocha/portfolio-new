'use client';

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-[#7f8cf8]/20 bg-[#060710]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#707cb8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b9c2ff]" />
          <span className="text-[#b9c2ff] font-semibold">NAVYA MINOCHA</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <p className="text-center sm:text-right">
          Designed with Cyberpunk CRT Phosphor Periwinkle HUD Aesthetic
        </p>
      </div>
    </footer>
  );
}
