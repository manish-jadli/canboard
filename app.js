
let addBtn=document.querySelector(".add-btn");
let removeBtn=document.querySelector(".remove-btn");
let textAreaCont=document.querySelector(".textArea-cont");
let allPriorityColors=document.querySelectorAll(".priority-color");
let mainContainer=document.querySelector(".main-container");
let toolboxColors=document.querySelectorAll('.color');
let addTaskFlag=false;
let removeTaskFlag=false;
let modalCont=document.querySelector(".modal-section");
let lockClass="fa fa-lock";
let unlockClass="fa fa-lock-open";
let colors=["lieghtpink","lightgreen","lightblue","black"];
let modalPriorityColor=colors[colors.length - 1];
let ticketArray=[];


if(localStorage.getItem('tickets')){
    ticketArray=JSON.parse(localStorage.getItem('tickets'));
    ticketArray.forEach(function(ticket){
        createTicket(ticket.ticketColor,ticket.ticketTask,ticket.ticketId);
    })
}

//find the elements from the array which have selected color
//remove all the cards from the screen
//render only the cards which are black on the screen

for (let i=0; i <toolboxColors.length; i++){
    toolboxColors[i].addEventListener("click", function(){
        let selectedToolBoxColor=toolboxColors[i].classList[0];
        let filteredTicket=ticketArray.filter(function(ticket){
            return selectedToolBoxColor===ticket.ticketColor;
        })
        let allTickets=document.querySelectorAll(".ticket-cont");
        for (let i=0;i<allTickets.length;i++){
            allTickets[i].remove();
        }
        filteredTicket.forEach(function(filteredTicket){
            createTicket(filteredTicket.ticketColor,filteredTicket.ticketTask,filteredTicket.ticketId);
        })
    })

    toolboxColors[i].addEventListener("dblclick", function(){
        let allTickets=document.querySelectorAll(".ticket-cont");
        for (let i=0;i<allTickets.length;i++){
            allTickets[i].remove();
        }
        ticketArray.forEach(function(ticketObj){
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketId);
        })
    })
}

    

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
function createTicket(ticketColor, ticketTask, ticketId){
    let id=ticketId || shortid();
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
    handleColor(ticketCont, id);
    handleLock(ticketCont, id);
    handleRemove(ticketCont, id);
    if(!ticketId){
        ticketArray.push({ticketColor,ticketTask,ticketId:id});
        localStorage.setItem('tickets', JSON.stringify(ticketArray));
    }
    console.log('ticketArray -', ticketArray);
};

function handleLock(ticket,id){
    let ticketLockElem=ticket.querySelector(".ticket-lock");
    let ticketLockIcon=ticketLockElem.children[0];
    let ticketTaskArea=ticket.querySelector(".task-area");

    ticketLockIcon.addEventListener("click",function(){
        let ticketIdx=getTicketIds(id);
        if(ticketLockIcon.classList.contains(lockClass)){
            ticketLockIcon.classList.add(unlockClass);
            ticketLockIcon.classList.remove(lockClass);
            ticketTaskArea.setAttribute('contenteditable',true);
        }else{
            ticketLockIcon.classList.add(lockClass);
            ticketLockIcon.classList.remove(unlockClass);
            ticketTaskArea.setAttribute('contenteditable',false);
        }
        ticketArray[ticketIdx].ticketTask=ticketTaskArea.innerText;
        localStorage.setItem('tickets', JSON.stringify(ticketArray));
    })

};

function handleColor(){

};

function handleRemove(ticket, id){
    ticket.addEventListener("click",function(){
        if(!removeTaskFlag) return;
        ticket.remove();
        getTicketIds(id);
        localStorage.setItem('tickets', JSON.stringify(ticketArray));
    })
};

function getTicketIds(id){
    let ticketId=ticketArray.filter(function(ticketObj){
        return ticketObj.ticketId===id;
    })
    return ticketId[0];
}

