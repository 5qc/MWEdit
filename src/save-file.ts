const saveFile = document.getElementById("w-save-file")

saveFile.onclick = () => {
    hideAllWindows()
    const file = fileName.value ? fileName.value : i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["New File"]

    const a = document.createElement("a")
    a.href = `data:text/txt;base64,${btoa((<HTMLInputElement>document.getElementById("content")).value)}`
    a.setAttribute("download", `${file}.mediawiki`)
    a.click()
}