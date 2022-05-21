const db = require("./connection");
const { Admin, Hotel, Course, Player, Tournament } = require("../models");

db.once("open", async () => {
  await Admin.deleteMany();
  await Hotel.deleteMany();
  await Course.deleteMany();
  await Player.deleteMany();
  await Tournament.deleteMany();

  const admin = await Admin.create({
    email: "whatsmyteetime@gmail.com",
    password: "What$myt33time",
  });

  const course1 = await Course.create({
    name: "Alpine Lake",
    address: "123 Alpine Road",
    website: "www.alpinelake.com",
  });
  const course2 = await Course.create({
    name: "Rocky Gap",
    address: "456 Rocky Road",
    website: "www.rockygap.com",
  });

  const hotel1 = await Hotel.create({
    name: "Alpine Lake",
    address: "456 Rocky Road",
    website: "www.rockygap.com",
  });

  const hotel2 = await Hotel.create({
    name: "Motel 6",
    address: "789 Highway 3",
    website: "www.motel6.com",
  });

  const player1 = await Player.create({
    firstName: "Sean",
    lastName: "New",
    email: "sean@sean.com",
    phoneNumber: "4102156229",
    preferredRoomate: "John New",
    lodging: "Double",
  });

  const player2 = await Player.create({
    firstName: "Angelo",
    lastName: "Boer",
    email: "angelo@angelo.com",
    phoneNumber: "4106589725",
    lodging: "Single",
  });

  const player3 = await Player.create({
    firstName: "John",
    lastName: "New",
    email: "john@john.com",
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
    courses: [course1, course2],
    hotels: [hotel1, hotel2],
    maxPlayers: 40,
    playersActive: [player1, player2, player3],
    playersWaitlist: [player4],
  });

  console.log("DATA SEEDED");
});
