import { saveAs } from "file-saver";

export const exportCSVwaitlist = () => {
  let csv = [];
  const rows = document.querySelectorAll(".tablewaitlist tr");
  for (const row of rows.values()) {
    const cells = row.querySelectorAll(".tdwaitlist, .thwaitlist");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }

  // let sortingArray = [];
  // let waitListArray = [];

  // sortingArray.push(csv.splice(1));

  // for (let i = 0; i < sortingArray.length; i++) {
  //   const elementArray = sortingArray[i];
  //   const setString = 'Name,Email,Phone,Lodging,Roommate';
  //   const indexOfSliceForWaitList = elementArray.indexOf(setString);
  //   waitListArray.push(elementArray.slice(indexOfSliceForWaitList));
  // }

  // const waitListedUsers = waitListArray.flat();

  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(csvFile, "waitlisted_players.csv");
};

export const exportCSVplayer = () => {
  let csv = [];
  const rows = document.querySelectorAll(".tableactive tr");
  for (const row of rows.values()) {
    const cells = row.querySelectorAll(".tdactive, .thactive");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(csvFile, "player_list.csv");
};

export const exportCSVmaster = () => {
  let csv = [];
  const rows = document.querySelectorAll("table tr");
  for (const row of rows.values()) {
    const cells = row.querySelectorAll("td, th");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(csvFile, "members.csv");
};
