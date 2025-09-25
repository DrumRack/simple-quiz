const checkbox = document.querySelector('input[type="checkbox"]')
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('theme') === 'dark') {
        checkbox.checked = true
        document.body.style.transition = 'all'
        document.body.classList.add('dark-theme')
        setTimeout(() => document.body.style.transition = '', 0)
    }
})

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        document.body.classList.add('dark-theme')
        localStorage.setItem('theme', 'dark')
    } else {
        document.body.classList.remove('dark-theme')
        localStorage.removeItem('theme')
    }
})