import { NAV_LINKS } from "@/constants/navigation";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-edge bg-panel transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 text-lg shadow-lg shadow-sky-500/20">
            ✨
          </span>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-white">
              AI Life Assistant
            </h1>
            <p className="text-xs text-slate-500">Stay organized</p>
          </div>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-3">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Menu
          </p>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-panel-light hover:text-white"
            >
              <span className="text-base transition-transform duration-200 group-hover:scale-110">
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto px-6 py-6">
          <div className="rounded-xl border border-edge bg-panel-light p-4">
            <p className="text-xs font-medium text-slate-300">💡 Tip</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Ask the AI assistant to plan your day or break big goals into
              tasks.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
