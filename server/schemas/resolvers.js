const { AuthenticationError } = require("apollo-server-express");
const { Admin, Player, Course, Hotel, Tournament } = require("../models");
const { signToken } = require("../utils/auth");

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
    tournaments: async () => {
      return await Tournament.find()
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");
    },
    tournament: async (parent, { id }) => {
      return await Tournament.findById(id)
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");
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
    addTournament: async (parent, args, context) => {
      if (context.user) {
        const tournament = await Tournament.create(args);
        return tournament;
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    editTournament: async (parent, args, context) => {
      if (context.user) {
        return await Tournament.findByIdAndUpdate(args.id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    deleteTournament: async (parent, { id }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndDelete(id);
      }
    },

    addPlayerToActiveTournament: async (
      parent,
      {
        tournamentId,
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

      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournamentId },
        {
          $push: {
            playersActive: playerToAdd,
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTournament;
    },

    removeActivePlayer: async (parent, { player, tournament }) => {
      try {
        console.log("test");
        const updatedTournament = await Tournament.findOneAndUpdate(
          { _id: tournament },
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

        return updatedTournament;
      } catch (error) {
        console.log(error);
      }
    },

    addPlayerToWaitlistTournament: async (
      parent,
      {
        tournamentId,
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

      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournamentId },
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

      return updatedTournament;
    },

    removeWaitlistPlayer: async (parent, { player, tournament }) => {
      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
        {
          $pull: {
            playersWaitlist: { _id: player },
          },
        },
        { new: true }
      )
        .populate("courses")
        .populate("hotels")
        .populate("playersActive")
        .populate("playersWaitlist");

      return updatedTournament;
    },

    addCourseToTournament: async (parent, { course, tournament }) => {
      const courseToAdd = await Course.findById(course);

      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
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

      return updatedTournament;
    },

    removeCourseFromTourney: async (parent, { course, tournament }) => {
      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
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

      return updatedTournament;
    },

    addHotelToTournament: async (parent, { hotel, tournament }) => {
      const hotelToAdd = await Hotel.findById(hotel);

      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
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

      return updatedTournament;
    },

    removeHotelFromTourney: async (parent, { hotel, tournament }) => {
      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
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

      return updatedTournament;
    },

    sendMessage: async (parent, { recipients, subject, message }) => {
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
        message: subject,
        text: message,
      };

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      return Admin;
    },
  },
};

module.exports = resolvers;
