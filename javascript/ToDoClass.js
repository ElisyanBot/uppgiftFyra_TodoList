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
            id: 0, //random number later on?
            taskDone:false,
            setAsDone: function(){
                const checkBox = ''; 
            },
            editTask: function(){}
        }
    }
    
    /** creates new task on enter key press */
    addTask(taskText){
        const parrentElement = document.getElementById(this.id)
        const userInput = newElement('input', null, 'newTask-input', 'text');
        parrentElement.appendChild(userInput)

        //add task on 'enter key'
        userInput.addEventListener('keyup', (event)=>{
            if(event.keyCode === 13){
                this.taskStorage.push(this.Task(userInput.value));
                userInput.remove();
                this.displayTask(this.taskStorage.length - 1);
            }
        })
    }
    
    /** redner task to taskHolder(task Section) */
    displayTask(storageIndex){
        let taskID = this.taskStorage[storageIndex].id;

        //fetching taskHolder(task section) id
        const parrentElement = document.getElementById(this.id)

            //creating task elements
            let newTask = newElement('li', null, 'task', `${this.id}${this.taskID}`);
            let checkbox = newElement('input', null, 'checkbox-task', `${this.id}${this.taskID}_taskCheckbox`, 'checkbox')
            newTask.appendChild(checkbox)
                let taskText = newElement('p', this.taskStorage[storageIndex].text, 'task-paragraph', `${this.id}${this.taskID}_taskParagraph`)
            newTask.appendChild(taskText)
            let editTaskBtn = newElement('button', 'edit', 'editTask', `${this.id}${this.taskID}_editTaskBtn`)
            newTask.appendChild(editTaskBtn)
            let deleteTodoBtn = newElement('button', 'delete', 'deleteTask', `${this.id}${this.taskID}_deleteTaskBtn`)
            newTask.appendChild(deleteTodoBtn)

        //appends to task holder/ task sections        
        parrentElement.appendChild(newTask);
        //added btn functionallity
        this.removeTask();
        this.taskID++;
    }
    
    removeTask(){
        const task = document.querySelector(`#${this.id}${this.taskID}`);
        console.log(task);

        const deleteTaskBtn = document.querySelector(`#${this.id}${this.taskID}_deleteTaskBtn`);
        console.log(deleteTaskBtn);

                deleteTaskBtn.addEventListener('click', () => {
                    task.remove();
                })
    }

    /** edits the innertext of the task*/
    editTasks(newTaskText){
        this.text = newTaskText;
    }
    
    deleteTodo(todoStorage,  todoList){
        const deleteTodoList = document.querySelector(`#${this.id}_todolist`);
            if(deleteTodoList === null ) {
                console.log('err: todoList id do not exist');
            } else {
                deleteTodoList.remove();
                this.taskStorage = [];
            }
    }
    
   
}