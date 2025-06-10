import { useState, useEffect } from "react";
import { Moon, Sun, MoreVertical } from "lucide-react";

const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
};

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
    setIsDark((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* 왼쪽 - 로고 */}
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Logo
      </div>

      {/* 오른쪽 - 메뉴들 */}
      <div className="flex items-center gap-4">
        {/* 3dot 아이콘 */}
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <MoreVertical size={20} />
        </button>

        {/* 로그인 버튼 */}
        <button className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm">
          로그인
        </button>

        {/* 다크모드 버튼 */}
        <button
          onClick={handleToggle}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
