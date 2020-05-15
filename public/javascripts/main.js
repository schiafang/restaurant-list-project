const pathname = window.location.pathname

if (pathname === '/search') {
  window.addEventListener('load', () => {
    const cardColumns = document.querySelector('.card-columns')
    cardColumns.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/search') {
  window.addEventListener('load', () => {
    const notFound = document.querySelector('.notfound')
    notFound.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname === '/restaurants/create') {
  window.addEventListener('load', () => {
    const createForm = document.querySelector('.create-form')
    createForm.scrollIntoView({ behavior: 'smooth' })
  })
}

function deleteConfirm () {
  return window.confirm('確定要刪除嗎？')
}