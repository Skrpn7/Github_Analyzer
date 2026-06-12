const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Profile = sequelize.define(
  "Profile",
  {
    githubId: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
    },

    bio: {
      type: DataTypes.TEXT,
    },

    avatarUrl: {
      type: DataTypes.STRING,
    },

    profileUrl: {
      type: DataTypes.STRING,
    },

    publicRepos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    followers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    following: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    totalStars: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    totalForks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    topLanguage: {
      type: DataTypes.STRING,
    },

    averageStars: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    accountCreatedAt: {
      type: DataTypes.DATE,
    },

    analyzedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
    accountAgeYears: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    mostStarredRepo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Profile;
