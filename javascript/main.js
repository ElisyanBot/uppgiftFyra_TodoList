import TodoList from "./ToDoClass.js";

let todoStorage = [] //stores all lists ever created during a session.
let flexColumn = 0; // keeps track on wich column the todolist should be created on. //behöver ett bättre sätt att göra detta på...
let numberOfListsCreated = 0; //used for special id:s at todo list //needs to be stord at localStorage


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

        createNewTodo(newTodoListInput.value);
        todoStorage[i].displayTodoList(todoStorage[i].name, flexColumn)

    flexColumn < 3? flexColumn++ : flexColumn = 0; //needs a better system...
    newTodoListInput.value = null; // makes the input element empty
}

/** push newTodo to todoStorage */
function createNewTodo(todoListName){
    pushToLocalStorage(todoListName)
    todoStorage.push(new TodoList(todoListName, numberOfListsCreated));
    numberOfListsCreated++;
}

function pushToLocalStorage(ListName) {
    let TodoLists;
    if(localStorage.getItem('TodoLists') === null){
        TodoLists = [];
    } else {
        TodoLists = JSON.parse(localStorage.getItem('TodoLists'));
    }

    TodoLists.push(new TodoList(ListName));
    localStorage.setItem("TodoLists", JSON.stringify(TodoLists));
}

/** renders todolist from localstorage. */
export function renderFromLocalStorage(){
    let i = todoStorage.length;
    let localStorageTodoLists = JSON.parse(localStorage.getItem('TodoLists'))
        for(let todoList of localStorageTodoLists){
            //displays the todo lists
            todoStorage.push(new TodoList(todoList.name, numberOfListsCreated));
            todoStorage[i].displayTodoList(todoStorage[i].name, flexColumn)
            numberOfListsCreated++
            flexColumn < 3? flexColumn++ : flexColumn = 0; //needs a better system...


                for(let i = 0; i < todoList.taskStorage.length; i++){
                    todoList.displayTask(i);
                }
            }
} 
renderFromLocalStorage(); //opens upp all the prev stored todoLists 