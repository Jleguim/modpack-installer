var fs = require('fs')

module.exports = {
    modpack_name: '1.8.9 PvP Mods',
    profile_dir: 'pvp-mods',

    repo: 'https://github.com/Jleguim/modpack-installer/',
    branch: 'mods',
    name: 'modpack-installer',

    image: 'data:image/png;base64,' + fs.readFileSync('./public/img/image.png', 'base64'),
    forgeVersion: '1.8.9-forge1.8.9-11.15.1.2318-1.8.9',
    javaArgs: '-Xmx4G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M'
}