const themeToggle = document.getElementById('theme-toggle')
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.checked = true
        document.body.style.transition = 'all'
        document.body.classList.add('dark-theme')
        setTimeout(() => document.body.style.transition = '', 0)
    }
})

themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
        document.body.classList.add('dark-theme')
        localStorage.setItem('theme', 'dark')
    } else {
        document.body.classList.remove('dark-theme')
        localStorage.removeItem('theme')
    }
})