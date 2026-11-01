import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

export function downloadDonorsPDF(allUsers) {
  if (!allUsers || allUsers.length === 0) {
    throw new Error("No donor data available to export!");
  }

  const doc = new jsPDF('p', 'mm', 'a4');

  // Header Banner
  doc.setFillColor(153, 27, 27);
  doc.rect(0, 0, 210, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text("RSSS BLOOD DONATION - OFFICIAL DONOR DIRECTORY", 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text("Rongdhonu Samajik Seba Songothon | Registered Donors List", 14, 19);

  doc.setFontSize(8);
  doc.text("Generated: " + new Date().toLocaleString(), 135, 19);

  // Table Data
  const headers = [["#", "Donor Name", "Blood Group", "Phone Number", "Address / Location", "Status"]];
  const rows = allUsers.map((u, index) => [
    index + 1,
    u.name || "Unnamed",
    u.bloodGroup || "N/A",
    u.phone || "N/A",
    u.address || "N/A",
    u.isAvailable ? "AVAILABLE" : "BUSY"
  ]);

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 32,
    theme: 'grid',
    headStyles: {
      fillColor: [185, 28, 28],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [31, 41, 55]
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 42, fontStyle: 'bold' },
      2: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
      3: { cellWidth: 35 },
      4: { cellWidth: 55 },
      5: { cellWidth: 22, halign: 'center' }
    },
    alternateRowStyles: {
      fillColor: [254, 242, 242]
    }
  });

  doc.save("RSSS_Official_Donor_Directory.pdf");
}

export async function downloadCertificatePDF(certElement, rawName = 'Donor') {
  if (!certElement) {
    throw new Error("Certificate element not found!");
  }

  if (document.fonts) {
    await document.fonts.ready;
  }

  const canvas = await html2canvas(certElement, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    width: 1000,
    height: 700,
    windowWidth: 1280,
    windowHeight: 900
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  const safeName = rawName.replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`RSSS_Certificate_${safeName}.pdf`);
}

