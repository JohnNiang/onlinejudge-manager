const util = {}

util.getFilename = filename => {
  // get dot index
  const dtoIndex = filename.indexOf('.')
  return filename.split(dtoIndex, 1)
}

export default util
