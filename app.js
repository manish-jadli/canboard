console.log('hiii');

let addBtn=document.querySelector(".add-btn");
let removeBtn=document.querySelector(".remove-btn");
let allPriorityColors=document.querySelectorAll(".priority-color");
let addTaskFlag=false;
let removeTaskFlag=false;
let modalCont=document.querySelector(".modal-section");
let textAreaCont=document.querySelector(".textArea-cont");


//add modal code
addBtn.addEventListener("click",function(){

    addTaskFlag= !addTaskFlag;

    if(addTaskFlag){
        modalCont.style.display="flex";
    }else{
        modalCont.style.display="none";
    }

})
//end

//remove click code
removeBtn.addEventListener("click",function(){

    removeTaskFlag= !removeTaskFlag;

    if(removeTaskFlag){
        alert("Remove button activated");
        removeBtn.style.color="red";
    }else{
        removeBtn.style.color="white";
    }

})
//end


allPriorityColors.forEach(function(colorElem){
    colorElem.addEventListener("click",function(){
        allPriorityColors.forEach(function(priorityColorElem){
            priorityColorElem.classList.remove("active");
        })
        colorElem.classList.add("active");
    })
})


//keypressdown event
modalCont.addEventListener("keydown",function(e){
        let key=e.key;
        console.log(key);
        if(key ==="Enter"){
            modalCont.style.display="none";
            textAreaCont.value="";
}
})


//create ticker code
function createTicket(){
    let id=shortid();
    let ticketCont=document.createElement('div');
    ticketCont.setAttribute('class','ticket-cont');
    ticketCont.innerHTML=`
    <div class="ticket-color"></div>
    <div class="ticket-id"></div>
    <div class="task-area"></div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>
    `;
};




