import { Button } from "primereact/button";
import { toggleTheme, selectThemeMode } from "../../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { setPrimeTheme } from "../../utils/primeTheme";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);

  useEffect(() => {
    const href = mode === "dark" ? "lara-dark-blue" : "lara-light-blue";
    setPrimeTheme(href);
  }, [mode]);

  return (
    <Button
      icon={mode === "dark" ? "pi pi-sun" : "pi pi-moon"}
      text
      size="small"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    />
  );
}
