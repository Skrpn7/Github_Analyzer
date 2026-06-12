const Profile = require("../models/Profile");
const ApiResponse = require("../utils/apiResponse");
const { Op } = require("sequelize");

const { getGithubProfileData } = require("../services/githubService");

const generateInsights = require("../utils/insightsGenerator");

//analyze GitHub profile and save insights to database
const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const { user, repos } = await getGithubProfileData(username);

    if (!user) {
      return res
        .status(404)
        .json(ApiResponse.error("GitHub user not found", 404));
    }

    const insights = generateInsights(repos);

    const accountAgeYears = (
      (new Date() - new Date(user.created_at)) /
      (1000 * 60 * 60 * 24 * 365)
    ).toFixed(2);

    const profileData = {
      githubId: user.id,
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,

      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,

      totalStars: insights.totalStars,
      totalForks: insights.totalForks,
      topLanguage: insights.topLanguage,
      averageStars: insights.averageStars,
      mostStarredRepo: insights.mostStarredRepo,

      accountCreatedAt: user.created_at,
      accountAgeYears,
      analyzedAt: new Date(),
    };

    const [profile] = await Profile.upsert(profileData, {
      returning: true,
    });

    return res.status(200).json(ApiResponse.success(profileData, 1));
  } catch (error) {
    console.error(error);
    if (error.response?.status === 404) {
      return res
        .status(404)
        .json(ApiResponse.error("GitHub user not found", 404));
    }

    if (error.response?.status === 403) {
      return res
        .status(403)
        .json(ApiResponse.error("GitHub API rate limit exceeded", 403));
    }

    return res.status(500).json(ApiResponse.error(error.message, 500));
  }
};

//get all analyzed profiles with pagination, search and sorting
const getAllProfiles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = search
      ? {
          username: {
            [Op.like]: `%${search}%`,
          },
        }
      : {};

    const { rows, count } = await Profile.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      order: [[sort, order]],
    });

    return res.status(200).json(
      ApiResponse.success(
        {
          profiles: rows,
          pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(count / limit),
            totalRecords: count,
          },
        },
        count,
      ),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json(ApiResponse.error(error.message));
  }
};

//get analyzed profile by username
const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({
      where: {
        username,
      },
    });

    if (!profile) {
      return res.status(404).json(ApiResponse.error("Profile not found", 404));
    }

    return res.status(200).json(ApiResponse.success(profile, 1));
  } catch (error) {
    console.error(error);

    return res.status(500).json(ApiResponse.error(error.message));
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
};
