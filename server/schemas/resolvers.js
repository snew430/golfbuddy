const {AuthenticationError} = require('apollo-server-express');
const {Admin, Player, Course, Hotel, Trip, Info, Note} = require('../models');
const {signToken} = require('../utils/auth');
const fs = require('fs');

require('dotenv').config();
let nodemailer = require('nodemailer');
const {where} = require('../models/Player');

const resolvers = {
  Query: {
    players: async () => {
      return await Player.find();
    },
    courses: async () => {
      return await Course.find();
    },
    hotel: async () => {
      return await Hotel.find();
    },
    trips: async () => {
      return await Trip.find()
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');
    },
    trip: async (parent, {id}) => {
      return await Trip.findById(id)
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');
    },
    info: async () => {
      const info = await Info.find();
      return info.sort((a, b) => a.place - b.place);
    },
    activeTrip: async () => {
      const activeTrip = await Trip.findOne({active: true})
        .populate('courses')
        .populate('hotel')
        .populate('playersActive')
        .populate('playersWaitlist');
      return activeTrip;
    },
    note: async () => {
      const note = await Note.find();
      return note;
    },
  },
  Mutation: {
    login: async (parent, {email, password}) => {
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

    addPlayer: async (parent, args) => {
      const player = await Player.create(args);
      return player;
    },

    //LOGIN REQUIRED
    updatePlayer: async (parent, args, context) => {
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
        const hotel = await Hotel.create({
          name: args.hotelName,
          address: args.hotelAddress,
          website: args.hotelWebsite,
          phoneNumber: args.hotelPhoneNumber,
        });
        const course1 = await Course.create({
          name: args.courseOneName,
          address: args.courseOneAddress,
          website: args.courseOneWebsite,
          phoneNumber: args.courseOnePhoneNumber,
          teeTime: args.courseOneTeeTime,
        });
        const course2 = await Course.create({
          name: args.courseTwoName,
          address: args.courseTwoAddress,
          website: args.courseTwoWebsite,
          phoneNumber: args.courseTwoPhoneNumber,
          teeTime: args.courseTwoTeeTime,
        });
        const course3 = await Course.create({
          name: args.courseThreeName,
          address: args.courseThreeAddress,
          website: args.courseThreeWebsite,
          phoneNumber: args.courseThreePhoneNumber,
          teeTime: args.courseThreeTeeTime,
        });
        const course4 = await Course.create({
          name: args.courseFourName,
          address: args.courseFourAddress,
          website: args.courseFourWebsite,
          phoneNumber: args.courseFourPhoneNumber,
          teeTime: args.courseFourTeeTime,
        });

        const trip = await Trip.create({
          name: args.name,
          startDate: args.startDate,
          endDate: args.endDate,
          paymentDue: args.paymentDue,
          singlePrice: args.singlePrice,
          doublePrice: args.doublePrice,
          golfOnlyPrice: args.golfOnlyPrice,
          courses: [course1, course2, course3],
          hotel: hotel,
          maxPlayers: args.maxPlayers,
        });
        return trip;
      }
      throw new AuthenticationError('Not logged in');
    },

    //LOGIN REQUIRED
    editTrip: async (_, args, context) => {
      if (context.user) {
        return await Trip.findByIdAndUpdate(args.id, args, {
          new: true,
          runValidators: true,
        });
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
    deleteTrip: async (parent, {id}, context) => {
      if (context.user) {
        return await Trip.findByIdAndDelete(id);
      }
    },

    addPlayerToActiveTrip: async (parent, args) => {
      const playerToAdd = await Player.create(args);

      const updatedTrip = await Trip.findOneAndUpdate(
        {active: true},
        {
          $push: {
            playersActive: playerToAdd,
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

    removeActivePlayer: async (parent, {player, trip}) => {
      try {
        const updatedTrip = await Trip.findOneAndUpdate(
          {active: true},
          {
            $pull: {
              playersActive: {$in: [player]},
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

    addCurrentPlayerToActive: async (parent, {player, trip}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $push: {
            playersActive: {_id: player},
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

    addPlayerToWaitlistTrip: async (
      parent,
      {
        tripId,
        firstName,
        lastName,
        email,
        phoneNumber,
        preferredRoomate,
        lodging,
      }
    ) => {
      const playerToAdd = await Player.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        preferredRoomate: preferredRoomate,
        lodging: lodging,
      });

      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: tripId},
        {
          $push: {
            playersWaitlist: playerToAdd,
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

    addCurrentPlayerToWaitlist: async (parent, {player, trip}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $push: {
            playersWaitlist: {_id: player},
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

    removeWaitlistPlayer: async (parent, {player, trip}) => {
      try {
        const updatedTrip = await Trip.findOneAndUpdate(
          {_id: trip},
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

    addCourseToTrip: async (parent, {course, trip}) => {
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

    removeCourseFromTrip: async (parent, {course, trip}) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        {_id: trip},
        {
          $pull: {
            courses: {_id: course},
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

    addHotelToTrip: async (parent, {hotel, trip}) => {
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

    removeHotelFromTrip: async (parent, {hotel, trip}) => {
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

    sendMessage: async (parent, {recipients, subject, message, file}) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.NODEPASS,
        },
      });

      // verifying the connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        }
      });

      const mail = {
        from: process.env.EMAIL,
        to: recipients,
        subject: subject,
        text: message,
        // attachments: [
        //   { filename: "attachment", content: fs.createReadStream(file) },
        // ],
      };

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      return Admin;
    },

    paidPlayer: async (parent, {player, paid}) => {
      const updatedPlayer = Player.findOneAndUpdate(
        {_id: player},
        {paid: paid},
        {new: true}
      );
      return updatedPlayer;
    },

    addInfo: async (parent, {subject, header, body}) => {
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

    editInfo: async (parent, args, context) => {
      return await Info.findByIdAndUpdate(args.id, args, {
        new: true,
        runValidators: true,
      });
    },

    deleteInfo: async (parent, {id}, context) => {
      return await Info.findByIdAndDelete(id, {
        new: true,
      });
    },

    swapInfoPlace: async (parent, {firstID, secondID}, context) => {
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

    updateNote: async (parent, args, context) => {
      return await Note.updateOne(args);
    },
  },
};

module.exports = resolvers;
