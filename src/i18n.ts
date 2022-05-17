let i18n: String
request("../i18n.json", function() {
    if (this.readyState === 4 && this.status === 200) i18n = JSON.parse(this.responseText)
})

const i18nTags = document.querySelectorAll("i18n")
for (let i = 0; i < i18nTags.length; i++) {
    const tag = <HTMLElement>i18nTags[i]
    const text = tag.innerText
    tag.after(`${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"][text]}`)
    tag.remove() 
}
document.getElementById("file-name").setAttribute("placeholder", i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["New File"])