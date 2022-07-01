const { app, BrowserWindow, ipcMain } = require('electron')
const clone = require('git-clone/promise')
const path = require('path')
const fs = require('fs-extra')

const repo = 'https://github.com/Jleguim/chimbamods.git'
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

    ipcMain.handle('checkInstalled', (event) => {
        return new Promise((res, rej) => {
            if (!fs.existsSync(profiles) || !fs.existsSync(chimbaland)) res(false)
            if (fs.existsSync(chimbaland + '\\mods\\')) res(true)
        })
    })

    ipcMain.handle('downloadMods', (event) => {
        if (fs.existsSync(temp)) {
            fs.rmSync(temp, { recursive: true, force: true })
        }

        return clone(repo, temp, {})
    })

    ipcMain.handle('copyMods', (event) => {
        return new Promise((res, rej) => {
            if (!fs.existsSync(profiles)) fs.mkdirSync(profiles)
            if (!fs.existsSync(chimbaland)) fs.mkdirSync(chimbaland)

            var dirs = fs.readdirSync(temp)
            for (let i = 0; i < dirs.length; i++) {
                var dir = dirs[i]
                var src = temp + dir
                var dest = chimbaland + dir

                fs.copySync(src, dest)
            }

            fs.rmSync(temp, { recursive: true, force: true })
            res()
        })
    })

    ipcMain.handle('createProfile', (event) => {
        return new Promise(async (res, rej) => {
            const profile_data = JSON.parse(fs.readFileSync(launcher_profiles))

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

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})