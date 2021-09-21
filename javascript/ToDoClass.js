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
                const task = document.querySelector(`#${this.id}${this.taskID}`);
                task.remove();
            }
        }
    }
    
    /** creates new task on enter key press */
    addTask(){
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
            if(event.keyCode === 27){
                userInput.remove();
            }
        })
    }
    
    /** redner task to taskHolder(task Section) */
    displayTask(storageIndex){
        let taskStorageIndex= this.taskStorage[storageIndex];

        //fetching taskHolder(task section) id
        const parrentElement = document.getElementById(this.id);

            //creating task elements
            let newTask = newElement('li', null, 'task', `${this.id}${this.taskID}`);
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
        //added btn functionallity
        deleteTaskBtn.addEventListener('click', () => taskStorageIndex.removeTask());
        editTaskBtn.addEventListener('click', () => taskStorageIndex.editTask());
        checkbox.addEventListener('click', () => taskStorageIndex.setAsDone(taskText));
        // taskText.parentNode.addEventListener('click', ()=> taskStorageIndex.setAsDone(taskText))

        this.taskID++;
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