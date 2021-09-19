import TodoList from "./ToDoClass.js";
import newElement from "./newElementFunction.js";


let todoStorage = [] //stores all lists ever created during a session.
let column = 0;
let numberOfLists = 0; //keeps track on how many lists


//stores and add eventlistener to createTodoBTN in header
const createTodoBtn = document.querySelector('#newTodoList-btn');
createTodoBtn.addEventListener('click', ()=>{
    renderNewTodoList(); //behöver en annan funktion som lägger till den absolut senaste i todo, store.
})
    
//needs a function that do not allow for same name. or make speical id for list with same name.
function renderNewTodoList(){
    let i = todoStorage.length;
    const input = document.querySelector('#newTodoList-input').value;
        createNewTodo(input);
        displayTodo(todoStorage[i].name, todoStorage[i].id, column)

        //added function to delete btn. (make this to a function)
        let deleteBtn = document.querySelector(`#${todoStorage[i].id}_deleteTodoBtn`)
            deleteBtn.addEventListener('click', () => {
                todoStorage[i].deleteTodo(todoStorage,todoStorage[i]);
            })

        //added function to addTask btn. (make this to a function)
        let addBtn = document.querySelector(`#${todoStorage[i].id}_addTaskBtn`)
            addBtn.addEventListener('click', () => {
                todoStorage[i].addTask('task'); //make user input instead if 'task'
            })

        //added function to Hide btn. (make this to a function)
        let hideBtn = document.querySelector(`#${todoStorage[i].id}_hideTasksBtn`)
        hideBtn.addEventListener('click', () => {
                let taskHolder = document.querySelector(`#${todoStorage[i].id}`)
                if(taskHolder.style.display === 'block'){
                    taskHolder.style.display = 'none';
                    hideBtn.innerText = 'Show';
                } else {
                    taskHolder.style.display = 'block'
                    hideBtn.innerText = 'Hide';
                }

            })
            
            
    column < 3? column++ : column = 0;
}

//push newTodo to todoStorage
function createNewTodo(name){
    todoStorage.push(new TodoList(name, numberOfLists));
    numberOfLists++
}


//prints out new todo for the first time.
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


//creates the elements needed to display all of the todo lists.
function displayTodo(innerTextTitle, todoListId, column){
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
            let todoListTitle = newElement('h2', innerTextTitle, 'todo-nameText', null);
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