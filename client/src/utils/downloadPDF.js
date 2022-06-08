import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import $ from "jquery";

// export const CreatePDFfromHTML = () => {
//     var HTML_Width = $("#rules").width();
//     var HTML_Height = $("#rules").height();
//     var top_left_margin = 15;
//     var PDF_Width = HTML_Width + (top_left_margin * 2);
//     var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
//     var canvas_image_width = HTML_Width;
//     var canvas_image_height = HTML_Height;

//     var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

//     html2canvas($("#rules")[0]).then(function (canvas) {
//         var imgData = canvas.toDataURL("image/jpeg", 1.0);
//         var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
//         pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
//         for (var i = 1; i <= totalPDFPages; i++) { 
//             pdf.addPage(PDF_Width, PDF_Height);
//             pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
//         }
//         pdf.save("Rules.pdf");
//         $("#rules").hide();
//     });
// }

export const CreatePDFfromHTML = () => {
        var divContents = $("#printRules").html();
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Rules</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
}