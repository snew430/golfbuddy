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
        .populate("players");
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
        return await Player.findByIdAndUpdate(args._id, args, {
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
        return await Tournament.findByIdAndUpdate(args._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    //LOGIN REQUIRED
    deleteTournament: async (parent, { _id }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndDelete(_id);
      }
    },

    addPlayerToActiveTournament: async (parent, { player, tournament }) => {
      const playerToAdd = await Player.findById(player);
      console.log(playerToAdd);
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
        .populate("players");

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
        .populate("players");

      return updatedTournament;
    },

    addPlayerToWaitlistTournament: async (parent, { player, tournament }) => {
      const playerToAdd = await Player.findById(player);
      console.log(playerToAdd);
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
        .populate("players");

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
        .populate("players");

      return updatedTournament;
    },
  },
};

module.exports = resolvers;
