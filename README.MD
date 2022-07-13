# modpack-installer
Originally a side-project for a friend's Minecraft Modded SMP ([chimba-installer](https://github.com/Jleguim/chimba-installer)). Decided it could help a couple of people.

---
### Building
Install dependencies and then build using the NPM script `build`

    npm install --save
    npm run build

### Setting it up

#### Main branch
This is where the installer's code lies, the only stuff you need to change is:
- Your ModPack's images, that is, `image.png` and `icon.ico`
- The installer's configuration, later explained.

#### Mods branch
Here is where, you guessed it, your mods lie. You can put here anything that's shared e.g. mod configs, texture packs, basically everything that can be in your Minecraft's profile folder.
- Just push some commits with the mods you intend in using and stuff.

#### Config.js
`modpack_name` Used for titles and such.

`profile_dir` The name of the folder your profile is going to be in.

`repo` The link to the repo you cloned into.

`branch` If you're following these steps, leave it as is.

`name` Name of the repo you cloned into.

`image` Leave as is.

`forgeVersion` The version of Forge you intend in using.

`javaArgs` The default java arguments for the profile.
