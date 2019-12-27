const fs = require('fs');

let info = JSON.parse(fs.readFileSync('info.json'))
let manifest = JSON.parse(fs.readFileSync('manifest.json'))

let quarterName = info.quarterName.replace("Quarter ","")
let quarterDir = quarterName.replace(/\s/g,'').toLowerCase();

fs.copyFileSync("classrooms.json","./source/dataset/classrooms.json")
fs.copyFileSync("buildings.json","./source/dataset/buildings.json")

fs.mkdirSync(`./source/dataset/${quarterDir}`, {recursive : true})

fs.copyFileSync("sections.json",`./source/dataset/${quarterDir}/sections.json`)

manifest = manifest.filter(item => item.dir !== quarterDir)

manifest.push({
   "name" : quarterName,
   "dir" : quarterDir,
   "updated" : Date.now()
})

let manifestStr = JSON.stringify(manifest)
fs.writeFileSync("./source/dataset/manifest.json", manifestStr)
fs.writeFileSync("./source/js/manifest.js", `var manifest = ${manifestStr}`)

fs.copyFileSync("rooms.db",`./source/dataset/rooms.db`)





