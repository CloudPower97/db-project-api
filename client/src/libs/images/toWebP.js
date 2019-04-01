const glob = require('glob')
const sharp = require('sharp')

glob(process.argv[2] || 'src/assets/img/**/*.{jpg,jpeg,png}', {}, (err, img) => {
  img.forEach(img => {
    const path = img
      .split('/')
      .slice(0, -1)
      .join('/')
    const fileName = img
      .split('/')
      .pop()
      .split('.')[0]

    sharp(img)
      .webp()
      .toFile(`${path}/${fileName}.webp`)
  })
})
