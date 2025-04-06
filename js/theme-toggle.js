document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('darkModeToggle');

  // Apply saved theme (if any), otherwise assume dark mode default
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    toggleButton.textContent = 'Dark Mode';
  } else {
    document.body.classList.add('dark-mode'); // Keep or set dark mode
    toggleButton.textContent = 'Light Mode';
  }

  // Toggle theme on button click
  toggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  });
});
