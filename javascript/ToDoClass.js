import newElement from "./functions/newElementFunction.js"; //element constructor
import {render} from "./main.js";
/**
 * TodoList class
 * 
 *  todolist.task(text):
 * 
 *    is  afactory function that contains: taskText, task id, task checkmark: false.
 *    + 2 functions: setAsdone(),  editTask()
 * 
 * + addTask():
 *      
 *      creates new task from user input string and adds it to task storage on "key press enter".
 *          + editTask();
 *          + removeTask();
 *          + setAsDone();
 * 
 * + displayTodo():
 *      creates ant appends elements that display this Todolist
 * 
 * + displayTask():
 *      creates ant appends elements that display this Todolists tasks to the taskHolder(task section)
 * 
 * + deleteTodo():
 *      removes todo from window and from localstorage.
*/

export default class TodoList{
    constructor(name, taskIdNr){
        this.name = name,
        this.id = name.replace(/\s/g,''); // random nummer function instead of numberOf list Created??? 
        this.taskID = 0; //taskIdNr
        this.taskStorage = []
    }
    
    /** task constructor: params(string - task text) */
    Task(text){
        return {
            text,
            taskDone: false,
            id: this.id,
            taskID: this.taskID,
            setAsDone: function(paragraph){
                //checks value of the task checkbox
                if(this.taskDone === false){
                    //adds a line-through the task innerText.
                    paragraph.classList.add('task-done')
                    this.taskDone = true;
                }else{
                    //remove the line-through.
                    paragraph.classList.remove('task-done');
                    this.taskDone = false;
                }

            },
            editTask: function(){
                const taskText =  document.querySelector(`#${this.id}${this.taskID}_taskParagraph`);
                const editTaskBtn = document.querySelector(`#${this.id}${this.taskID}_editTaskBtn`)
                const userInput = newElement('input', null, 'newTask-input', 'text');
                //storage old text data
                let oldText = taskText.innerText 
               
                //cant press the edit btn when you allready edit this task
                editTaskBtn.disabled = true;

                taskText.innerText = null
                //creates new input
                taskText.appendChild(userInput)
                userInput.addEventListener('keyup', (event) => {

                       //on 'enter key' -- new text
                    if(event.keyCode === 13){
                        taskText.innerText = userInput.value;
                        userInput.remove(); 
                        editTaskBtn.disabled = false;
                    }

                    //esc btn --> make it old text
                    if(event.keyCode === 27){
                        taskText.innerText = oldText;
                        userInput.remove();
                        editTaskBtn.disabled = false;
                    }
                }) 
               
            }, //need to update localstorage
            removeTask: function () {
                const task = document.querySelector(`#${this.id}${this.taskID}_taskSection`);
                //removes task html from window
                task.remove();
            }
        }
    }
    
    /** creates new task on enter key press */
    addTask(){
        const parrentElement = document.querySelector(`#${this.id}_taskSection`);
        //creates Usersinput
        const userInput = newElement('input', null, 'newTask-input', 'text');
        parrentElement.appendChild(userInput)

        //add task on 'enter key'
        userInput.addEventListener('keyup', (event)=>{
            if(event.keyCode === 13){
                //saves to taskStorage --- needs to save to localstorages:taskStorage for each todolist.
                this.taskStorage.push(this.Task(userInput.value));
                //removes user input
                userInput.remove();
                //displays task html at task section.
                this.displayTask(this.taskStorage.length - 1);
            }
            //remove userInput on esc btn
            if(event.keyCode === 27){
                userInput.remove();
            }
        })
    } 
    
   
    /** removing elements from the browser and reseting the list tasks. */
    deleteTodoList(){
        const deleteTodoList = document.querySelector(`#${this.id}_todolist`);
            if(deleteTodoList === null ) {
                console.log('err: todoList id do not exist');
            } else {
                //finds and splice from local storage
                deleteFromLocalStorage(`${this.id}`)
                //removes from window
                deleteTodoList.remove();
                //removes all tasks
                this.taskStorage = [];
                //reloads the windows, makes the column order right.
                window.location.reload()
            }
    }
    
    /** reders a new todolist element with btn functionality */
    displayTodoList(titleName, column){
        //stores all the ids of the diffrent css flex columns that holds the lists.
        const FlexColumns = [ 
            document.querySelector('#columnOne'), document.querySelector('#columnTwo'),
            document.querySelector('#columnThree'), document.querySelector('#columnFour')
        ]
            //createing elements and appending ttem
            let todoList = newElement('div', null, 'todoList', `${this.id}_todolist`);
                //Head
                let todoListHead = newElement('div', null, 'todoList-head', null)
                todoList.appendChild(todoListHead);
                    //add task btn
                    let addTaskBtn = newElement('button', 'addTask', 'addTask-btn', `${this.id}_addTaskBtn`);
                        todoListHead.appendChild(addTaskBtn);
                    //todo list title
                    let todoListTitle = newElement('h2', titleName, 'todo-nameText', null);
                        todoListHead.appendChild(todoListTitle);
                    //delete todoList button
                    let deleteTodoBtn = newElement('button', 'delete', 'deleteTask-btn', `${this.id}_deleteTodoBtn`);
                        todoListHead.appendChild(deleteTodoBtn);
                //Body!
                    //task section
                    let taskHolder = newElement('ul', null, 'taskHolder', `${this.id}_taskSection`);
                        todoList.appendChild(taskHolder);
                    //hide task section button
                    let hideTodoListBtn = newElement('button', 'Hide', 'hideTodoList-btn',  `${this.id}_hideTasksBtn`)
                        todoList.appendChild(hideTodoListBtn);
        //spreeds the todos out to diffrent columns.
        FlexColumns[column].appendChild(todoList)

        //btn functionality
        addTaskBtn.addEventListener('click', () => this.addTask());
        deleteTodoBtn.addEventListener('click', () => this.deleteTodoList());
        hideTodoListBtn.addEventListener('click', () => {
            //checks display value at the style.css file.
            if(taskHolder.style.display === 'block'){
                taskHolder.style.display = 'none';
                hideTodoListBtn.innerText = 'Show';
            } else {
                taskHolder.style.display = 'block'
                hideTodoListBtn.innerText = 'Hide';
            }
        });
    }

     /** redner task to taskHolder(task Section) */
     displayTask(storageIndex){
        const taskStorageIndex = this.taskStorage[storageIndex];

        //fetching taskHolder(task section) id
        const parrentElement = document.querySelector(`#${this.id}_taskSection`);

            //creating task elements
            let newTask = newElement('li', null, 'task', `${this.id}${this.taskID}_taskSection`);
                //checkbox
                let checkbox = newElement('input', null, 'checkbox-task', `${this.id}${this.taskID}_taskCheckbox`, 'checkbox');
                    newTask.appendChild(checkbox);
                //task text
                let taskText = newElement('p', this.taskStorage[storageIndex].text, 'task-paragraph', `${this.id}${this.taskID}_taskParagraph`);
                    newTask.appendChild(taskText);
                //edit task text button
                let editTaskBtn = newElement('button', 'edit', 'editTask', `${this.id}${this.taskID}_editTaskBtn`);
                    newTask.appendChild(editTaskBtn);
                // delete task button
                let deleteTaskBtn = newElement('button', 'delete', 'deleteTask', `${this.id}${this.taskID}_deleteTaskBtn`);
                    newTask.appendChild(deleteTaskBtn);
        //appends to task holder/ task sections        
        parrentElement.appendChild(newTask);

        //added button functionality
        deleteTaskBtn.addEventListener('click', () => taskStorageIndex.removeTask());
        editTaskBtn.addEventListener('click', () => taskStorageIndex.editTask());
        checkbox.addEventListener('click', () => taskStorageIndex.setAsDone(taskText));
        // taskText.parentNode.addEventListener('click', ()=> taskStorageIndex.setAsDone(taskText))

        //keeps track on created ids
        this.taskID++;
    }
   
}

/** removes item from local storage */
function deleteFromLocalStorage(deleteListId) {
   const deleteItemID = deleteListId
   const todoLists = JSON.parse(localStorage.getItem('TodoLists'));

   for(let list of todoLists){
       console.log(list.id, deleteItemID)
       deleteItemID === list.id ? todoLists.splice(list, 1) : console.log('not removed');
       localStorage.setItem('TodoLists', JSON.stringify(todoLists))
   }
}
