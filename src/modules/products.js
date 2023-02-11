import { getData, postData } from "./api";
export const productsFunc = function () {

    const container = document.getElementById('products-container')

    const render = function (data) {
        data.forEach(function (item) {
            // console.log(item)
            container.insertAdjacentHTML('beforeend', `
            
                <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                    <a href="#" class="card-link">
                        <div class="card">
                            <img src="${item.preview}" class="card-img-top" alt="phone-1">
                            <div class="card-body">
                                <span class="mb-2 d-block text-secondary">${item.title}</span>
                                <h6 class="card-title mb-3">${item.name}</h6>
                                <div class="row">
                                    <div class="col d-flex align-itemns-center justify-content-between">
                                        <h4>${item.price} ₽</h4>
                                        <button type="button" class="btn btn-outline-dark" data-product = "${item.id}" >
                                            <img src="/images/icon/shopping-cart-big.svg" alt="login">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            
            
            `)
        });
    }
    container.addEventListener("click", function (event) {
        if (event.target.closest("button")) {
            const id = event.target.closest("button").dataset.product
            console.log("Ид товара: " + id)
            // const url = `/products/${id}`
            getData(`/products/${id}`)

                .then(function (product) {
                    postData('/cart', {
                        name: product.name,
                        price: product.price,
                        count: 1
                    }).then(function () {
                        
                    })
                })
                .catch(function (error) {
                    console.error("Произошла Ошибка")
                })
        }

    })

    const init = function () {

        const params = window.location.search
        const urlSearchParams = new URLSearchParams(params)
        const id = urlSearchParams.get('id')
        const url = id ? `/products?category=${id}` : `/products`
        // console.log(window.location.search)
        console.log(urlSearchParams.get('id'))

        getData(url)

            .then(function (data) {
                render(data)
            })
            .catch(function (error) {
                // console.error("Произошла Ошибка")
            })
    }
    init();

}