const buttons=Array.from(document.querySelectorAll(".dropdown-button"));for(button of buttons){toggleDataShow(button)}function toggleDataShow(o){o.addEventListener("click",(function(o){o.preventDefault();let t=this.nextElementSibling;if(t.classList.contains("data-show"))t.classList.remove("data-show");else{let o=document.getElementsByClassName("dropdown");for(dropdown of o)dropdown.classList.contains("data-show")&&dropdown.classList.remove("data-show");t.classList.add("data-show")}}))}window.onclick=function(o){if(!o.target.matches(".dropdown-button")){let o=document.getElementsByClassName("dropdown");for(dropdown of o)dropdown.classList.contains("data-show")&&dropdown.classList.remove("data-show")}};
const editButtons=Array.from(document.querySelectorAll("[edit-button]"));for(editButton of editButtons)editButton.addEventListener("click",(function(t){t.preventDefault(),id=this.closest("[instructor-id]").id,window.location.href=`/instructor/${id}/edit`}));
let deleteButtons=Array.from(document.querySelectorAll("[delete-button]")),modalCancelButton=document.querySelector("[modal-cancel-button]");for(deleteButton of(modalCancelButton.addEventListener("click",(function(e){e.preventDefault(),toggleModal()})),deleteButtons))deleteButton.addEventListener("click",(function(e){e.preventDefault(),toggleModal()}));function toggleModal(){document.querySelector(".modal-wrapper").classList.toggle("show")}