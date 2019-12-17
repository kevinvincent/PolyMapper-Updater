var Git = require("nodegit");
const fs = require('fs');

(async () => {

   await Git.Clone("https://github.com/kevinvincent/Cal-Poly-Class-Locator.git", "./source")
   fs.copyFileSync("./source/dataset/rooms.db","./rooms.db")
   fs.copyFileSync("./source/dataset/manifest.json","./manifest.json")

})();