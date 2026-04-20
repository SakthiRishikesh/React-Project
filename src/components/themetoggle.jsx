function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle">
      <button
        className={theme === "light" ? "active" : ""}
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className={theme === "dark" ? "active" : ""}
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
    </div>
  );
}

export default ThemeToggle;