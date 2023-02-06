// import { container } from "webpack"
import { postData, getData, deleteData } from "../api"

export const addCategory = function () {

    const nameInp = document.getElementById("category-name")
    const previewInp = document.getElementById("category-image")
    const saveBtn = document.getElementById("category-add-btn")
    const container = document.getElementById("category-container")
    const select = document.getElementById("product-category")


    const categoryData = {
        name: '',
        preview: ''
    }

    const render = function (data) {
        container.innerHTML = " ";
        data.forEach(function (item, index) {
            container.insertAdjacentHTML("beforeend", `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${item.name}</td>
                <td class="text-end">
                    <button type="button" class="btn btn-outline-danger btn-sm" data-category= "${item.id}">
                        удалить
                    </button>
                </td>
            </tr>
            ` )
        select.insertAdjacentHTML ("beforeend", `

                           
                                <option value="${item.id}">${item.name}</option>
       
        
        `) 

        });

    }




    const checkValues = function () {
        if (nameInp.value === "" || previewInp.value === "") {
            saveBtn.disabled = true
        }
        else {
            saveBtn.disabled = false
        }

    }



    const updateTable = function () {
        
        getData("/categories").then(function(data) {
            
            render(data)
            // console.log(data)
        })

    }


    nameInp.addEventListener("input", function () {

        categoryData.name = nameInp.value
        checkValues()
    })




    previewInp.addEventListener("input", function () {



        const file = previewInp.files[0]
        // console.log(file)

        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {

            const reader = new FileReader()

            //         //Короткая запись onload и onerror
            reader.onload = function () {
                return categoryData.preview = reader.result
            }
            reader.onerror = function () {

                return categoryData.preview = "",
                    previewInp.value = ""
            }
            // Расширенная запись onload и onerror

            // reader.addEventListener("load", function () {
            //     categoryData.preview = reader.result
            //     // console.log(reader.result)
            // })

            // reader.addEventListener("error", function () {
            //     categoryData.preview = ""
            //     previewInp.value = ""

            // })


            reader.readAsDataURL(file)
        }
        else {
            // console.log('not ok')
            previewInp.value = ""
        }

        checkValues()
    })

    saveBtn.addEventListener("click", function () {

        postData('/categories', {
            method: "POST",
            body: JSON.stringify(categoryData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function () {
            nameInp.value = "",
            previewInp.value = ""
            // getData("/categories").then(function (data) {
            //     console.log(data)
            updateTable()
        })
    })

    container.addEventListener("click", function (event) {
        // console.dir(event.target) 
        if (event.target.tagName === "BUTTON") {
            // console.log(event.target)
            // event.target.innerHTML = "Изменить"
            const id = event.target.dataset.category
            // console.log(id)

            deleteData(`/categories/${id}`).then(function (data) {
                updateTable()
            })

        }
    })
    updateTable()
    checkValues()

}

