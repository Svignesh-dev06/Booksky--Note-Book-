// DOM Elements
const popupoverlay = document.getElementById("popup-overlay");
const popupshowbtn = document.getElementById("popup-show-btn");
const cancelbtn = document.getElementById("cancel-btn");
const cancelbtnSecondary = document.getElementById("cancel-btn-secondary");
const contentboxcontainer = document.getElementById("contentbox-container");
const titleinput = document.getElementById("book-title");
const authorinput = document.getElementById("book-author");
const textarea = document.getElementById("short-description");
const addbtn = document.getElementById("add-btn");

// State
let books = [];

// Event Listeners - Modal Controls
popupshowbtn.addEventListener("click", openModal);
cancelbtn.addEventListener("click", closeModal);
cancelbtnSecondary.addEventListener("click", closeModal);

// Close modal when clicking outside
popupoverlay.addEventListener("click", function(event) {
    if (event.target === popupoverlay) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && popupoverlay.classList.contains("active")) {
        closeModal();
    }
});

// Form submission
addbtn.addEventListener("click", addBook);

// Enter key support in textarea
textarea.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && event.ctrlKey) {
        addBook();
    }
});

// Modal Functions
function openModal() {
    popupoverlay.classList.add("active");
    titleinput.focus();
}

function closeModal() {
    popupoverlay.classList.remove("active");
    clearForm();
}

function clearForm() {
    titleinput.value = "";
    authorinput.value = "";
    textarea.value = "";
}

// Add Book Function
function addBook(event) {
    if (event) {
        event.preventDefault();
    }

    const title = titleinput.value.trim();
    const author = authorinput.value.trim();
    const description = textarea.value.trim();

    if (!title || !author || !description) {
        alert("Please fill in all fields");
        return;
    }

    const book = {
        title: title,
        author: author,
        description: description,
        id: Date.now()
    };

    books.push(book);
    saveBooks();
    displayBooks();
    closeModal();
}

// Delete Book Function
function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        books = books.filter(book => book.id !== id);
        saveBooks();
        displayBooks();
    }
}

// Display Books Function
function displayBooks() {
    contentboxcontainer.innerHTML = "";

    if (books.length === 0) {
        contentboxcontainer.innerHTML = `
            <div class="empty-state">
                <h2>📚 No Books Yet</h2>
                <p>Start building your library by adding your first book!</p>
            </div>
        `;
        return;
    }

    books.forEach(function(book) {
        const div = document.createElement("div");
        div.setAttribute("class", "content-box");
        div.innerHTML = `
            <h1>${escapeHtml(book.title)}</h1>
            <h2>by ${escapeHtml(book.author)}</h2>
            <p>${escapeHtml(book.description)}</p>
            <button class="delete-btn" onclick="deleteBook(${book.id})">Delete Book</button>
        `;
        contentboxcontainer.append(div);
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Local Storage Functions
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
        try {
            books = JSON.parse(storedBooks);
            displayBooks();
        } catch (e) {
            console.error("Error loading books:", e);
        }
    }
}
// Initialize app on page load
document.addEventListener("DOMContentLoaded", function() {
    loadBooks();
});