const API_URL = "http://localhost:3000/api/users";

const usersGrid = document.getElementById("usersGrid");
const addUserForm = document.getElementById("addUserForm");
const deleteUserForm = document.getElementById("deleteUserForm");

// פונקציית מחיקה (מוציאים אותה החוצה!)
async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const response = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
    if (response.ok) {
      loadUsers(); // רענון הרשימה לאחר המחיקה
    } else {
      console.error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error("Error loading users:", error);
    usersGrid.innerHTML = `<p style="color:red">Error connecting to server.</p>`;
  }
}

function renderUsers(users) {
  if (users.length === 0) {
    usersGrid.innerHTML = `<p>No users yet, please add one.</p>`;
    return;
  }

  // שים לב לשימוש בגרשיים סביב ה-ID בקריאה לפונקציה
  usersGrid.innerHTML = users
    .map(
      (user) => `
    <div class="card">
      <button onclick="deleteUser('${user._id}')">Delete</button>
      <h3>${user.name}</h3>
      <div>Email: ${user.email}</div>
      <div>Age: ${user.age}</div>
      <div>ID: ${user._id}</div>
    </div>
  `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadUsers();

  addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      age: parseInt(document.getElementById("age").value),
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      addUserForm.reset();
      loadUsers();
    }
  });

  deleteUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = document.getElementById("userId").value;
    deleteUser(userId); // שימוש בפונקציה החדשה
  });
});
