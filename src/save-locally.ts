const saveLocally = document.getElementById("save-locally")

saveLocally.onclick = () => {
    hideAllWindows()
    const file = fileName.value ? fileName.value : i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["New File"]
    if (localStorage.getItem(`MWEdit-mih7sf5eep.file_${file}`)) {
        document.getElementById("window__save-file").style.display = "none"
        document.getElementById("window__warning").style.display = "block"
        setWarning(`${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["{file} already exists locally."].replace("{file}", file)}<br />
        ${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["Do you want to overwrite this file?"]}
        <div class="button-container" style="padding-top: 5px;">
            <button id="overwrite-yes">${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["Yes"]}</button>
            <button id="overwrite-no">${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["No"]}</button>
        </div>`)

        document.getElementById("overwrite-yes").onclick = () => {
            document.getElementById("window__warning").style.display = "none"
            localStorage.removeItem(`MWEdit-mih7sf5eep.file_${file}`)
            saveLocally.click()
        }
        document.getElementById("overwrite-no").onclick = () => document.getElementById("window__warning").style.display = "none"
    } else {
        displayMessage("success", i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["Successfully saved to {file}!"].replace("{file}", file))
        localStorage.setItem(`MWEdit-mih7sf5eep.file_${file}`, (<HTMLInputElement>document.getElementById("content")).value)
    }
}