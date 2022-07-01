function log(toLog, br = true) {
    txt = toLog
    if (br) txt += ' <br>'
    document.body.innerHTML += txt
}

async function updateMods() {
    try {
        log('<h4>Instalación de Chimbaland detectada, se actualizarán los mods.</h4>', false)
        log('Descargando mods')
        await window.chimbaland.downloadMods()
        log('Descargado 1/2')
        log('Copiando archivos')
        await window.chimbaland.copyMods()
        log('Copiado 2/2')
        log('<h1>Ciérrame 😭</h1>', false)
    } catch (error) {
        console.log(error)
    }
}

async function installModPack() {
    try {
        log('<h4>Instalando Chimbaland</h4>', false)
        log('Descargando mods')
        await window.chimbaland.downloadMods()
        log('Descargado 1/3')
        log('Copiando archivos')
        await window.chimbaland.copyMods()
        log('Copiado 2/3')
        log('Creando perfil en Launcher')
        await window.chimbaland.createProfile()
        log('Creado 3/3')
        log('<h1>Ciérrame 😭</h1>', false)
    } catch (error) {
        console.log(error)
    }
}

window.chimbaland.checkInstalled()
    .then((exists) => {
        if (!exists) installModPack()
        else updateMods()
    })