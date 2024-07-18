// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// get today's date
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${year}-${month}-${day}`;
console.log(currentDate);


console.log('.card-body');

////////////////////////////////////////////////////////
if (localStorage.getItem('idLatest') > 1) {
  idLatest = localStorage.getItem('idLatest');
}
else {
  idLatest = 1;
}

if (taskList == undefined) {
  taskList = [];
}
else {
  taskList = taskList;
}

const toDoTasks = document.querySelector("#todo-cards");

const cardBody = document.querySelector('.card-body');

const inProgressTasks = document.querySelector("#in-progress-cards");

const submitButton = document.querySelector("#submitButton")
console.log(submitButton);

console.log(taskList);

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Increment and return the counter value
  const taskId = 'task_' + idLatest;
  idLatest++; // Increment the latest ID for the next task
  localStorage.setItem('idLatest', idLatest);
  return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  var taskCard = document.createElement("div");
  var taskName = document.createElement("h3");
  var taskDesc = document.createElement("div");
  var dueDate = document.createElement("div");
  var deleteButton = document.createElement("button");
  taskCard.className = "task-card";
  taskCard.id = task.id;

  deleteButton.textContent = "Delete Task";
  deleteButton.className = "deleteButton";

  taskName.textContent = task.title;
  taskDesc.textContent = task.description;
  dueDate.textContent = task.deadline;

  cardBody.appendChild(taskCard);
  var thisTask = document.getElementById(taskCard.id);

  thisTask.appendChild(taskName);
  thisTask.appendChild(taskDesc);
  thisTask.appendChild(dueDate);
  thisTask.appendChild(deleteButton);

  const taskDate = dayjs(dueDate.textContent);

  // check due date and set color accordingly
  if (dayjs(currentDate).isSame(dayjs(taskDate)) == true) {
    thisTask.setAttribute("style", "background-color:khaki");
  }

  else if (dayjs(currentDate).isAfter(dayjs(taskDate)) == true) {
    thisTask.setAttribute("style", "background-color:tomato");
  };

  console.log(taskCard.id);
  console.log(taskCard.className);


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for (task of taskList) {
    createTaskCard(task);
  }
  
}

// Todo: create a function to handle adding a new task
submitButton.addEventListener('click', function(event) {
  event.preventDefault;
  handleAddTask(event);
  location.reload();
});

function handleAddTask(event){
  let title = document.querySelector("#title");
  let description = document.querySelector('#description');
  let deadline = document.querySelector('#deadline');

  let newTask = {};
  newTask.id = generateTaskId();
  newTask.title = title.value;
  newTask.description = description.value;
  newTask.deadline = deadline.value;

  taskList.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  console.log(taskList);
  }

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Make lanes droppable
  $('.lane .card-body').sortable({
    connectWith: '.card-body',
    placeholder: 'ui-state-highlight'
  });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    

  //render task list
  renderTaskList();
  handleDrop();

  //delete task from array and reload page
  var deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      taskList = taskList.filter(function( obj ) {
        return obj.id !== button.parentNode.id;
      });
      localStorage.setItem('tasks', JSON.stringify(taskList));
      location.reload();
    });
  });
  
});








// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("openButton");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
console.log(span);

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// click on submit button to close form
submitButton.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// localStorage.clear();