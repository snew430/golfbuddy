const db = require("./connection");
const { Admin, Hotel, Course, Player, Tournament } = require("../models");

db.once("open", async () => {
  await Admin.deleteMany();
  await Hotel.deleteMany();
  await Course.deleteMany();
  await Player.deleteMany();
  await Tournament.deleteMany();

  const admin = await Admin.create({
    email: process.env.EMAIL,
    password: process.env.PASS,
  });

  const course1 = await Course.create({
    name: "Rum Pointe Seaside Golf Links",
    address: "7000 Rum Pointe Lane Berin, Maryland 21811",
    website: "https://rumpointe.com/",
  });
  const course2 = await Course.create({
    name: "GlenRiddle Golf Club - War Admiral",
    address: "11501 Maid at Arms Lane Berlin, Maryland 21811",
    website: "https://glenriddlegolf.com/",
  });

  const course3 = await Course.create({
    name: "GlenRiddle Golf Club - Man O' War",
    address: "11501 Maid at Arms Lane Berlin, Maryland 21811",
    website: "https://glenriddlegolf.com/",
  });

  const hotel1 = await Hotel.create({
    name: "The Grand Hotel",
    address: "2100 N. Baltimore Avenue, Ocean City, Md. 21842",
    website: "https://grandhoteloceancity.com/",
  });

  const player1 = await Player.create({
    firstName: "Sean",
    lastName: "New",
    email: "seanpnew@hotmail.com",
    phoneNumber: "4102156229",
    preferredRoomate: "John New",
    lodging: "Double",
  });

  const player2 = await Player.create({
    firstName: "Caroline",
    lastName: "Kyle",
    email: "carolinekyle21@gmail.com",
    phoneNumber: "4106589725",
    lodging: "Single",
  });

  const player3 = await Player.create({
    firstName: "Reid",
    lastName: "Schroder",
    email: "reidschroder2@gmail.com",
    phoneNumber: "4102158669",
    preferredRoomate: "Sean New",
    lodging: "Double",
  });

  const player4 = await Player.create({
    firstName: "John",
    lastName: "Torsino",
    email: "john@torsino.com",
    phoneNumber: "4101118669",
    lodging: "Golf Only",
  });

  const tournament = await Tournament.create({
    name: "Fall 2022 Trip",
    startDate: "10/16/2022",
    endDate: "10/19/2022",
    paymentDue: "07/01/2022",
    singlePrice: 150,
    doublePrice: 100,
    golfOnlyPrice: 50,
    courses: [course1, course2, course3],
    hotels: [hotel1],
    maxPlayers: 30,
    playersActive: [player1, player2, player3],
    playersWaitlist: [player4],
  });

  console.log("DATA SEEDED");
});
