const btn = document.getElementById('theme-toggle-btn');
const icon = document.getElementById('theme-icon');
const text = document.getElementById('theme-text');

btn.onclick = function() {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    
    icon.innerHTML = isLight ? '☀️' : '◐';
    text.innerHTML = isLight ? 'Light Mode' : 'Dark Mode';
    
    localStorage.setItem('themePreference', isLight ? 'light' : 'dark');
};

window.onload = function() {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        icon.innerHTML = '☀️';
        text.innerHTML = 'Light Mode';
    }
};cou