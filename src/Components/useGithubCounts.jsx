import React from 'react'
import { useEffect, useState } from 'react';

const UseGithubCounts = (projects = [], options = {}) => {
  const { token } = options;
  const [counts, setCounts] = useState({});
  useEffect(() => {
    let mounted = true;
    async function fetchCounts() {
      const map = {};
      for (const p of projects) {
        try {
          const url = new URL(p.link);
          if (!url.hostname.includes('github.com')) continue;
          const parts = url.pathname.split('/').filter(Boolean);
          if (parts.length < 2) continue;
          const owner = parts[0];
          const repo = parts[1];
          const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
          const headers = {};
          if (token) headers.Authorization = `token ${token}`;
          const res = await fetch(apiUrl, { headers });
          if (!res.ok) continue;
          const json = await res.json();
          map[p.id] = { stars: json.stargazers_count, forks: json.forks_count };
        } catch (err) {
          console.error(
            `Failed to fetch GitHub data for project ${p.id}:`,
            err
          );
        }
      }
      if (mounted) setCounts(map);
    }
    fetchCounts();
    return () => {
      mounted = false;
    };
  }, [projects, token]);
  return counts;
};

export default UseGithubCounts