const generateInsights = (repos) => {
  let totalStars = 0;
  let totalForks = 0;

  const languages = {};

  let mostStarredRepo = null;
  let highestStars = 0;

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
    if (repo.stargazers_count > highestStars) {
      highestStars = repo.stargazers_count;
      mostStarredRepo = repo.name;
    }
  });

  const topLanguage =
    Object.keys(languages).sort((a, b) => languages[b] - languages[a])[0] ||
    null;

  const averageStars =
    repos.length > 0 ? Number((totalStars / repos.length).toFixed(2)) : 0;

  return {
    totalStars,
    totalForks,
    topLanguage,
    averageStars,
    mostStarredRepo,
  };
};

module.exports = generateInsights;
