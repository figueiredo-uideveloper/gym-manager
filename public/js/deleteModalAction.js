const deleteButtons=Array.from(document.querySelectorAll("[delete-button]")),modalCancelButton=document.querySelector("[modal-cancel-button]"),modalWrapper=document.querySelector(".modal-wrapper"),inputDeleteID=document.querySelector("#inputDeleteID");for(deleteButton of(modalCancelButton.addEventListener("click",(function(e){e.preventDefault(),inputDeleteID.value="",toggleModal()})),deleteButtons))deleteButton.addEventListener("click",(function(e){e.preventDefault(),id=this.closest("[instructor-id]").id,inputDeleteID.value=id,toggleModal()}));function toggleModal(){modalWrapper.classList.toggle("show")}