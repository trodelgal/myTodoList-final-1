//VARIABLE
const addButton = document.querySelector('#addButton');
const prioritySelector = document.querySelector('#prioritySelector');
const toDoTextInput = document.querySelector('#textInput');
const viewSection = document.querySelector('.view');
const sortButton = document.querySelector('#sortButton');
let taskList = [];
//BONUS
const cleanButton = document.querySelector('#cleanButton');
const until = document.querySelector('#date')



//PROPERTIES OF TASK OBJECT
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
const getuntil = () => {
    const toDoUntil = until.value;
    return toDoUntil;
}

//THE OBJECT
function creatTask() {
    const task = {
        priority: getPriority(),
        todoCreatedAt: getCreateAt(),
        todoText: getText(),
        todoUntil: getuntil()
    }
    return task;
}

//GET THE OBJECT TO ARRAY AND PRINT THE OBJECT TO HTML WITH COUNTER
function putTaskIntoTaskArray() {
    if (toDoTextInput.value === '') {
        alert("You must write something!");
        return
    }
    taskList.push(creatTask());
    viewSection.innerHTML = '';
    showTask(taskList);
    countTheList(taskList);
}

//CREATE THE TASK LIST IN THE CONTAINER DIV
function createToDoListHTML(task) {
    const taskContainerDiv = document.createElement('div');
    taskContainerDiv.setAttribute('class', 'todoContainer');

    const taskrPiorityDiv = document.createElement('div');
    taskrPiorityDiv.setAttribute('class', 'todoPriority');
    taskrPiorityDiv.innerHTML = task.priority;

    const taskTodoCreatedAtDiv = document.createElement('div');
    taskTodoCreatedAtDiv.setAttribute('class', 'todoCreatedAt');
    taskTodoCreatedAtDiv.innerHTML = 'Create at: ' + task.todoCreatedAt;

    const taskTodoTextDiv = document.createElement('div');
    taskTodoTextDiv.setAttribute('class', 'todoText');
    taskTodoTextDiv.innerHTML = task.todoText;

    //BONUS
    const taskTodoUntilDiv = document.createElement('div');
    taskTodoUntilDiv.setAttribute('class', 'todoUntil');
    taskTodoUntilDiv.innerHTML = 'when:<br>' + task.todoUntil;

    let removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'removeButton');
    removeButton.innerHTML = 'REMOVE';

    let doneButton = document.createElement('button');
    doneButton.setAttribute('class', 'doneButton');
    doneButton.innerHTML = 'DONE';

    taskContainerDiv.append(taskrPiorityDiv, taskTodoCreatedAtDiv, taskTodoUntilDiv, taskTodoTextDiv, doneButton, removeButton, );
    //DELET ON REMOVE CLICK
    function deleteMe(e) {
        taskContainerDiv.remove();
        taskList.pop();
        counter.innerHTML = taskList.length;
    }
    //CHANGE BACKGROUND COLOR ON DONE CLICK
    function paint(e) {
        if (taskContainerDiv.style.backgroundColor === 'black') {
            taskContainerDiv.style.backgroundColor = 'red';
        } else {
            taskContainerDiv.style.backgroundColor = 'black'
        }
    }
    removeButton.addEventListener('click', deleteMe);
    doneButton.addEventListener('click', paint);
    return taskContainerDiv;
}


//ADD THE CONTAINER DIV TO THE VIEW SECTION
function addTaskContainerDivToTheView(taskContainerDiv) {
    viewSection.appendChild(taskContainerDiv);
}

//PRINT THE OBJECT TO HTML
function showTask(taskList) {
    toDoTextInput.value = '';
    viewSection.innerHTML = '';
    for (const task of taskList) {
        addTaskContainerDivToTheView(createToDoListHTML(task));
    }
}
//CREATE THE LIST ON ADD CLICK
addButton.addEventListener('click', putTaskIntoTaskArray)

//SORT THE LIST BY THE PRIORITY
function sortListByPriority() {
    let taskList1 = taskList;
    taskListSorted = taskList1.sort((a, b) => (a.priority < b.priority) ? 1 : -1);
    showTask(taskListSorted);
}
sortButton.addEventListener('click', sortListByPriority)

//ADD COUNTER
function countTheList() {
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
function keyboardNumber(event) {
    if (event.keyCode === 49) {
        prioritySelector.value = 1;
    }
    if (event.keyCode === 50) {
        prioritySelector.value = 2;
    }
    if (event.keyCode === 51) {
        prioritySelector.value = 3;
    }
    if (event.keyCode === 52) {
        prioritySelector.value = 4;
    }
    if (event.keyCode === 53) {
        prioritySelector.value = 5;
    }
}
toDoTextInput.addEventListener("keydown", keyboardNumber)

//CLEAN ALL
cleanButton.onclick = function (e) {
    viewSection.innerHTML = '';
    taskList = [];
    counter.innerHTML = 0;
}