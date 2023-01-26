import { openModal, closeModal } from "./modal";
import { getData } from "./api";

export const cartFunc = function () {

    const container = document.getElementById("cart-container")
    const cardModal = document.getElementById("cart-modal");
    const openCartBtn = document.getElementById("open-cart-btn");
    const closeBtns = cardModal.querySelectorAll(".close-btn");


    const render = function (data) {

        container.innerHTML="";
        data.forEach(function (item) {
            container.insertAdjacentHTML('beforeend', `
                        <div class="row border-bottom pb-3 pt-3">
                            <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                                ${item.name}
                            </div>
                            <div class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                                <h4 class="me-3 d-flex align-itemns-center">${item.price * item.count} ₽</h4>
                                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                    id="control-dec">
                                    -
                                </button>
                                <h6 class="cart-item-count me-3 ms-3">${item.count}</h6>
                                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                    id="control-inc">
                                    +
                                </button>
                            </div>
                        </div>
            
            `)
        });
    }


    openCartBtn.addEventListener("click", function () {
        
        getData("/cart")

            .then(function (data) {
                render(data)
                openModal(cardModal);
            })
            .catch(function (error) {
                // console.error("Произошла Ошибка")
            })

    });


    closeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            closeModal(cardModal);
        });
    });
}