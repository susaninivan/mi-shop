import { getData, putData, patchData } from "./api";
import { openModal, closeModal } from "./modal";


export const cartFunc = function () {

    const container = document.getElementById("cart-container")
    const cardModal = document.getElementById("cart-modal");
    const openCartBtn = document.getElementById("open-cart-btn");
    const closeBtns = cardModal.querySelectorAll(".close-btn");
    const totalPrice = document.getElementById("cart-totlal-price")


    const render = function (data) {


        container.innerHTML = ""

        data.forEach(function (item) {
            container.insertAdjacentHTML('beforeend', `
                        <div class="row border-bottom pb-3 pt-3">
                            <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                                ${item.name}
                            </div>
                            <div class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                                <h4 class="me-3 d-flex align-itemns-center">${item.price} ₽</h4>
                                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                    id="control-dec" data-id="${item.id}" data-count="${item.count}">
                                    -
                                </button>
                                <h6 class="cart-item-count me-3 ms-3">${item.count}</h6>
                                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                    id="control-inc" data-id="${item.id}" data-count="${item.count}">
                                    +
                                </button>
                            </div>
                        </div>
            
            `)
        });
    }

 

    const updateCart = function () {

        getData("/cart")

            .then(function (data) {
                render(data)
                updateTotalCart(data)

            })
            .catch(function (error) {
                // console.error("Произошла Ошибка")
            })

    }

    const updateTotalCart = function (data) {
        let total = 0
        data.forEach( function (item) {
            total = ((total + Number(item.price)) * Number(item.count) )
        })

        totalPrice.textContent = total + ` ₽`
            }


    openCartBtn.addEventListener("click", function () {

        updateCart()
        openModal(cardModal)

    });


    closeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            closeModal(cardModal);
        });
    });

    container.addEventListener("click", function (event) {
        if (event.target.closest("button")) {
            if (event.target.id && event.target.id === "control-inc") {
                const id = event.target.dataset.id
                const count = Number(event.target.dataset.count)               

                const item = {

                  
                    count: count + 1,
                    
                }

                patchData(`/cart/${id}`, item)
                    .then(function () {
                        updateCart()
                    })
            } else if (event.target.id && event.target.id === "control-dec") {
                const id = event.target.dataset.id
                const count = Number(event.target.dataset.count)
             

                if (count > 0) {
                    const item = {

                        count: count - 1,
                       
                    }

                    patchData(`/cart/${id}`, item)
                        .then(function () {
                            updateCart()
                        })
                }
            }
        }

    })
}