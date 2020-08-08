const clear = document.querySelector(".clear"); 
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";
const add = document.querySelector(".fa-plus-circle");

let data = localStorage.getItem("TODO");

let today = new Date();
let options = {weekday:"long", month:"short", day:"numeric"}

let LIST = [];
let id = 0;

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

/* <------------'Enter' Key Event Listner------------> */

document.addEventListener("keyup", function(event){
    if(event.keyCode==13){
    const todo = input.value;
    if(todo){
        addTodo(todo, id, false, false);
        LIST.push(
            {
                name: todo, 
                id: id,
                done: false,
                trash: false
            }
        )
    }
    input.value = "";
    id++;
    }
});

add.addEventListener("click", function(){
    const todo = input.value;
    if(todo){
        addTodo(todo, id, false, false);
        LIST.push(
            {
                name: todo, 
                id: id,
                done: false,
                trash: false
            }
        )
    }
    input.value = "";
    id++;
});

if(data){
    LIST=JSON.parse(data);
    LoadToDo(LIST);
    id=LIST.length;
}
else {
    LIST:[];
    id:0;
}

function LoadToDo(array){
    array.forEach(function(item){
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

function addTodo(toDo, id, done, trash){
    if(trash){
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    /* const s_r = done ? "s" : "r"; */
    const LINE = done ? LINE_THROUGH : "";

    const text =`<li class="item">
                    <i class="far ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="far fa-trash de" job="delete" id="${id}"></i>
                </li>`
    const position = "beforeend";            
    list.insertAdjacentHTML(position,text);
}

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    console.log("toggle");
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done=LIST[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

list.addEventListener("click", function(event){
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;
    if(elementJOB=="complete"){
        completeToDo(element);
    }
    else if(elementJOB=="delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
