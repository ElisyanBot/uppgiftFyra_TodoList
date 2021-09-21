import TodoList from "./ToDoClass.js";
import newElement from "./functions/newElementFunction.js";
import { btnClick, btnHide } from "./functions/ClickButtonFunctions.js";


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
        displayTodo(todoStorage[i].name, todoStorage[i].id, flexColumn)

        // const test = [
        //     `#${todoStorage[i].id}_deleteTodoBtn`, 
        //     `#${todoStorage[i].id}_addTaskBtn`, 
        //     `#${todoStorage[i].id}_hideTasksBtn`
        // ]

        // btnClick(test[0]);
        // // btnClick(test[1], todoStorage[i].addTask('task'));
        // // hideBtn(test[2]);
        
        // added function to delete btn. (make this to a function)
        let deleteBtn = document.querySelector(`#${todoStorage[i].id}_deleteTodoBtn`)
        deleteBtn.addEventListener('click', () => {
            todoStorage[i].deleteTodo(todoStorage,todoStorage[i]);
        })
        
    
        //added function to addTask btn. (make this to a function)
        let addBtn = document.querySelector(`#${todoStorage[i].id}_addTaskBtn`)
        addBtn.addEventListener('click', () => {
            todoStorage[i].addTask();
        })
        
        //added function to Hide btn. (make this to a function)
        let hideBtn = document.querySelector(`#${todoStorage[i].id}_hideTasksBtn`)
        hideBtn.addEventListener ('click', () => {
            let taskHolder = document.querySelector(`#${todoStorage[i].id}`)
            if(taskHolder.style.display === 'block'){
                taskHolder.style.display = 'none';
                hideBtn.innerText = 'Show';
            } else {
                taskHolder.style.display = 'block'
                hideBtn.innerText = 'Hide';
            }
        })

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

/** creates and appends the elements needed to display a todoList. */
function displayTodo(titleName, todoListId, column){
    //stores all the ids of the diffrent css flex columns that holds the lists.
    const FlexColumns = [ 
        document.querySelector('#columnOne'), document.querySelector('#columnTwo'),
        document.querySelector('#columnThree'), document.querySelector('#columnFour')
    ]
        //createing elements and appending ttem
        let todoList = newElement('div', null, 'todoList', `${todoListId}_todolist`);
        //Head
        let todoListHead = newElement('div', null, 'todoList-head', null)
        todoList.appendChild(todoListHead);
            let addTaskBtn = newElement('button', 'addTask', 'addTask-btn', `${todoListId}_addTaskBtn`);
                todoListHead.appendChild(addTaskBtn);
            let todoListTitle = newElement('h2', titleName, 'todo-nameText', null);
                todoListHead.appendChild(todoListTitle);
            let deleteTodoBtn = newElement('button', 'delete', 'deleteTask-btn', `${todoListId}_deleteTodoBtn`);
                todoListHead.appendChild(deleteTodoBtn);
        //body
            let taskHolder = newElement('ul', null, 'taskHolder', /* ID */ todoListId); //id to the task section of the created todolist
                todoList.appendChild(taskHolder);
            let hideTodoListBtn = newElement('button', 'Hide', 'hideTodoList-btn',  `${todoListId}_hideTasksBtn`)
                todoList.appendChild(hideTodoListBtn);
    //spreeds the todos out to diffrent columns.
    FlexColumns[column].appendChild(todoList)
}
// renderAllTodoLists(); //opens upp all the prev stored todoLists 