const simpleGit = require('simple-git/promise')
const fs = require('fs');
const querystring = require('querystring');

const git = simpleGit();

const USER = process.env.GITHUB_USER;
const PASS = querystring.escape(process.env.GITHUB_PASSWORD);
const REPO = 'github.com/kevinvincent/Cal-Poly-Class-Locator.git';
const remote = `https://${USER}:${PASS}@${REPO}`;

(async () => {

   await git.clone(remote, "./source")
   fs.copyFileSync("./source/dataset/rooms.db","./rooms.db")
   fs.copyFileSync("./source/dataset/manifest.json","./manifest.json")

})();