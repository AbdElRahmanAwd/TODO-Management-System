export function setPrimeTheme(theme: string) {
  const themeLink = document.getElementById(
    "primereact-theme",
  ) as HTMLLinkElement | null;

  if (themeLink) {
    themeLink.href = `/themes/${theme}/theme.css`;
  }
}
