import TodoList from "./ToDoClass.js";

let todoStorage = [] //stores all lists ever created during a session.
let flexColumn = 0; // keeps track on wich column the todolist should be created in. //behöver ett bättre sätt att göra detta på...


//stores and add eventlistener to createTodoBTN in header
const createTodoBtn = document.querySelector('#newTodoList-btn');
    createTodoBtn.addEventListener('click', ()=>{
        if(newTodoListInput.value.length < 1) {
            alert("ops! you didn't write a list name")
        } else {
                displayNewTodoList(); 
        }
    })

const newTodoListInput = document.querySelector('#newTodoList-input');
newTodoListInput.addEventListener('keyup',(event) => {
        if(newTodoListInput.value.length < 1) {
            alert("ops! you did not write a list name")
        } else {
            if(event.keyCode === 13){
                displayNewTodoList(); 
            }
        }
        
    })
        
/** displays and adds funtionallity to a new todo List*/
function displayNewTodoList(){
    let i = todoStorage.length;

        //this is only for one list
        createNewTodo(newTodoListInput.value);
        todoStorage[i].displayTodoList(todoStorage[i].name, flexColumn)

    flexColumn < 3? flexColumn++ : flexColumn = 0; //keep track on wich column to display the todolist in.
    newTodoListInput.value = null; // makes the input element empty
}

/** push newTodo to todoStorage */
function createNewTodo(todoListName){
            todoStorage.push(new TodoList(todoListName));
            pushToLocalStorage(todoListName) //obs! needs to be after todoStorage.push().
}

/** add todoList from todoStorage when list gets created */
function pushToLocalStorage() {
    let TodoLists; //localstorage key
    if(localStorage.getItem('TodoLists') === null){
        TodoLists = [];
    } else {
        TodoLists = JSON.parse(localStorage.getItem('TodoLists'));  
    }

    TodoLists.push(todoStorage[todoStorage.length - 1]);
    localStorage.setItem("TodoLists", JSON.stringify(TodoLists)); //makes objects to strings
}

/** pulls from loaclstorage and push the lists to todoStorage */
function pullTodoListFromLocalStorage(){
    //create js objects
    let localStorageTodoLists = JSON.parse(localStorage.getItem('TodoLists'))
    if(localStorageTodoLists === null){
        console.log('obs! localStorage is empty')
    } else {
        //loops and pushes the local storage key to todoStorage
        for (let todoList of localStorageTodoLists) {
            todoStorage.push(new TodoList(todoList.name));
        }
    }
} 

/** renders list at start from todoStorage --> need to pull from loaclstorage to work (or other permanet storage.) */
export function render() {
    pullTodoListFromLocalStorage();
    for(let todoList of todoStorage){
        todoList.displayTodoList(todoList.name, flexColumn)
        flexColumn < 3? flexColumn++ : flexColumn = 0; //needs a better system...

                  for(let i = 0; i < todoList.taskStorage.length; i++){
                    todoList.displayTask(i);
                }
    }
}

render(); //opens upp all the prev stored todoLists  

/*
    bättre id, eller att man inte får använda sig av samma namn.
*/