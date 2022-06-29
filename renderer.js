document.body.innerHTML += 'Descargando ModPack <br>'
window.chimbaland.downloadMods()
    .then(() => {
        document.body.innerHTML += 'Descargado 1/3 <br>'
        document.body.innerHTML += 'Moviendo a carpeta mods <br>'
        window.chimbaland.copyMods()
            .then(() => {
                document.body.innerHTML += 'Copiado 2/3 <br>'
                document.body.innerHTML += 'Creando perfil en el Launcher <br>'
                window.chimbaland.createProfile()
                .then(() => {
                    document.body.innerHTML += 'Creado 3/3 ✔️<br>'
                    document.body.innerHTML += '<br><br><h1>Cierrame 😭</h1>'
                })
            })
    })