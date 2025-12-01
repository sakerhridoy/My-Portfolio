import React from 'react';
import { useEffect, useState } from 'react';

const useGithubData = username => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );

        const userData = await userRes.json();
        const repoData = await repoRes.json();

        setProfile(userData);
        setRepos(repoData);
      } catch (error) {
        console.error('GitHub API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [username]);

  return { profile, repos, loading };
};

export default useGithubData;
