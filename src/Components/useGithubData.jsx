import { useEffect, useState } from 'react';

const useGithubData = username => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchGithubData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
            signal,
          }),
        ]);

        if (!userRes.ok)
          throw new Error(
            `User fetch failed: ${userRes.status} ${userRes.statusText}`
          );

        if (!reposRes.ok)
          throw new Error(
            `Repos fetch failed: ${reposRes.status} ${reposRes.statusText}`
          );

        const userData = await userRes.json();
        const repoData = await reposRes.json();

        setProfile(userData);
        setRepos(repoData);
      } catch (err) {
        if (err.name === 'AbortError') return; // ignore component unmount errors
        console.error('GitHub API Error:', err);
        setError(err.message || 'Unable to load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();

    return () => controller.abort();
  }, [username]);

  return { profile, repos, loading, error };
};

export default useGithubData;