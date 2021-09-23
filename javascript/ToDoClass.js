import newElement from "./functions/newElementFunction.js"; //element constructor
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
 *      creates new task from user input string and adds it to task storage on "key press enter" 
 * 
 * + displayTask(): 
 * 
 *      renders task and appends them to "taskHolder" at the todoList with the same id.
 * 
 * + removeTask():
 * 
 * + editTask()
 * 
 * + deleteTodo():
 * 
 * 
*/

export default class TodoList{
    constructor(name, numberOfListCreated){
        this.name = name,
        this.id = name.replace(/\s/g,'') + numberOfListCreated; // random nummer function instead of numberOf list Created??? 
        this.taskID = 0;
        this.taskStorage = []
        //minnemering av listan
    }
    
    Task(text){
        return {
            text,
            taskDone: false,
            id: this.id,
            taskID: this.taskID,
            setAsDone: function(paragraph){
                if(this.taskDone === false){
                    paragraph.classList.add('task-done')
                    this.taskDone = true;
                }else{
                    paragraph.classList.remove('task-done');
                    this.taskDone = false;
                }

            },
            editTask: function(){
                const taskText =  document.querySelector(`#${this.id}${this.taskID}_taskParagraph`);
                const editTaskBtn = document.querySelector(`#${this.id}${this.taskID}_editTaskBtn`)
                const userInput = newElement('input', null, 'newTask-input', 'text');
                let oldText = taskText.innerText
               
                editTaskBtn.disabled = true;

                taskText.innerText = null
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
               
            },
            removeTask: function () {
                const task = document.querySelector(`#${this.id}${this.taskID}_taskSection`);
                task.remove();
            }
        }
    }
    
    /** creates new task on enter key press */
    addTask(){
        const parrentElement = document.querySelector(`#${this.id}_taskSection`);
        const userInput = newElement('input', null, 'newTask-input', 'text');
        parrentElement.appendChild(userInput)

        //add task on 'enter key'
        userInput.addEventListener('keyup', (event)=>{
            if(event.keyCode === 13){
                this.taskStorage.push(this.Task(userInput.value));
                userInput.remove();
                this.displayTask(this.taskStorage.length - 1);
            }
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
                deleteTodoList.remove();
                this.taskStorage = [];
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
                let addTaskBtn = newElement('button', 'addTask', 'addTask-btn', `${this.id}_addTaskBtn`);
                    todoListHead.appendChild(addTaskBtn);
                let todoListTitle = newElement('h2', titleName, 'todo-nameText', null);
                    todoListHead.appendChild(todoListTitle);
                let deleteTodoBtn = newElement('button', 'delete', 'deleteTask-btn', `${this.id}_deleteTodoBtn`);
                    todoListHead.appendChild(deleteTodoBtn);
            //body
                let taskHolder = newElement('ul', null, 'taskHolder', `${this.id}_taskSection`);
                    todoList.appendChild(taskHolder);
                let hideTodoListBtn = newElement('button', 'Hide', 'hideTodoList-btn',  `${this.id}_hideTasksBtn`)
                    todoList.appendChild(hideTodoListBtn);
        //spreeds the todos out to diffrent columns.
        FlexColumns[column].appendChild(todoList)

        //btn functionality
        addTaskBtn.addEventListener('click', () => this.addTask());
        deleteTodoBtn.addEventListener('click', () => this.deleteTodoList());
        hideTodoListBtn.addEventListener('click', () => {
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
            let checkbox = newElement('input', null, 'checkbox-task', `${this.id}${this.taskID}_taskCheckbox`, 'checkbox');
                newTask.appendChild(checkbox);
            let taskText = newElement('p', this.taskStorage[storageIndex].text, 'task-paragraph', `${this.id}${this.taskID}_taskParagraph`);
                newTask.appendChild(taskText);
            let editTaskBtn = newElement('button', 'edit', 'editTask', `${this.id}${this.taskID}_editTaskBtn`);
                newTask.appendChild(editTaskBtn);
            let deleteTaskBtn = newElement('button', 'delete', 'deleteTask', `${this.id}${this.taskID}_deleteTaskBtn`);
                newTask.appendChild(deleteTaskBtn);
        //appends to task holder/ task sections        
        parrentElement.appendChild(newTask);

        //added btn functionality
        deleteTaskBtn.addEventListener('click', () => taskStorageIndex.removeTask());
        editTaskBtn.addEventListener('click', () => taskStorageIndex.editTask());
        checkbox.addEventListener('click', () => taskStorageIndex.setAsDone(taskText));
        // taskText.parentNode.addEventListener('click', ()=> taskStorageIndex.setAsDone(taskText))

        this.taskID++;
    }
   
}