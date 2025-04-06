document.addEventListener('DOMContentLoaded', function () {
  const sectionMenu = document.getElementById('sectionMenu');
  let previousSection = "#top"; // default value

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
  }

  // Handle menu change
  sectionMenu.addEventListener('change', function () {
    const value = this.value;

    if (value === "toggle-theme") {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      // 👇 Reset dropdown to previous value (visually)
      this.value = previousSection;
    } else if (value) {
      // Save new valid section as previous
      previousSection = value;
      window.location.hash = value;
    }
  });
});
