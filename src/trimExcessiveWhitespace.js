export default function trimExcessiveWhitespace(str) {
  if (typeof str !== 'string') {
    return str
  }

  return str.replace(/\s+/g, ' ').trim()
}
