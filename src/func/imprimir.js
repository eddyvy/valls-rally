export function print(elementId) {
  const element = document.getElementById(elementId)
  console.log(element)
  html2pdf(element)
}
