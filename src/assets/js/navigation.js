const currentPage = location.pathname
const navItems = document.querySelectorAll('.nav__item')

for (item of navItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}