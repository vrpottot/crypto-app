export function percentDifference(a, b) {
  return +(100 * ((b - a) / a)).toFixed(2)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}
