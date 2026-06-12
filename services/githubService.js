const axios = require("axios");

const getGithubProfileData = async (username) => {
  const headers = {};

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers },
  );

  const repoResponse = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers },
  );

  return {
    user: userResponse.data,
    repos: repoResponse.data,
  };
};

module.exports = {
  getGithubProfileData,
};
