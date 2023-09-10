const db = require('./connection');
const {Admin, Hotel, Course, Player, Trip, Info, Note} = require('../models');

db.once('open', async () => {
  // await Admin.deleteMany();
  // await Hotel.deleteMany();
  // await Course.deleteMany();
  // await Player.deleteMany();
  // await Trip.deleteMany();
  // await Info.deleteMany();
  // await Note.deleteMany();

  // await Admin.create({
  //   email: process.env.EMAIL,
  //   password: process.env.PASS,
  // });

  // await Admin.create({
  //   email: process.env.PLAYEREMAIL,
  //   password: process.env.PLAYERPASS,
  // });

  // const course1 = await Course.create({
  //   name: 'Rum Pointe Seaside Golf Links',
  //   address: '7000 Rum Pointe Lane Berin, Maryland 21811',
  //   website: 'https://rumpointe.com/',
  //   phoneNumber: '4106291414',
  // });

  // const course2 = await Course.create({
  //   name: 'GlenRiddle Golf Club - War Admiral',
  //   address: '11501 Maid at Arms Lane Berlin, Maryland 21811',
  //   website: 'https://glenriddlegolf.com/',
  //   phoneNumber: '4102132325',
  // });

  // const course3 = await Course.create({
  //   name: "Hooper's Landing",
  //   address: '1019 W Locust Street, Seaford, Delaware 19973',
  //   website: 'https://www.hooperslanding.com/',
  //   phoneNumber: '3026292890',
  // });

  // const hotel1 = await Hotel.create({
  //   name: 'The Grand Hotel',
  //   address: '2100 N. Baltimore Avenue, Ocean City, Md. 21842',
  //   website: 'https://grandhoteloceancity.com/',
  //   phoneNumber: '4102896191',
  // });

  // const player1 = await Player.create({
  //   firstName: 'Sean',
  //   lastName: 'New',
  //   email: 'seanpnew@hotmail.com',
  //   phoneNumber: '4102156229',
  //   preferredRoomate: 'John New',
  //   lodging: 'Double',
  // });

  // const player2 = await Player.create({
  //   firstName: 'Caroline',
  //   lastName: 'Kyle',
  //   email: 'carolinekyle21@gmail.com',
  //   phoneNumber: '4106589725',
  //   lodging: 'Single',
  // });

  // const player3 = await Player.create({
  //   firstName: 'Reid',
  //   lastName: 'Schroder',
  //   email: 'reidschroder2@gmail.com',
  //   phoneNumber: '4102158669',
  //   preferredRoomate: 'Sean New',
  //   lodging: 'Double',
  // });

  // const player4 = await Player.create({
  //   firstName: 'John',
  //   lastName: 'Torsino',
  //   email: 'john@torsino.com',
  //   phoneNumber: '4101118669',
  //   lodging: 'Golf Only',
  // });

  // const trip1 = await Trip.create({
  //   name: 'Fall 2022 Trip',
  //   startDate: '10/16/2022',
  //   endDate: '10/19/2022',
  //   paymentDue: '08/01/2022',
  //   singlePrice: 560,
  //   doublePrice: 460,
  //   golfOnlyPrice: 360,
  //   courses: [course1, course2, course2, course3],
  //   hotel: hotel1,
  //   maxPlayers: 30,
  //   playersActive: [player1, player2, player3],
  //   playersWaitlist: [player4],
  //   active: true,
  //   dayOneStart: '9:00 am',
  //   dayTwoStart: '9:00 am',
  //   dayThreeStart: '9:00 am',
  //   dayFourStart: '9:00 am',
  // });

  // const trip2 = await Trip.create({
  //   name: 'Spring 2023 Trip',
  //   startDate: '4/16/2023',
  //   endDate: '4/19/2023',
  //   paymentDue: '1/01/2023',
  //   singlePrice: 400,
  //   doublePrice: 200,
  //   golfOnlyPrice: 200,
  //   courses: [course1, course2, course3],
  //   hotel: hotel1,
  //   maxPlayers: 30,
  //   playersActive: [player1, player2, player3],
  //   playersWaitlist: [player4],
  //   active: false,
  //   dayOneStart: '9:00 am',
  //   dayTwoStart: '9:00 am',
  //   dayThreeStart: '9:00 am',
  //   dayFourStart: '9:00 am',
  // });

  //   await Info.create({
  //     subject: "Rules & Regulations",
  //     header: "Senior Tees",
  //     body: "We are all using the tees that are 5800 yards and shorter.",
  //     place: 0,
  //   });

  //   await Info.create({
  //     subject: "Rules & Regulations",
  //     header: "Max Stroke on Any Hole is Par plus 3",
  //     body: "On a par 3, max is 6, par 4 max is 7, par 5 max is 8. Once you reach this score, please pick up and move to the next hole.",
  //     place: 1,
  //   });

  //   await Info.create({
  //     subject: "Rules & Regulations",
  //     header: "Balls Hit Out of Bounds, into the Water, or Any Other Hazard",
  //     body: `Play the ball laterally and add a stroke (if in the water, drop on other side). Provisional balls not necessary.

  // For unplayable sand traps: ok to move the ball to where it can be played, but it cannot be closer to the pin.

  // Ok to roll the ball in the fairway, lift and clean is ok.`,
  //     place: 2,
  //   });

  // await Info.create({
  //   subject: 'Rules And Regulations',
  //   header: 'Putts: Gimmes are Ok',
  //   body: `Player must add a stroke for the gimme.`,
  //   place: 3,
  // });

  // await Info.create({
  //   subject: 'Rules & Regulations',
  //   header: '',
  //   body: `We will set the foursomes for Sunday, and Wednesday’s Ryder Cup’s Round. On Monday and Tuesday, YOU CAN PICK YOUR OWN FOURSOME when we meet on Sunday morning. IF THERE'S SOMEONE YOU WANT TO PLAY WITH HERE'S YOUR CHANCE.`,
  //   place: 4,
  // });

  // await Info.create({
  //   subject: 'Rules & Regulations',
  //   header: '',
  //   body: `IN ADDITION, there are Other Daily Competitions operated by Dr. Tim. The competitions are an additional fee which you can choose to play or not. He will explain before we tee off what’s cooked up for competitive play. `,
  //   place: 4,
  // });

  // await Info.create({
  //   subject: 'Ryder Cup',
  //   header:
  //     'We have two teams each with a different color shirt (one team Black and one White).',
  //   body: `• Each foursome will have two players from each team.
  // • The format is 3 six-hole competitions. Each 6-hole format is worth one point for the winning team for a total of 3 points.
  // • There are no strokes given, as foursomes are matched by players with similar averages.
  // • Teams will be announced prior to the trip.`,
  //   place: 5,
  // });

  // await Info.create({
  //   subject: 'Ryder Cup',
  //   header: 'Holes #1-6 Scramble: Captains Choice',
  //   body: `Both players will tee off, go to whatever shot is the best and play from that spot. Players will repeat until the ball is holed. There will be one score for each side.`,
  //   place: 6,
  // });

  // await Info.create({
  //   subject: 'Ryder Cup',
  //   header: 'Holes #7-12 Alternate Shot',
  //   body: `On each hole, both players will tee off, and select the best shot. From that point, the OTHER player (from the pair) will play the next shot. Players will alternate shots until the ball is holed. There will be one score for each side.`,
  //   place: 7,
  // });

  // await Info.create({
  //   subject: 'Ryder Cup',
  //   header: 'Holes #13-18 (Better Ball) Play your own Ball',
  //   body: `Both players tee off and each plays his own ball into the hole. For each hole the better of the two scores of the pair will be the team score. In addition, please track the total numbers of holes won in the round. We will use this at the end of the competition in case the teams are tied.

  // There are two options when the total number of players is uneven. The committee will choose which option will be used.`,
  //   place: 8,
  // });

  // await Info.create({
  //   subject: 'Ryder Cup',
  //   header: 'Option #1 3 Man Rover',
  //   body: `One person plays for the white team, the second plays for the black team, and the third is a rover (playing on both white and black teams). • The format is the same 3 six-hole competitions stated above (captain’s choice, alternate shot and better ball.) • For each of the 3 formats, the rover partners with the white team player for three holes, then partners with the black team player for three holes. • There is no format or scoring change in each of the 3 competitions`,
  //   place: 9,
  // });

  // await Info.create({
  //   subject: 'Ryder Cup',
  //   header: 'Option #2 Solo Player (one guy vs. two guys)',
  //   body: `Captain’s Choice: Solo player hits two balls and chooses which ball he then plays. He does this throughout until the ball is holed. Alternate Shot: Solo player hits two drives then chooses and plays one ball until it is holed. Better Ball: The solo player plays two balls separately marked to distinguish each ball. Takes the score of the better ball.`,
  //   place: 10,
  // });

  // await Note.create({
  //   header: 'Header Goes Here',
  //   body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed impedit laboriosam maxime vitae reprehenderit quia enim quidem optio ut ipsum placeat numquam eum aliquid, ex rerum tempore laborum. Earum, excepturi.',
  // });

  console.log('DATA SEEDED');
});
