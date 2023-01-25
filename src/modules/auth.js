import { openModal, closeModal } from "./modal";
import { getData } from "./api";

export const authFunc = function () {
  const auchBtn = document.getElementById("open-auth-btn");

  const modal = document.getElementById("auth-modal");

  const closeBtns = modal.querySelectorAll(".close-btn");

  const loginBtn = document.querySelector(".login-btn");

  const logoutBtn = document.getElementById("logout-btn");

  const openCartBtn = document.getElementById("open-cart-btn");

  const cardModal = document.getElementById("cart-modal");

  const login = function () {
    //auchBtn.style.display = "none"
    auchBtn.classList.add("d-none");

    logoutBtn.classList.remove("d-none");
    openCartBtn.classList.remove("d-none");

    // loginBtn.style.display = "block"
    // cartBtn.style.display = "block"
    closeModal(modal);
  };

  const logout = function () {
    auchBtn.classList.remove("d-none");

    logoutBtn.classList.add("d-none");
    openCartBtn.classList.add("d-none");
  };

  const checkAuth = function () {
    const user = JSON.parse(localStorage.getItem("auth"))

    if (user) {

      getData('/profile').then(function (data) {
        // console.log(data)
        if ((data.login && data.login === user.login) && (data.password && data.password === user.password)) {
          // console.log('Успех')
          // localStorage.setItem("auth", JSON.stringify(data))
          login();
        }
        else {
          alert('Ви ввели не верние данние')
        }
      })

    }
    else {

    }

    // if (JSON.parse(localStorage.getItem("auth"))) {
    //   login();
    // }
  };

  //   const openModal = function () {
  //     // console.dir(modal)

  //     modal.classList.add("d-block");
  //     //  modal.style.display = "block"

  //     setTimeout(function () {
  //       modal.classList.add("show");
  //     }, 500);
  //   };

  //   const closeModal = function () {
  //     modal.classList.remove("show");

  //     setTimeout(function () {
  //       modal.classList.remove("d-block");
  //     }, 1000);

  //     // modal.style.display = "none"
  //     modal.classList.remove("d-block");
  //   };

  auchBtn.addEventListener("click", function () {
    openModal(modal);
  });

  //   // равносильно
  //   auchBtn.addEventListener("click", openModal);

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeModal(modal);
    });
  });
  //вар-т 2 перебора
  // for (let i = 0; i < closeBtns.length; i++ ) {
  //     console.log(closeBtns[i])

  // }

  loginBtn.addEventListener("click", function () {
    const loginInput = modal.querySelector("#login-control");
    const passwordInput = modal.querySelector("#password-control");

    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    };

    getData('/profile').then(function (data) {
      // console.log(data)
      if ((data.login && data.login === user.login) && (data.password && data.password === user.password)) {
        // console.log('Успех')
        localStorage.setItem("auth", JSON.stringify(data))
        login();
      }
      else {
        alert('Ви ввели не верние данние')
      }
    })

    // localStorage.setItem("auth", JSON.stringify(user));

  
  });

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("auth");
    logout();
  });

  

  checkAuth();
};
