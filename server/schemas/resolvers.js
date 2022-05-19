const { AuthenticationError } = require("apollo-server-express");
const { Admin, Player, Course, Hotel, Tournament } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    admin: async () => {
      return await Admin.find();
    },
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
    currentPlayers: async (parent, { _id }) => {
      return await Tournament.findById(_id).populate("players");
    },
    waitlistedPlayers: async (parent, { _id }) => {
      return await Tournament.findById(_id).populate("players");
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

    //LOGIN REQUIRED
    addAdmin: async (parent, args, context) => {
      if (context.user) {
        const user = await Admin.create(args);
        return user;
      }
      throw new AuthenticationError("Not logged in");
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

    editTournament: async (parent, args, context) => {
      if (context.user) {
        return await Tournament.findByIdAndUpdate(args._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    deleteTournament: async (parent, { _id }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndDelete(_id);
      }
    },

    // addPlayerToTournament: async (parent, args) => {
    //   return await Tournament.findByIdAndUpdate(args._id, args, {
    //     new: true,
    //   });
    // },

    addPlayerToTournament: async (parent, { player, tournament }, context) => {
      if (context.user) {
        // const tournament = await Tournament.findById(tournament);
        // console.log(tournament);
        // const activePlayers = await tournament.playersActive.length;
        // console.log(activePlayers);
        // const maxPlayers = await tournament.maxPlayers;
        // console.log(maxPlayers);
        const updatedTournament = await Tournament.findOneAndUpdate(
          { _id: tournament },
          {
            $addToSet: {
              playersActive: player,
            },
          },
          { new: true }
        )
          .populate("courses")
          .populate("hotels")
          .populate("players");

        return updatedTournament;
      }
    },
  },
};

module.exports = resolvers;
