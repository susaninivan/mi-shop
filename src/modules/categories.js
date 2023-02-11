import { getData } from "./api";
export const categoriesFunc = function () {
    // fetch("http://localhost:3001/categories").then ( 
    //     function(response) {
    //         return response.json()
    //     }
    // )
    // .then(function(data) {
    //     return console.log(data)
    // } )
    const container = document.getElementById('categories-container')

    const catalogSearch = document.querySelector('.catalog-search')

    const render = function (data) {

        container.innerHTML = ''
        data.forEach(function (item) {
            container.insertAdjacentHTML('beforeend', `
                        <div class="col col-12 col-md-6 col-lg-4 mb-3">
                            <a href="/catalog.html?id=${item.id}" class="card-link">
                                <div class="card">
                                    <img src="${item.preview}" class="card-img-top" alt="phones">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>
            
            
            `)
        });
    }
    catalogSearch.addEventListener("input" , function(event) {
        console.log(event.target.value)
        getData(`/categories?q=${event.target.value}`)

        .then(function (data) {
            render(data)
        })
        .catch(function (error) {
            // console.error("Произошла Ошибка")
        })
    })



    getData("/categories")

        .then(function (data) {
            render(data)
        })
        .catch(function (error) {
            // console.error("Произошла Ошибка")
        })

}