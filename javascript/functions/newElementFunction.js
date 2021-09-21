//jsdoc
/** 
 * element constructor: (tag, InnerText, className, idName, typeName)
 * 
 * you need to put null at idName when callback if you not going to use it... 
 * else you get an id of undefind right now.
*/

export default function newElement(tag, InnerText, className, idName, typeName){
    const element = document.createElement(tag);
        if(InnerText !== null||undefined) element.innerText = InnerText;
        if(className !== null||undefined) element.classList.add(className);
        if(idName !== null||undefined) element.id = idName; //hur får jag bort id="" ifrån elementet?
            else  element.removeAttribute('id'); //tillfällig lösning....
        if(typeName !== null||undefined) element.setAttribute('type', typeName);
    return element;
}

