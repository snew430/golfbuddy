const { AuthenticationError } = require("apollo-server-express");
const { Admin, Player, Course, Hotel, Tournament } = require("../models");
const { signToken } = require("../utils/auth");
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

    addPlayerToActiveTournament: async (parent, { player, tournament }) => {
      const playerToAdd = await Player.findById(player);

      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
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
      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
        {
          $pull: {
            playersActive: { _id: player },
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

    addPlayerToWaitlistTournament: async (parent, { player, tournament }) => {
      const playerToAdd = await Player.findById(player);

      const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: tournament },
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
  },
};

module.exports = resolvers;
