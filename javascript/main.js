import TodoList from "./ToDoClass.js";

const todoStorage = [] //stores all lists ever created during a session.
let flexColumn = 0; // keeps track on wich column the todolist should be created on. //behöver ett bättre sätt att göra detta på...
let numberOfListsCreated = 0; //used for special id:s at todo list


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
    todoStorage.push(new TodoList(todoListName, numberOfListsCreated));
    numberOfListsCreated++
}

/** prints out new todo for the first time. */
function renderAllTodoLists(){
    for(let todoList of todoStorage){
        //displays the todo lists
        displayTodo(todoList.name, todoList.id);
        column < 3? column++ : column = 0 //changes flex column

            for(let i = 0; i < todoList.taskStorage.length; i++){
                todoList.displayTask(i);
            }
        }
    // addDeleteBtn()
}

// renderAllTodoLists(); //opens upp all the prev stored todoLists 