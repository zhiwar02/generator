import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const printInvoice = (elementId) => {
  const element = document.getElementById(elementId); // The HTML element to capture

  // Use html2canvas to capture the HTML content as an image
  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); // Convert to image format
    const pdf = new jsPDF("p", "mm", "a4");

    // Set the PDF to the size of the element
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to the PDF document
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Save the PDF
    pdf.save("invoice.pdf");
  });
};

export const printAllInvoices = async (invoices) => {
  for (const invoice of invoices) {
    // Ensure each invoice element has a unique ID in the template
    const elementId = `invoice-${invoice.id}`; // Assuming you have an ID for each invoice's DOM element
    await printInvoice(elementId);
  }
};
