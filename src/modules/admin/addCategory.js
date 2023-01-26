export const addCategory = function () {

    const nameInp = document.getElementById("category-name")
    const previewInp = document.getElementById("category-image")
    const saveBtn = document.getElementById("category-add-btn")

    const categoryData = {
        name: '',
        preview: ''
    }

    const checksValues = function () {
        if (nameInp.value === "" || previewInp.value === "") {
            saveBtn.disabled = true
        }
        else {
            saveBtn.disabled = false
        }

    }
nameInp.addEventListener("input", function() {

    categoryData.name = nameInp.value
    checksValues()
})

previewInp.addEventListener("input", function() {
    const file = previewInp.files[0]
    console.log(file)

if (file.type === "image/png" || file.type ==="image/jpeg" || file.type ==="image/jpg") {
console.log("ok")
}
else {
console.log('not ok')
}

    checksValues()
})
    checksValues()
}