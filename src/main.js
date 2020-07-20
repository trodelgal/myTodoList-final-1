//VARIABLE
const addButton = document.querySelector('#addButton');
const prioritySelector = document.querySelector('#prioritySelector');
const toDoTextInput = document.querySelector('#textInput');
const viewSection = document.querySelector('.view');
const sortButton = document.querySelector('#sortButton');
const cleanButton = document.querySelector('#cleanButton');

let taskList = [];
let deleted =[];

//PROPERTIES OF OBJECT
const getPriority = () => {
    return prioritySelector.value
};

const getCreateAt = () => {
    const today = new Date();
    let zeroMonth = today.getMonth() < 10 ? '0' : '';
    let zeroDate = today.getDate() < 10 ? '0' : '';
    let zeroHour = today.getHours() < 10 ? '0' : '';
    let zeroMinutes = today.getMinutes() < 10 ? '0' : '';
    let zeroSeconds = today.getSeconds() < 10 ? '0' : '';
    const createAt = `${zeroDate}${today.getDate()}-${zeroMonth}${today.getMonth() + 1}-${today.getFullYear()} ${zeroHour}${today.getHours()}:${zeroMinutes}${today.getMinutes()}:${zeroSeconds}${today.getSeconds()}`;
    return createAt;
}
const getText = () => {
    const toDoText = toDoTextInput.value;
    return toDoText;
}

//THE OBJECT
function creatTask() {
    const task = {
        priority: getPriority(),
        todoCreatedAt: getCreateAt(),
        todoText: getText()
    }
    return task;
}

//GET THE OBJECT TO ARRAY AND PRINT THE OBJECT TO HTML WITH COUNTER
function putTaskIntoTaskArray() {
    if (toDoTextInput.value === '') {
        alert("You must write something!");
    return}
    taskList.push(creatTask());
    console.log(taskList);
    viewSection.innerHTML = '';
    showTask(taskList);
    countTheList(taskList);
}

//CREATE THE LIST IN THE CONTAINER DIV
function createToDoListHTML(task) {
    const taskContainerDiv = document.createElement('div');
    taskContainerDiv.setAttribute('class', 'todoContainer');

    const taskrPiorityDiv = document.createElement('div');
    taskrPiorityDiv.setAttribute('class', 'todoPriority');
    taskrPiorityDiv.innerHTML = task.priority;

    const taskTodoCreatedAtDiv = document.createElement('div');
    taskTodoCreatedAtDiv.setAttribute('class', 'todoCreatedAt');
    taskTodoCreatedAtDiv.innerHTML = task.todoCreatedAt;
    
    const taskTodoTextDiv = document.createElement('div');
    taskTodoTextDiv.setAttribute('class', 'todoText');
    taskTodoTextDiv.innerHTML = task.todoText;

    let removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'removeButton');
    removeButton.innerHTML = 'REMOVE';

    let doneButton = document.createElement('button');
    doneButton.setAttribute('class', 'doneButton');
    doneButton.innerHTML = 'DONE';
  
    taskContainerDiv.append(taskrPiorityDiv, taskTodoCreatedAtDiv, taskTodoTextDiv, doneButton, removeButton);
    
    function deleteMe(e){
        taskContainerDiv.remove();
        taskList.pop();
        counter.innerHTML = taskList.length;        
    }
    function paint(e){
        if(taskContainerDiv.style.backgroundColor === 'black'){
        taskContainerDiv.style.backgroundColor = 'red';
        }else{taskContainerDiv.style.backgroundColor = 'black'}
    }
    removeButton.addEventListener('click', deleteMe);
    doneButton.addEventListener('click', paint);
    return taskContainerDiv;
}


//ADD THE CONTAINER DIV TO THE VIEW SECTION
function addTaskContainerDivToTheView(taskContainerDiv){
    viewSection.appendChild(taskContainerDiv);
}
addButton.addEventListener('click', putTaskIntoTaskArray)

//PRINT THE OBJECT TO HTML
function showTask(taskList) {
    toDoTextInput.value = '';
    viewSection.innerHTML = '';
    for (const task of taskList) {
    addTaskContainerDivToTheView(createToDoListHTML(task));
    }
}

//SORT THE LIST BY THE PRIORITY
function sortListByPriority() {
    let taskList1 = taskList;
    taskListSorted = taskList1.sort((a, b) => (a.priority < b.priority) ? 1 : -1);
    showTask(taskListSorted);
}
sortButton.addEventListener('click', sortListByPriority)

//ADD COUNTER
function countTheList(){
    const counter = document.querySelector('#counter');
    let x = taskList.length;
    counter.innerHTML = x;
    return counter
}
//BONUS
//DO TASK ON ENTER 
function enter(event) {
    if (event.keyCode === 13)
    putTaskIntoTaskArray()
}
toDoTextInput.addEventListener("keydown", enter)

//PRIORITY SELECTOR ON KEYBOARD NUMBERS
function keyboardNumber(event){
    if (event.keyCode === 49){
        prioritySelector.value = 1;  
    }
    if (event.keyCode === 50){
        prioritySelector.value = 2;  
    }
    if (event.keyCode === 51){
        prioritySelector.value = 3;  
    }
    if (event.keyCode === 52){
        prioritySelector.value = 4;  
    }
    if (event.keyCode === 53){
        prioritySelector.value = 5;  
    }
}
toDoTextInput.addEventListener("keydown", keyboardNumber)

//CLEAN ALL
cleanButton.onclick = function(e){
    viewSection.innerHTML = '';
    taskList = [];
    counter.innerHTML = 0;
}

// Add a "checked" symbol when clicking on a list item
viewSection.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'div') {
    ev.target.classList.toggle('checked');
  }
}, false);

// // Click on a close button to hide the current list item
// for (let i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       let div = this.parentElement;
//       div.style.display = "none";
//     }