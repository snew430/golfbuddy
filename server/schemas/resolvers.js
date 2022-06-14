const { AuthenticationError } = require("apollo-server-express");
const { Admin, Player, Course, Hotel, Trip, Info } = require("../models");
const { signToken } = require("../utils/auth");
const fs = require("fs");

require("dotenv").config();
let nodemailer = require("nodemailer");

const resolvers = {
  Query: {
    players: async () => {
      return await Player.find();
    },
    courses: async () => {
      return await Course.find();
    },
    hotels: async () => {
      return await Hotel.find();
    },
    trips: async () => {
      return await Trip.find()
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");
    },
    trip: async (parent, { id }) => {
      return await Trip.findById(id)
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");
    },
    info: async () => {
      return await Info.find();
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await Admin.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
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
      throw new AuthenticationError("Not logged in");
    },

    deletePlayer: async (parent, { id }, context) => {
      if (context.user) {
        return await Player.findByIdAndDelete(id, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    addCourse: async (parent, args, context) => {
      if (context.user) {
        const course = await Course.create(args);
        return course;
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    addHotel: async (parent, args, context) => {
      if (context.user) {
        const hotel = await Hotel.create(args);
        return hotel;
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    addTrip: async (parent, args, context) => {
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
        });
        const course2 = await Course.create({
          name: args.courseTwoName,
          address: args.courseTwoAddress,
          website: args.courseTwoWebsite,
          phoneNumber: args.courseTwoPhoneNumber,
        });
        const course3 = await Course.create({
          name: args.courseThreeName,
          address: args.courseThreeAddress,
          website: args.courseThreeWebsite,
          phoneNumber: args.courseThreePhoneNumber,
        });
        const course4 = await Course.create({
          name: args.courseFourName,
          address: args.courseFourAddress,
          website: args.courseFourWebsite,
          phoneNumber: args.courseFourPhoneNumber,
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
          hotels: hotel,
          maxPlayers: args.maxPlayers,
        });
        return trip;
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    editTrip: async (parent, args, context) => {
      if (context.user) {
        return await Trip.findByIdAndUpdate(args.id, args, {
          new: true,
          runValidators: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    deleteTrip: async (parent, { id }, context) => {
      if (context.user) {
        return await Trip.findByIdAndDelete(id);
      }
    },

    addPlayerToActiveTrip: async (
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
        { _id: tripId },
        {
          $push: {
            playersActive: playerToAdd,
          },
        },
        { new: true, runValidators: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    removeActivePlayer: async (parent, { player, trip }) => {
      try {
        const updatedTrip = await Trip.findOneAndUpdate(
          { _id: trip },
          {
            $pull: {
              playersActive: { $in: [player] },
            },
          },
          { new: true }
        )
          .populate("courses")
          .populate("hotels")
          .populate("playersActive")
          .populate("playersWaitlist");

        return updatedTrip;
      } catch (error) {
        console.log(error);
      }
    },

    addCurrentPlayerToActive: async (parent, { player, trip }) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip },
        {
          $push: {
            playersActive: { _id: player },
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

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
        { _id: tripId },
        {
          $push: {
            playersWaitlist: playerToAdd,
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    addCurrentPlayerToWaitlist: async (parent, { player, trip }) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip },
        {
          $push: {
            playersWaitlist: { _id: player },
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    removeWaitlistPlayer: async (parent, { player, trip }) => {
      try {
        const updatedTrip = await Trip.findOneAndUpdate(
          { _id: trip },
          {
            $pull: {
              playersWaitlist: { $in: [player] },
            },
          },
          { new: true }
        )
          .populate("courses")
          .populate("hotels")
          .populate("playersActive")
          .populate("playersWaitlist");

        return updatedTrip;
      } catch (error) {
        console.log(error);
      }
    },

    addCourseToTrip: async (parent, { course, trip }) => {
      const courseToAdd = await Course.findById(course);

      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip },
        {
          $push: {
            courses: courseToAdd,
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    removeCourseFromTrip: async (parent, { course, trip }) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip },
        {
          $pull: {
            courses: { _id: course },
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    addHotelToTrip: async (parent, { hotel, trip }) => {
      const hotelToAdd = await Hotel.findById(hotel);

      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip },
        {
          $push: {
            hotels: hotelToAdd,
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    removeHotelFromTrip: async (parent, { hotel, trip }) => {
      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip },
        {
          $pull: {
            hotels: { _id: hotel },
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTrip;
    },

    sendMessage: async (parent, { recipients, subject, message, file }) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      // verifying the connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages!");
        }
      });

      const mail = {
        from: process.env.EMAIL,
        to: recipients,
        subject: subject,
        text: message,
        attachments: [
          { filename: "attachment", content: fs.createReadStream(file) },
        ],
      };

      console.log(mail);

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      return Admin;
    },

    paidPlayer: async (parent, { player, paid }) => {
      const updatedPlayer = Player.findOneAndUpdate(
        { _id: player },
        { paid: paid },
        { new: true }
      );
      return updatedPlayer;
    },

    addInfo: async (parent, { subject, body }) => {
      const info = await Info.find();
      const length = info.length;

      const player = await Info.create({
        subject: subject,
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

    deleteInfo: async (parent, { id }, context) => {
      return await Info.findByIdAndDelete(id, {
        new: true,
      });
    },
  },
};

module.exports = resolvers;
