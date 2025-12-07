import React from 'react';
import { useEffect, useState } from 'react';

const UseGithubData = username => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );

        if (!userRes.ok) {
          throw new Error(
            `Failed to fetch user: ${userRes.status} ${userRes.statusText}`
          );
        }
        if (!repoRes.ok) {
          throw new Error(
            `Failed to fetch repos: ${repoRes.status} ${repoRes.statusText}`
          );
        }

        const userData = await userRes.json();
        const repoData = await repoRes.json();
        setProfile(userData);
        setRepos(repoData);
      } catch (error) {
        console.error('GitHub API Error:', error);
        setError(error.message || 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [username]);

  return { profile, repos, loading, error };
};

export default UseGithubData;
