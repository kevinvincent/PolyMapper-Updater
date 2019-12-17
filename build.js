const fs = require('fs');

let info = JSON.parse(fs.readFileSync('info.json'))
let manifest = JSON.parse(fs.readFileSync('manifest.json'))

let quarterName = info.quarterName
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

fs.writeFileSync("./source/dataset/manifest.json", JSON.stringify(manifest))

fs.copyFileSync("rooms.db",`./source/dataset/rooms.db`)





