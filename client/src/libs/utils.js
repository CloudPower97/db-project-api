export const scrollTo = (element = null, offset = 0, behavior = 'smooth') => {
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

export const capitalizeString = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`
