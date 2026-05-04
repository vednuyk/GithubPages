import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'vednuyk';
const TOKEN = process.env.GITHUB_TOKEN;

async function fetchStats() {
  console.log(`Fetching GitHub stats for ${USERNAME}...`);
  
  const headers = {};
  if (TOKEN) {
    headers['Authorization'] = `token ${TOKEN}`;
  }

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
    if (!userRes.ok) throw new Error(`User fetch failed: ${userRes.statusText}`);
    const userData = await userRes.json();

    // 2. Fetch All Public Repos (Max 100)
    const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, { headers });
    if (!reposRes.ok) throw new Error(`Repos fetch failed: ${reposRes.statusText}`);
    const repos = await reposRes.json();

    let totalStars = 0;
    const languageMap = {};

    // 3. Process Repos
    for (const repo of repos) {
      if (repo.fork) continue;
      
      totalStars += repo.stargazers_count;
      
      if (repo.language) {
        // We use repo.language for simplicity or fetch repo.languages_url for detailed bytes
        // Let's use repo.language first for basic stats, or fetch more detail
      }
      
      // Detailed languages
      const langRes = await fetch(repo.languages_url, { headers });
      if (langRes.ok) {
        const repoLangs = await langRes.json();
        for (const [lang, bytes] of Object.entries(repoLangs)) {
          languageMap[lang] = (languageMap[lang] || 0) + bytes;
        }
      }
    }

    // 4. Calculate Percentages
    const totalBytes = Object.values(languageMap).reduce((a, b) => a + b, 0);
    const languages = Object.entries(languageMap)
      .map(([name, bytes]) => ({
        name,
        percent: Math.round((bytes / totalBytes) * 100),
        color: getLanguageColor(name)
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 6); // Top 6 languages

    const stats = {
      stars: totalStars,
      repos: userData.public_repos,
      followers: userData.followers,
      languages
    };

    // 5. Write to File
    const dataPath = path.join(__dirname, '../src/data/github-stats.json');
    fs.writeFileSync(dataPath, JSON.stringify(stats, null, 2));
    console.log('Successfully updated github-stats.json');

  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    process.exit(1);
  }
}

function getLanguageColor(lang) {
  const colors = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'C++': '#f34b7d',
    'C': '#555555',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Python': '#3572A5',
    'Rust': '#dea584',
    'Go': '#00ADD8',
    'C#': '#178600',
    'ShaderLab': '#222c37',
    'CMake': '#DA3434',
    'HLSL': '#a855f7'
  };
  return colors[lang] || '#8b8b8b';
}

fetchStats();