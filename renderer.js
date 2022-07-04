function log(toLog, logged = true) {
    logged ? txt = `<p>${toLog}</p>` : txt = toLog
    
    var div = logged ? document.querySelector("#logged") : document.querySelector("#title")
    div.innerHTML = txt
}

function changeLoadingIcon() {
    var icon = document.querySelector("i#loading");

    icon.classList.remove("fa-slash");
    icon.classList.remove("fa-spin-pulse");
    icon.classList.add("fa-check");
}

function state(state) {
    var span = document.querySelector("span#state");
    span.innerHTML = state;
}

async function updateMods() {
    try {
        log('<h4>Chimbaland detectado, se actualizarán los mods.</h4>', false)

        state('Iniciando 0/3')
        log('Descargando mods')
        await window.chimbaland.downloadMods()
        state('Descargado 1/3')

        log('Eliminando mods antiguos')
        await window.chimbaland.deleteModFolder()
        state('Mods antiguos eliminados 2/3')
        log('Copiando archivos')
        await window.chimbaland.unzipMods()
        state('Copiado 3/3')

        log('Instalado')
        log('<h1>Ciérrame 😭</h1>', false)
        changeLoadingIcon()
    } catch (error) {
        console.log(error)
    }
}

async function installModPack() {
    try {
        log('<h4>Instalando Chimbaland</h4>', false)
        
        state('Iniciando 0/3')
        log('Descargando mods')
        await window.chimbaland.downloadMods()
        state('Descargado 1/3')

        log('Copiando archivos')
        await window.chimbaland.unzipMods()
        state('Copiado 2/3')

        log('Creando perfil en Launcher')
        await window.chimbaland.createProfile()
        state('Perfil creado 3/3')

        log('Instalado')
        log('<h1>Ciérrame 😭</h1>', false)
        changeLoadingIcon()
    } catch (error) {
        console.log(error)
    }
}

async function loadFooter(){
    var footer = document.querySelector("footer");
    var ver = await window.chimbaland.getVersion();
    
    footer.innerHTML = `<span id="state">Chimbaland Installer v${ver}</span><span><i id="loading" class="fa-solid fa-slash fa-spin-pulse" style="--fa-animation-duration: 0.5s;"></i></span>`
}

async function run() {
    await loadFooter();
    var exists = await window.chimbaland.checkInstalled()
    if (!exists) await installModPack()
    else await updateMods()
}

run()