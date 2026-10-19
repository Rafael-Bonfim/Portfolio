// Card whose border/background lights up under the cursor (see .spotlight in App.css).
export default function Spotlight({ as = "div", className = "", children, ...props }) {
  const Tag = as;
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onMouseMove={handleMove} className={`spotlight ${className}`} {...props}>
      {children}
    </Tag>
  );
}
