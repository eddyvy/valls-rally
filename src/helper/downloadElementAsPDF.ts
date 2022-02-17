import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const downloadElementAsPDF = async(element: HTMLElement, fileName: string = 'archivo'): Promise<void> => {
  const pdf = new jsPDF
  const canvas = await html2canvas(element)

  const data = canvas.toDataURL('image/png')
  const imgProperties = pdf.getImageProperties(data);

  const imgWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imgHeight = imgProperties.height * imgWidth / imgProperties.width

  pdf.addImage(data, 'PNG', 0, 0, imgWidth, imgHeight, 'report', 'MEDIUM')

  let remainingHeight = imgHeight - pageHeight
  let position = 0;
  while (remainingHeight > 0) {
    position -= pageHeight
    pdf.addPage()
    pdf.addImage(data, 'PNG', 0, position, imgWidth, imgHeight, 'report', 'MEDIUM')
    remainingHeight -= pageHeight
  }

  pdf.save(`${fileName}.pdf`)
  pdf.close()
}

export default downloadElementAsPDF;
