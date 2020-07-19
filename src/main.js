//VARIABLE
const addButton = document.querySelector('#addButton');
const prioritySelector = document.querySelector('#prioritySelector');
const toDoTextInput = document.querySelector('#textInput');
const viewSection = document.querySelector('.view');
const sortButton = document.querySelector('#sortButton');

let taskList = [];

//PROPERTIES OF OBJECT
const getPriority = () => {
    return prioritySelector.value
};

const getCreateAt = () => {
    const today = new Date();
    let zero = today.getMonth() < 10 ? '0' : '';
    let zeroSeconds = today.getSeconds() < 10 ? '0' : '';
    const createAt = `${today.getDate()}-${zero}${today.getMonth() + 1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${zeroSeconds}${today.getSeconds()}`;
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
  
    taskContainerDiv.append(taskrPiorityDiv, taskTodoCreatedAtDiv, taskTodoTextDiv);
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
    console.log(taskList1);
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
