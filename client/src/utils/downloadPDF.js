import $ from "jquery";

export const CreatePDFfromHTML = () => {
  var divContents = $("#printRules").html();
  var printWindow = window.open("", "", "height=400,width=800");
  printWindow.document.write("<html><head><title>Rules</title>");
  printWindow.document.write("</head><body >");
  printWindow.document.write(divContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
};
