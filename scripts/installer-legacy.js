const path = require('path')
const fs = require('fs-extra')

const Progress = require('./progress')
const progress = new Progress()

// Asumire que forge ya esta instalado
const minecraft = path.join(process.env.APPDATA, '/.minecraft/')
const chimbastuff = path.join(__dirname, '/../chimbastuff/')
const profiles = path.join(minecraft, '/profiles/')
const chimbaperfil = path.join(minecraft, '/profiles/chimbaperfil/')
const launcher_profiles = path.join(minecraft, '/launcher_profiles.json')

if (!fs.existsSync(profiles)) fs.mkdirSync(profiles)
if (!fs.existsSync(chimbaperfil)) fs.mkdirSync(chimbaperfil)

var dirs = fs.readdirSync(chimbastuff)
progress.steps = dirs.length + 1

for (var i = 0; i < dirs.length; i++) {
    var dir = dirs[i]
    var src = path.join(chimbastuff, dir)
    var dest = path.join(chimbaperfil, dir)

    console.log(`Copiando ${progress.display()}`)
    fs.copySync(src, dest)
}

// Crear perfil en launcher
const profile_data = JSON.parse(fs.readFileSync(launcher_profiles))
profile_data.profiles.chimbaland = {
    gameDir: chimbaperfil,
    icon: 'data:image/png;base64,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',
    javaArgs: '-Xmx4G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M',
    lastUsed: "2022-06-27T05:02:27.601Z",
    lastVersionId: "1.16.5-forge-36.2.34",
    name: "Chimbaland 3",
    type: "custom"
}

console.log(`Escribiendo ${progress.display()}`)
fs.writeFileSync(launcher_profiles, JSON.stringify(profile_data, 0, 3))