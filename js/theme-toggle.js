document.addEventListener('DOMContentLoaded', function () {
  const sectionMenu = document.getElementById('sectionMenu');
  let previousSection = "#top";

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
  }

  // ✅ Check if sectionMenu exists before attaching listener
  if (sectionMenu) {
    sectionMenu.addEventListener('change', function () {
      const value = this.value;

      if (value === "toggle-theme") {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.value = previousSection;
      } else if (value) {
        previousSection = value;
        window.location.hash = value;
      }
    });
  }
});
