document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task));
        updateTasksList();
        updateStats();
    }
});
let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

const addTask = ()=>{
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index, checked) => {
    tasks[index].completed = checked;  // Update the completed status based on checkbox state
    updateTasksList();  // Re-render the task list
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};










const editTask = (index) => {
  const taskItem = document.querySelectorAll(".taskItem")[index];
  const taskContainer = taskItem.querySelector(".task");
  const taskText = taskContainer.querySelector("p");

  // Check if an input field already exists to prevent duplicates
  if (taskContainer.querySelector(".edit-input")) return;

  // Create an input field and set its value
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = tasks[index].text;
  inputField.classList.add("edit-input");

  // Replace the <p> text with the input field
  taskContainer.replaceChild(inputField, taskText);
  inputField.focus(); // Focus on input for immediate editing

  // Save the edit on blur (when the user clicks away)
  inputField.addEventListener("blur", () => saveEdit(index, inputField));

  // Save when the user presses Enter
  inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
          saveEdit(index, inputField);
      }
  });
};

const saveEdit = (index, inputField) => {
  const newValue = inputField.value.trim();
  
  if (newValue) {
      tasks[index].text = newValue; // Update task text
  }

  updateTasksList(); // Refresh task list
  saveTasks(); // Save changes to localStorage
};






















const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`;

    if(tasks.length && completeTasks === totalTasks){
        blastConfetti();
    };
};

const updateTasksList = ()=>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class= "taskItem">
            <div class= "task ${task.completed ? "completed" : ""}">
                <input type = "checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})"/>
                <img src="./img/bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;


        const checkbox = listItem.querySelector('.checkbox');

        checkbox.addEventListener('change', (e) => {
            toggleTaskComplete(index, e.target.checked);  
        });
        
        taskList.appendChild(listItem);

    });
};

document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();
    addTask();
});







const blastConfetti = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}