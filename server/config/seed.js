const db = require("./connection");
const { Admin, Hotel, Course, Player, Trip, Info } = require("../models");

db.once("open", async () => {
  await Admin.deleteMany();
  await Hotel.deleteMany();
  await Course.deleteMany();
  await Player.deleteMany();
  await Trip.deleteMany();
  await Info.deleteMany();

  const admin = await Admin.create({
    email: process.env.EMAIL,
    password: process.env.PASS,
  });

  const course1 = await Course.create({
    name: "Rum Pointe Seaside Golf Links",
    address: "7000 Rum Pointe Lane Berin, Maryland 21811",
    website: "https://rumpointe.com/",
    phoneNumber: "4106291414",
  });
  const course2 = await Course.create({
    name: "GlenRiddle Golf Club - War Admiral",
    address: "11501 Maid at Arms Lane Berlin, Maryland 21811",
    website: "https://glenriddlegolf.com/",
    phoneNumber: "4102132325",
  });

  const course3 = await Course.create({
    name: "GlenRiddle Golf Club - Man O' War",
    address: "11501 Maid at Arms Lane Berlin, Maryland 21811",
    website: "https://glenriddlegolf.com/",
    phoneNumber: "4102132325",
  });

  const hotel1 = await Hotel.create({
    name: "The Grand Hotel",
    address: "2100 N. Baltimore Avenue, Ocean City, Md. 21842",
    website: "https://grandhoteloceancity.com/",
    phoneNumber: "4102896191",
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

  const trip = await Trip.create({
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

  await Info.create({
    subject: "Senior Tees",
    body: "We are all using the tees that are 5800 yards and shorter.",
    place: 0,
  });

  await Info.create({
    subject: "Max Stroke on Any Hole is Par plus 3",
    body: "On a par 3, max is 6, par 4 max is 7, par 5 max is 8. Once you reach this score, please pick up and move to the next hole.",
    place: 1,
  });

  await Info.create({
    subject: "Balls Hit Out of Bounds, into the Water, or Any Other Hazard",
    body: `Play the ball laterally and add a stroke (if in the water, drop on other side). Provisional balls not necessary.

For unplayable sand traps: ok to move the ball to where it can be played, but it cannot be closer to the pin.

Ok to roll the ball in the fairway, lift and clean is ok.`,
    place: 2,
  });

  await Info.create({
    subject: "Putts: Gimmes are Ok",
    body: `Player must add a stroke for the gimme.`,
    place: 3,
  });

  console.log("DATA SEEDED");
});
