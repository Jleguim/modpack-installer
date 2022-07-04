const { app, BrowserWindow, ipcMain } = require('electron')

// const clone = require('git-clone/promise')
const request = require('superagent')
const path = require('path')
const fs = require('fs-extra')
const admZip = require('adm-zip')

// const repo = 'https://github.com/Jleguim/chimbamods.git'
const repo = 'https://github.com/Jleguim/chimbamods/archive/refs/heads/main.zip'
const minecraft = process.env.APPDATA + '\\.minecraft\\'
const profiles = minecraft + '\\profiles\\'
const chimbaland = profiles + '\\chimbaland\\'
const temp = process.env.TEMP + '\\chimba-installer\\'
const launcher_profiles = minecraft + '\\launcher_profiles.json\\'

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 375,
        resizable: false,
        fullscreenable: false,
        title: "Chimbaland 3 Installer",
        icon: "./icon.ico",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.removeMenu()
    mainWindow.loadFile('index.html')
}

ipcMain.handle('checkInstalled', (event) => {
    return new Promise((res, rej) => {
        if (!fs.existsSync(profiles) || !fs.existsSync(chimbaland)) res(false)
        if (fs.existsSync(chimbaland + '\\mods\\')) res(true)
    })
})

ipcMain.handle('deleteModFolder', (event) => {
    const dest = chimbaland + '\\mods'
    return fs.rm(dest, { recursive: true, force: true })
})

ipcMain.handle('downloadMods', (event) => {
    if (!fs.existsSync(temp)) fs.mkdirSync(temp)

    const dest = temp + '\\main.zip' // %temp%/main.zip
    const stream = fs.createWriteStream(dest) // crea stream al que escribir
    const pipe = request.get(repo).pipe(stream) // descarga y escribe al stream

    return new Promise((resolve) => {
        pipe.on('finish', () => resolve())
    })
})

ipcMain.handle('unzipMods', (event) => {
    return new Promise((resolve, reject) => {
        var zipPath = temp + '\\main.zip' // %temp%/main.zip
        var zip = new admZip(zipPath) // crea zip

        var currentPath = null
        var entries = zip.getEntries()
        var regex = /.*[^\/]$/

        entries.forEach((entry, i) => {
            if (!entry.entryName.match(regex)) {
                currentPath = entry.entryName.replace('chimbamods-main/', '')
                return
            }

            zip.extractEntryTo(entry, path.join(chimbaland, currentPath), false, true)
            // console.log('Extracted ' + entry.entryName + ' to ' + path.normalize(chimbaland))

            if (i == entries.length - 1) {
                fs.rmSync(temp, { recursive: true, force: true })
                resolve()
            }
        })
    })

})

ipcMain.handle('createProfile', (event) => {
    return new Promise(async (res, rej) => {
        const profile_data = JSON.parse(fs.readFileSync(launcher_profiles))

        if (profile_data.profiles.chimbaland) return res()

        profile_data.profiles.chimbaland = {
            gameDir: path.normalize(chimbaland),
            icon: require('./image.js'),
            javaArgs: '-Xmx4G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M',
            lastUsed: "2022-06-27T05:02:27.601Z",
            lastVersionId: "1.16.5-forge-36.2.34",
            name: "Chimbaland 3",
            type: "custom"
        }

        fs.writeFileSync(launcher_profiles, JSON.stringify(profile_data, 0, 3))
        res()
    })
})

ipcMain.handle('getVersion', (event) => {
    return require("./package.json").version;
})

app.whenReady().then(() => {
    createWindow()
})