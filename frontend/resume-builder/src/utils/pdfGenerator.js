import html2pdf from 'html2pdf.js';

export const generatePDF = async (elementId, fileName = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const options = {
    margin: 10,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  try {
    const pdf = await html2pdf().set(options).from(element).save();
    return pdf;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
}; 