import { booksData } from "./booksData";

const mainElement = document.querySelector("main");
const searchInput = document.querySelector(".search-input");

let searchTimeout;

mainElement.addEventListener("click", (event) => {
    if (event.target.id === "add-button") {
        renderAddBookModal();
        renderTopicSelect();
    } else if (event.target.className === "delete-button") {
        renderDeleteBookModal(event.target);
    } else if (event.target.className === "search-input") {
        searchTimeout = setTimeout(handleSearch, 500);
    }
    attachEventListeners(event.target);
});

function renderBooks() {
    const booksExist = localStorage.getItem("books");

    // only save mock data to localStorage on first render
    if (!booksExist) {
        localStorage.setItem("books", JSON.stringify(booksData));
    }

    const books = JSON.parse(localStorage.getItem("books"));

    document.querySelector("tbody").innerHTML = "";

    books.forEach((book) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.topic}</td>
            <td class="delete-button" data-id="${book.bookId}">Delete</td>
        `;

        document.querySelector("tbody").appendChild(newRow);
    });
}

function renderTopicSelect() {
    const topicsArray = booksData.map((book) => book.topic);

    topicsArray.forEach((topic) => {
        const optionElement = document.createElement("option");

        optionElement.value = topic;
        optionElement.text = topic;

        document.querySelector("select").appendChild(optionElement);
    });
}

function renderAddBookModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-top">
            <h2><span>Add</span> Book</h2>
            <img class="close-icon" src="/close-icon.svg">
        </div>
        <form>
            <label for="name">Name</label>
            <input type="text" id="name" name="name">
            <label for="author">Author</label>
            <input type="text" id="author" name="author">
            <label for="topic">Topic</label>
            <select id="topic" name="topic">
            </select>
            <button class="button">Create</button>
        </form>    
    `;
    document.querySelector("body").appendChild(modal);
    mainElement.style.opacity = "0.4";
    mainElement.style.filter = "blur(5px)";
    mainElement.classList.add("disabled");
    document.body.style.cursor = "default";
}

function renderDeleteBookModal(target) {
    const booksArray = JSON.parse(localStorage.getItem("books"));

    const deletedBook = booksArray.find((book) => {
        if (book.bookId === parseInt(target.dataset.id)) {
            return book;
        }
    });

    const modal = document.createElement("div");
    modal.className = "modal modal__delete";
    modal.innerHTML = `
        <div class="modal-top">
            <h2><span>Delete</span> Book</h2>
            <img class="close-icon" src="/close-icon.svg">
        </div>
        <h3>Do you want to delete <br><strong>${deletedBook.name}?</strong></h3>
        <div class="modal-buttons">
            <button class="secondary-button">Delete</button>
            <button class="button">Cancel</button> 
        </div>   
    `;
    document.querySelector("body").appendChild(modal);
    mainElement.style.opacity = "0.4";
    mainElement.style.filter = "blur(5px)";
    mainElement.classList.add("disabled");
    document.body.style.cursor = "default";
}

function handleSearch() {
    const booksArray = JSON.parse(localStorage.getItem("books"));

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        searchInput.addEventListener("input", () => {
            const searchedBook = booksArray.filter((book) => {
                const bookName = book.name.toLowerCase().trim();
                const searchTerm = searchInput.value.toLowerCase().trim();

                if (bookName.includes(searchTerm)) {
                    return book;
                }
            });

            document.querySelector("tbody").innerHTML = "";

            searchedBook.forEach((book) => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.topic}</td>
                    <td class="delete-button" data-id="${book.bookId}">Delete</td>
                `;

                document.querySelector("tbody").appendChild(newRow);
            });
        });
    });
}

function handleDeleteBook(target) {
    const booksArray = JSON.parse(localStorage.getItem("books"));

    const remainingBooks = booksArray.filter(
        (book) => book.bookId !== parseInt(target.dataset.id)
    );
    localStorage.setItem("books", JSON.stringify(remainingBooks));
    handleModalClose();
    searchInput.value = "";
    renderBooks();
}

function handleModalClose() {
    document.querySelector(".modal").remove();
    mainElement.style.opacity = "1";
    mainElement.style.filter = "none";
    mainElement.classList.remove("disabled");
}

function handleSubmitForm(event) {
    event.preventDefault();

    const modalElement = document.querySelector(".modal");
    const name = modalElement.querySelector("#name");
    const author = modalElement.querySelector("#author");
    const topic = modalElement.querySelector("#topic");
    const booksArray = JSON.parse(localStorage.getItem("books"));

    const newBook = {
        bookId: Math.floor(Math.random() * 300 + booksArray.length),
        name: name.value,
        author: author.value,
        topic: topic.value,
    };

    booksArray.push(newBook);
    localStorage.setItem("books", JSON.stringify(booksArray));
    handleModalClose();
    renderBooks();
}

function attachEventListeners(target) {
    const closeButton = document.querySelector(".modal .close-icon");

    if (closeButton) {
        closeButton.addEventListener("click", handleModalClose);
    }

    if (target.id === "add-button") {
        document
            .querySelector(".modal")
            .addEventListener("submit", handleSubmitForm);
    } else if (target.className === "delete-button") {
        document
            .querySelector(".modal__delete .secondary-button")
            .addEventListener("click", () => handleDeleteBook(target));
        document
            .querySelector(".modal__delete .button")
            .addEventListener("click", handleModalClose);
    }
}

renderBooks();
