type HeaderProps = {
  onOpenSidebar: () => void;
};

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-edge bg-surface/80 px-4 py-4 backdrop-blur-md sm:px-8">
      <button
        onClick={onOpenSidebar}
        className="rounded-lg border border-edge bg-panel p-2 text-slate-300 transition-colors hover:bg-panel-light lg:hidden"
        aria-label="Open menu"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div>
        <h1 className="text-lg font-bold text-white sm:text-xl">
          Good day! 👋
        </h1>
        <p className="text-xs text-slate-500 sm:text-sm">
          Here's what's on your plate today.
        </p>
      </div>
    </header>
  );
}
