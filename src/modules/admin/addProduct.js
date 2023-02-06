import { postData, getData, deleteData } from "../api"
export const addProduct = function () {

    const titleInp = document.getElementById("product-title")
    const priceInp = document.getElementById("product-price")
    const nameInp = document.getElementById("product-name")
    const previewInp = document.getElementById("product-image")
    const saveBtn = document.getElementById("product-add-btn")
    const container = document.getElementById("product-table")
    const select = document.getElementById("product-category")
    // console.log('addProduct')


    const productData = {
        title: "",
        name: "",
        price: 0,
        preview: "",
        category: 0
    }

    const render = function (data) {
        container.innerHTML = " ";
        data.forEach(function (item, index) {
            container.insertAdjacentHTML("beforeend", `
            <tr>
                                        <th scope="row">${index + 1}</th>
                                        <td>${item.title}</td>
                                        <td>${item.name}</td>
                                        <td>${item.price} ₽</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-outline-danger btn-sm" data-product= "${item.id}">
                                                удалить
                                            </button>
                                        </td>
                                    </tr>
            ` )
         });


        console.log (data)

    }

    const checkValues = function () {
        if (nameInp.value === "" ||
            previewInp.value === "" ||
            Number(priceInp.value) === 0 ||
            titleInp.value === "" ||
            select.value === "default"
        ) {
            saveBtn.disabled = true
        }
        else {
            saveBtn.disabled = false
        }

    }

    select.addEventListener('change', function () {
        
        productData.category = select.value
        const url  =  select.value !== "default" ? `/products?category=${select.value}` : `/products`
        console.log(select.value)
        getData(url).then(function (data) {

            render(data)
            // console.log(data)
        })


        checkValues()

    })


    titleInp.addEventListener("input", function () {

        productData.title = titleInp.value
        checkValues()
    })

    nameInp.addEventListener("input", function () {

        productData.name = nameInp.value
        checkValues()
    })

    priceInp.addEventListener("input", function () {

        productData.price = Number(priceInp.value)
        checkValues()
    })



    previewInp.addEventListener("input", function () {



        const file = previewInp.files[0]
        // console.log(file)

        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {

            const reader = new FileReader()

            //         //Короткая запись onload и onerror
            reader.onload = function () {
                return productData.preview = reader.result
            }
            reader.onerror = function () {

                return productData.preview = "",
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

    const updateTable = function () {

        getData("/products").then(function (data) {

            render(data)
            // console.log(data)
        })

    }

    saveBtn.addEventListener("click", function () {
        console.log(productData)
        postData('/products', {
            method: "POST",
            body: JSON.stringify(productData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function () {
            nameInp.value = ""
            titleInp.value = ""
            priceInp.value = ""
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
            const id = event.target.dataset.product
            // console.log(id)

            deleteData(`/products/${id}`).then(function (data) {
                updateTable()
            })

        }
    })

    //Amazfit GTS 4 mini (черный)
    //Xiaomi Redmi A1+ 2/32GB (голубой)
    //Red Line Ultimate для Xiaomi Redmi 9C (оранжевый)

    updateTable()
    checkValues()

}