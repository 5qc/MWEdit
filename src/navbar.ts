const navbarNewFile = document.getElementById("new-file")
navbarNewFile.onclick = () => {
    hideAllWindows()
    const file = (<HTMLInputElement>document.getElementById("file-name"))
    const givenContent = (<HTMLInputElement>document.getElementById("content")).value
    if (localStorage.getItem(`MWEdit-mih7sf5eep.file_${file}`)) {
        const content = localStorage.getItem(`MWEdit-mih7sf5eep.file_${file}`)
        if (content !== givenContent) document.getElementById("window__new-file").style.display = "block"
        else newFile
    } else {
        if (givenContent !== "") document.getElementById("window__new-file").style.display = "block"
        else newFile
    }
}

const navbarSaveFile = document.getElementById("save-file")
navbarSaveFile.onclick = () => {
    hideAllWindows()
    document.getElementById("window__save-file").style.display = "block"
}

const navbarOpenFile = document.getElementById("open-file")
navbarOpenFile.onclick = () => {
    hideAllWindows()
    document.getElementById("window__open-file").style.display = "block"
}

const navbarReset = document.getElementById("reset-storage")
navbarReset.onclick = () => {
    hideAllWindows()
    document.getElementById("window__reset").style.display = "block"
}