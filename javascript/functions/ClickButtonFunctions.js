//försök göra om renderTodolist knapparna här...

/** new btn with eventlistener function(need to bee fixed)
*/
export function btnClick(btnId, eventListenerFunction){
    let btn = document.querySelector(`${btnId}`)
    console.log(btn)
        btn.addEventListener('click', () => {
           eventListenerFunction
        })
}


/** created to hide task section*/
export function btnHide(){

}