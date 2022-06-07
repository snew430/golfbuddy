import { saveAs } from 'file-saver';
  
export const exportCSVplayer = () => {
    let csv = [];
    const rows = document.querySelectorAll("table tr"); 
    for (const row of rows.values()) {
        const cells = row.querySelectorAll("td, th");
        const rowText = Array.from(cells).map(cell => cell.innerText);
        csv.push(rowText.join(',')); 
        console.log(csv)      
    }
    const csvFile = new Blob([csv.join('\n')], {type: "text/csv;charset=utf-8;"});
    saveAs(csvFile, "members.csv");
}

export const exportCSVwaitlist = () => {
    let csv = [];
    const rows = document.querySelectorAll("table tr"); 
    for (const row of rows.values()) {
        const cells = row.querySelectorAll("td, th");
        const rowText = Array.from(cells).map(cell => cell.innerText);
        csv.push(rowText.join(','));       
    }
    const start = 1;
    const delimiter = "Name";
    const csvFile = new Blob([csv.join('\n').split(delimiter).slice(start)], {type: "text/csv;charset=utf-8;"});
    saveAs(csvFile, "player_list.csv");
}

export const exportCSVmaster = () => {
    let csv = [];
    const rows = document.querySelectorAll("table tr"); 
    for (const row of rows.values()) {
        const cells = row.querySelectorAll("td, th");
        const rowText = Array.from(cells).map(cell => cell.innerText);
        csv.push(rowText.join(','));       
    }
    const csvFile = new Blob([csv.join('\n')], {type: "text/csv;charset=utf-8;"});
    saveAs(csvFile, "members.csv");
}