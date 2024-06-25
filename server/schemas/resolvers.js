const {AuthenticationError} = require('apollo-server-express');
const {Admin, Player, Course, Hotel, Trip, Info, Note} = require('../models');
const {signToken} = require('../utils/auth');
const fs = require('fs');

require('dotenv').config();
let nodemailer = require('nodemailer');
const {where} = require('../models/Player');

const resolvers = {
  Query: {
    players: async () => await Player.find(),

    courses: async () => await Course.find().sort('name'),

    hotels: async () => await Hotel.find().sort('name'),

    trips: async () =>
      await Trip.find()
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist'),
    trip: async (_, {id}) =>
      await Trip.findById(id)
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist'),
    info: async () => {
      const info = await Info.find();
      return info.sort((a, b) => a.place - b.place);
    },
    activeTrip: async () =>
      await Trip.findOne({active: true})
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist'),

    note: async () => await Note.find(),
  },
  Mutation: {
    login: async (_, {email, password}) => {
      const user = await Admin.findOne({email});

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return {token, user};
    },

    addPlayer: async (_, args) => {
      return await Player.create(args);
    },

    //LOGIN REQUIRED
    updatePlayer: async (_, args, context) => {
      if (context.user) {
        return await Player.findByIdAndUpdate(args.id, args, {
          new: true,
          runValidators: true,
        });
      }
      throw new AuthenticationError('Not logged in');
    },

    deletePlayer: async (_, {id}, context) => {
      if (context.user) {
        return await Player.findByIdAndDelete(id, {
          new: true,
        });
      }
      throw new AuthenticationError('Not logged in');
    },

    //LOGIN REQUIRED
    addCourse: async (_, args, context) => {
      if (context.user) {
        const course = await Course.create(args);
        return course;
      }
      throw new AuthenticationError('Not logged in');
    },

    //LOGIN REQUIRED
    addHotel: async (_, args, context) => {
      if (context.user) {
        const hotel = await Hotel.create(args);
        return hotel;
      }
      throw new AuthenticationError('Not logged in');
    },

    //LOGIN REQUIRED
    addTrip: async (_, args, context) => {
      if (context.user) {
        const trip = await Trip.create({
          name: args.name,
          startDate: args.startDate,
          endDate: args.endDate,
          paymentDue: args.paymentDue,
          singlePrice: args.singlePrice,
          doublePrice: args.doublePrice,
          golfOnlyPrice: args.golfOnlyPrice,
          courses: [
            args.courseOne,
            args.courseTwo,
            args.courseThree,
            args.courseFour,
          ],
          hotel: args.hotel,
          maxPlayers: args.maxPlayers,
          dayOneStart: args.dayOneStart,
          dayTwoStart: args.dayTwoStart,
          dayThreeStart: args.dayThreeStart,
          dayFourStart: args.dayFourStart,
        });
        return trip;
      }
      throw new AuthenticationError('Not logged in');
    },

    //LOGIN REQUIRED
    editTrip: async (_, args, context) => {
      if (context.user) {
        const trip = await Trip.findByIdAndUpdate(args.id, args, {
          new: true,
          runValidators: true,
        });
        return trip;
      }
      throw new AuthenticationError('Not logged in');
    },

    changeTripToActive: async (_, {id}, context) => {
      try {
        const activeTrip = await Trip.findOneAndUpdate(
          {active: true},
          {active: false},
          {new: true}
        );

        return await Trip.findByIdAndUpdate(id, {active: true}, {new: true});
      } catch (error) {
        console.log(error);
      }
    },
    // ===========================================
    //LOGIN REQUIRED
    deleteTrip: async (_, {id}, context) => {
      if (context.user) {
        return await Trip.findByIdAndDelete(id);
      }
    },

    addPlayerToActiveTrip: async (_, args) => {
      let playerToAdd = await Player.findOneAndUpdate(
        {
          firstName: args.firstName,
          lastName: args.lastName,
        },
        {...args, paid: false},
        {runValidators: true, new: true}
      );
      if (!playerToAdd) playerToAdd = await Player.create(args);

      const updatedTrip = await Trip.findOneAndUpdate(
        {active: true},
        {
          $addToSet: {
            playersActive: playerToAdd._id,
          },
        },
        {new: true, runValidators: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    removeActivePlayer: async (_, {player}) => {
      try {
        const updatedTrip = await Trip.findOneAndUpdate(
          {active: true},
          {
            $pull: {
              playersActive: player,
            },
          },
          {new: true}
        )
          .populate('courses')
          .populate('hotel')
          .populate('playersActive')
          .populate('playersWaitlist');

        return updatedTrip;
      } catch (error) {
        console.log(error);
      }
    },

    addCurrentPlayerToActive: async (_, {player}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {active: true},
        {
          $addToSet: {
            playersActive: player,
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    addPlayerToWaitlistTrip: async (_, args) => {
      let playerToAdd = await Player.findOneAndUpdate(
        {
          firstName: args.firstName,
          lastName: args.lastName,
        },
        {...args, paid: false},
        {runValidators: true, new: true}
      );
      if (!playerToAdd) playerToAdd = await Player.create(args);

      const updatedTrip = await Trip.findOneAndUpdate(
        {active: true},
        {
          $addToSet: {
            playersWaitlist: playerToAdd._id,
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    addCurrentPlayerToWaitlist: async (_, {player}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {active: true},
        {
          $addToSet: {
            playersWaitlist: player,
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    removeWaitlistPlayer: async (_, {player}) => {
      try {
        const updatedTrip = await Trip.findOneAndUpdate(
          {active: true},
          {
            $pull: {
              playersWaitlist: {$in: [player]},
            },
          },
          {new: true}
        )
          .populate('courses')
          .populate('hotel')
          .populate('playersActive')
          .populate('playersWaitlist');

        return updatedTrip;
      } catch (error) {
        console.log(error);
      }
    },

    addCourseToTrip: async (_, {course, trip}) => {
      const courseToAdd = await Course.findById(course);

      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $push: {
            courses: courseToAdd,
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    removeCourseFromTrip: async (_, {course, trip}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $pull: {
            courses: course,
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    addHotelToTrip: async (_, {hotel, trip}) => {
      const hotelToAdd = await Hotel.findById(hotel);

      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $push: {
            hotel: hotelToAdd,
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    removeHotelFromTrip: async (_, {hotel, trip}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $pull: {
            hotel: {_id: hotel},
          },
        },
        {new: true}
      )
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');

      return updatedTrip;
    },

    sendMessage: async (_, {recipients, subject, message, file}) => {
      const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: process.env.OUTLOOK_USERNAME,
          pass: process.env.OUTLOOK_PASSWORD,
        },
      });

      // verifying the connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      });

      const mail = {
        from: process.env.OUTLOOK_USERNAME,
        to: recipients,
        subject: subject,
        text: `
Hey Golfer,

${message}

Sincerely
WhatsMyTeamTime Management
        `,
      };

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      return Admin;
    },

    paidPlayer: async (_, {player, paid}) => {
      const updatedPlayer = Player.findOneAndUpdate(
        {_id: player},
        {paid: paid},
        {new: true}
      );
      return updatedPlayer;
    },

    addInfo: async (_, {subject, header, body}) => {
      const info = await Info.find();
      const length = info.length;

      const player = await Info.create({
        subject: subject,
        header: header,
        body: body,
        place: length + 1,
      });

      return player;
    },

    editInfo: async (_, args, context) => {
      return await Info.findByIdAndUpdate(args.id, args, {
        new: true,
        runValidators: true,
      });
    },

    deleteInfo: async (_, {id}, context) => {
      return await Info.findByIdAndDelete(id, {
        new: true,
      });
    },

    swapInfoPlace: async (_, {firstID, secondID}, context) => {
      const firstInfo = await Info.findById(firstID);
      const secondInfo = await Info.findById(secondID);

      await Info.findByIdAndUpdate(firstID, {
        place: secondInfo.place,
        ne: true,
      });
      return await Info.findByIdAndUpdate(secondID, {
        place: firstInfo.place,
        new: true,
      });
    },

    updateNote: async (_, args) => {
      return await Note.updateOne(args);
    },
  },
};

module.exports = resolvers;
