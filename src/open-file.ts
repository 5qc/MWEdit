const openFile = document.getElementById("window__open-file")
const openFileStorage = document.getElementById("window__open-file-storage")
const openLocally = document.getElementById("open-locally")

openLocally.onclick = () => {
    openFile.style.display = "none"
    openFileStorage.style.display = "block"
}

for (let i = 0; i < Object.keys(localStorage).length; i++) {
    const item = Object.keys(localStorage)[i]
    if (item.startsWith("MWEdit-mih7sf5eep.file_")) {
        const fileName = item.replace("MWEdit-mih7sf5eep.file_", "")
        openFileStorage.querySelector(".window-content").innerHTML += `<span class="file link" open-file="${fileName}">${fileName}</span><br />`

        const a = <HTMLElement>document.querySelector(`[open-file="${fileName}"]`)
        a.onclick = () => {
            (<HTMLInputElement>document.getElementById("file-name")).value = fileName;
            (<HTMLInputElement>document.getElementById("content")).value = `${localStorage.getItem(item)}`
            document.querySelector(".preview").innerHTML = convert((<HTMLInputElement>document.getElementById("content")).value)
            openFileStorage.style.display = "none"
        }
    }
}