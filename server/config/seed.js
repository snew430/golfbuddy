const db = require("./connection");
const { Admin } = require("../models");

db.once("open", async () => {
  await Admin.deleteMany();

  const admin = await Admin.create({
    email: "earlybirdiegolf@gmail.com",
    password: "EarlyB!rdie1",
  });
  console.log("ADMIN SEEDED");
});
