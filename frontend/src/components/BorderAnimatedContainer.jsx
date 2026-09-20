function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(45deg,#0a0a0a,theme(colors.zinc.900)_50%,#0a0a0a)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.zinc.700/.48)_80%,_theme(colors.zinc.400)_86%,_theme(colors.white)_90%,_theme(colors.zinc.400)_94%,_theme(colors.zinc.700/.48))_border-box] rounded-2xl border border-transparent animate-border flex overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;