// Input box for new task
var taskInput = document.getElementById("new-task");
// Input box for due date
var dueDateInput = document.getElementById("due-date")
// Button for adding new task
var addButton = document.getElementsByTagName("button")[0];
// list of incomplete tasls
var incompleteTasks = document.getElementById("incomplete-tasks");
// list if completed tasks
var completedTasks = document.getElementById("completed-tasks");

// function to create new task
var createNewTask = function(taskString, dueDateString) {
    // list item
    var listItem = document.createElement("li");
    // checkbox
    var checkBox = document.createElement("input");
    // task label
    var taskLabel = document.createElement("label");
    // edit task input box
    var editInput = document.createElement("input");
    // edit button
    var editButton = document.createElement("button");
    // delete button
    var deleteButton = document.createElement("button");
    // due date label
    var dueDate = document.createElement("span")

    // add relevant properties to elements
    checkBox.type = "checkbox";
    taskLabel.innerText = taskString;
    editInput.type = "text";
    editButton.className = "edit";
    editButton.innerText = "Edit";
    deleteButton.className = "delete";
    deleteButton.innerText = "Delete";
    dueDate.className = "date";
    dueDate.innerText = "Due date: " + dueDateString;

    // add elements to list item
    listItem.appendChild(checkBox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(dueDate);

    return listItem;
}

// Add a new task
var addNewTask = function() {
    // Get the new task
    var newTask = createNewTask(taskInput.value, dueDateInput.value);

    // Add task to incompleted list
    incompleteTasks.appendChild(newTask);
    bindTaskEvents(newTask, taskCompleted);

    // Remove the text in add new input
    taskInput.value = "";
    dueDateInput.value = "";
}

// Edit an existing task
var editTask = function() {
    // get parent list item
    var listItem = this.parentNode;

    // get objects
    var editInput = listItem.querySelector("input[type=text]");
    var dateInput = listItem.querySelector("input[type=date]");
    var label = listItem.querySelector("label");
    var dateSpan = document.getElementById("date");

    // check if 'editMode' on
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        // change task name
        label.innerText = editInput.value;
        // change due date
        dateSpan.innerText = dateInput.value;
        this.innerText = "Edit";
    } else {
        // set initial value to label
        editInput.value = label.innerText;
        // set date selector to due date
        dateInput.value = dateSpan.innerText;
        this.innerText = "Save";
    }

    // toggle 'editMode'
    listItem.classList.toggle("editMode");
}

// function to delete task
var deleteTask = function() {
    console.log("Deleting task...");
    var listItem = this.parentNode;
    var parentList = listItem.parentNode;
    parentList.removeChild(listItem);
}

// Mark task as completed
var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// mark task as incomplete
var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


// Add functionality to add button
addButton.addEventListener("click", addNewTask);

var bindTaskEvents = function(listItem, checkBoxEventHandler) {
    // Get relevant objects
    var checkBox = listItem.querySelector("input[type=checkbox]");
    var editButton = listItem.querySelector("button.edit");
    var deleteButton = listItem.querySelector("button.delete");

    // Add functionality to objects
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// bind existing items to relevant functionalities
for (var i = 0; i < incompleteTasks.children.length; i++) {
    bindTaskEvents(incompleteTasks.children[i], taskCompleted);
}
for (var i = 0; i < completedTasks.children.length; i++) {
    bindTaskEvents(completedTasks.children[i], taskIncomplete);
}