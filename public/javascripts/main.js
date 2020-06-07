const pathname = window.location.pathname

if (pathname === '/restaurants/search') {
  window.addEventListener('load', () => {
    const card = document.querySelector('.card')
    card.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/restaurants/search') {
  window.addEventListener('load', () => {
    const notFound = document.querySelector('.notfound')
    notFound.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/restaurants/edit') {
  window.addEventListener('load', () => {
    const card = document.querySelector('.sort-box')
    card.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/restaurants/create') {
  window.addEventListener('load', () => {
    const createForm = document.querySelector('.create-form')
    createForm.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/users/login') {
  window.addEventListener('load', () => {
    const createForm = document.querySelector('.login-form')
    createForm.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/users/register') {
  window.addEventListener('load', () => {
    const createForm = document.querySelector('.login-form')
    createForm.scrollIntoView({ behavior: 'smooth' })
  })
}

function deleteConfirm () {
  return window.confirm('確定要刪除嗎？')
}

