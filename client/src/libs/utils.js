const scrollTo = (element = null, offset = 0, behavior = 'smooth') => {
  if (element) {
    window.scrollTo({
      top: element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset,
      behavior: behavior,
    })
  } else {
    window.scrollTo({
      top: document.body.getBoundingClientRect().top - offset,
      behavior: behavior,
    })
  }
}

module.exports = {
  scrollTo,
}
