const API_URL = "http://localhost:3000/api/users";

// אלמנטים מה-HTML החדש
const usersGrid = document.getElementById("usersGrid");
const addUserForm = document.getElementById("addUserForm");
const deleteUserForm = document.getElementById("deleteUserForm");
const updateTaskForm = document.getElementById("updateTaskForm");
const messageBox = document.getElementById("messageBox");

// פונקציה להצגת הודעות למשתמש
function showMessage(msg, isError = false) {
  messageBox.textContent = msg;
  messageBox.style.backgroundColor = isError ? "#ffcccc" : "#ccffcc";
  setTimeout(() => {
    messageBox.textContent = "";
  }, 3000);
}

// פונקציית מחיקה
async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;
  try {
    const response = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
    if (response.ok) {
      loadUsers();
      showMessage("User deleted successfully!");
    } else {
      showMessage("Failed to delete user", true);
    }
  } catch (error) {
    showMessage("Error deleting task", true);
  }
}

// טעינת משימות
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    tasksGrid.innerHTML = `<p style="color:red">Error connecting to server.</p>`;
  }
}

// רינדור משימות ל-Grid
function renderTasks(tasks) {
  if (tasks.length === 0) {
    tasksGrid.innerHTML = `<p>No tasks yet, add one below!</p>`;
    return;
  }
  tasksGrid.innerHTML = tasks
    .map(
      (task) => `
    <div class="card">
      <h3>${task.title}</h3>
      <p>Priority: ${task.priority}</p>
      <p>Status: <strong>${task.status}</strong></p>
      <small>ID: ${task._id}</small>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    </div>
  `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  // הוספת משימה
  addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newTask = {
      title: document.getElementById("taskTitle").value,
      priority: document.getElementById("taskPriority").value,
      status: "Pending",
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      addTaskForm.reset();
      loadTasks();
      showMessage("Task added!");
    }
  });

  // מחיקה מטופס
  deleteTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskId = document.getElementById("deleteTaskId").value;
    deleteTask(taskId);
  });

  // עדכון סטטוס משימה
  updateTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskId = document.getElementById("updateTaskId").value;
    const status = document.getElementById("updateTaskStatus").value;

    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      loadTasks();
      showMessage("Task updated!");
    }
  });
});
