const simpleGit = require('simple-git/promise')
const fs = require('fs');

const git = simpleGit("./source");

(async () => {

   await git.add("./*")
   await git.commit("Automatic Updates")
   await git.push('origin', 'master');

})();