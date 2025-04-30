
let addBtn=document.querySelector(".add-btn");
let removeBtn=document.querySelector(".remove-btn");
let allPriorityColors=document.querySelectorAll(".priority-color");
let mainContainer=document.querySelector(".main-container");
let addTaskFlag=false;
let removeTaskFlag=false;
let modalCont=document.querySelector(".modal-section");
let textAreaCont=document.querySelector(".textArea-cont");
let colors=["lieghtpink","lightgreen","lightblue","black"];
let modalPriorityColor=colors[colors.length - 1];
let ticketArray=[];


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
        modalPriorityColor=colorElem.classList[0];
    })
})


//keypressdown event
modalCont.addEventListener("keydown",function(e){
        let key=e.key;
        console.log(key);
        if(key ==="Enter"){
            createTicket(modalPriorityColor,textAreaCont.value);
            modalCont.style.display="none";
            textAreaCont.value="";
}
})


//create ticker code
function createTicket(ticketColor, ticketTask){
    let id=shortid();
    let ticketCont=document.createElement('div');
    ticketCont.setAttribute('class','ticket-cont');
    ticketCont.innerHTML=`
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>
    `;
    mainContainer.appendChild(ticketCont);
    handleColor();
    handleLock();
    handleRemove(ticketCont, id);
    ticketArray.push({ticketColor,ticketTask,ticketId:id});
    console.log('ticketArray -', ticketArray);
};

function handleLock(){

};

function handleColor(){

};

function handleRemove(ticket, id){
    ticket.addEventListener("click",function(){
        if(!removeTaskFlag) return;
        ticket.remove();
        getTicketIds(id);
    })
};

function getTicketIds(id){
    let ticketId=ticketArray.filter(function(ticketObj){
        return ticketObj.ticketId===id;
    })
    return ticketId[0];
}

