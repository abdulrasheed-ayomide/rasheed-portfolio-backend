require('dotenv').config();
const USERNAME = 'abdulrasheed-ayomide';

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};


const getGithubData = async (req, res) => {
  try {
    const profileRes = await fetch(
      `https://api.github.com/users/${USERNAME}`, { headers }
    );
    console.log(profileRes.status);

    const profile = await profileRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }
    );


    const repos = await reposRes.json();

    if (!Array.isArray(repos)) {
      console.log("GitHub Error:", repos);

      return res.status(500).json({
        error: repos.message || "Failed to fetch repositories"
      });
    }

    let totalCommits = 0;

    const recentRepos = repos.filter(repo => !repo.fork);

    for (const repo of recentRepos) {
      try {
        const contribRes = await fetch(
          `https://api.github.com/repos/${USERNAME}/${repo.name}/contributors`, { headers }
        );

        const contributors = await contribRes.json();

        const me = contributors.find(
          c => c.login === USERNAME
        );

        if (me) {
          totalCommits += me.contributions;
        }

        console.log(repo.name, contribRes.status);
      } catch (err) {
        console.log(err);
      }
    }

    const topRepos = repos
      .filter(repo => !repo.fork)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at) - new Date(a.pushed_at)
      )
      .slice(0, 6);

    const languages = {};

    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] =
          (languages[repo.language] || 0) + 1;
      }
    });

    res.json({
      profile,
      repos,
      topRepos,
      languages,
      totalCommits
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to fetch GitHub data'
    });
  }
};

module.exports = {
  getGithubData
};