import { getData } from "./api";
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
                                <span class="mb-2 d-block text-secondary">${item.categoryName}</span>
                                <h6 class="card-title mb-3">${item.name}</h6>
                                <div class="row">
                                    <div class="col d-flex align-itemns-center justify-content-between">
                                        <h4>${item.price} ₽</h4>
                                        <button type="button" class="btn btn-outline-dark">
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