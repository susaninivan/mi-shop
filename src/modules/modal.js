export const openModal = function (modal) {

  const layout = document.createElement("div")
  layout.classList.add('modal-backdrop')
  layout.classList.add('fade')
  document.body.append(layout)


    //   console.dir(modal);
    modal.classList.add("d-block");
  //  modal.style.display = "block"

  setTimeout(function () {
    
    layout.classList.add("show");
    modal.classList.add("show");
   
  }, 100);
};

export const closeModal = function (modal) {
  
  const layout = document.querySelector('.modal-backdrop')
  layout && layout.classList.remove('show')
  
modal.classList.remove("show");

setTimeout(function () {
    modal.classList.remove("d-block");
    layout && layout.remove()
  }, 500);

  // modal.style.display = "none"
  modal.classList.remove("d-block");
};
