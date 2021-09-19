import newElement from "./newElementFunction.js"; //element constructor


export default class TodoList{
    constructor(name, i){
        this.name = name,
        this.id = name.replace(/\s/g,''); 
        this.taskStorage = []
        //minnemering av listan
    }
    
    Task(text){
        return {
            text,
            setAsDone: function(){},
            changeTask: function(){}
        }
    }
    
    addTask(InnerText){
        //add task to storage lika med new task
        this.taskStorage.push(this.Task(InnerText));
           this.displayTask(this.taskStorage.length - 1);
    }
    
    displayTask(i){ // 'i' is used in the for-loop at renderTodoLists() to get all task in the list.
        //fetching taskHolder(tesk section) id
        const parrentElement = document.getElementById(this.id)
        //creating task elements
        let newTask = newElement('li', null, 'task', null);
        let checkbox = newElement('input', null, 'checkbox-task', null, 'checkbox')
        newTask.appendChild(checkbox)
        let taskText = newElement('p', this.taskStorage[i].text, 'task-paragraph', null)
        newTask.appendChild(taskText)
        let editTaskBtn = newElement('button', 'edit', 'editTask', null)
        newTask.appendChild(editTaskBtn)
        let deleteTodoBtn = newElement('button', 'delete', 'deleteTask', null)
        newTask.appendChild(deleteTodoBtn)
        
        //appends to task holder/ task sections        
        parrentElement.appendChild(newTask);
    }
    
    removeTask(){
        // remove from this.storage
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
    
    // hideTasks(){
    //     // hide section of tasks
    // }
}