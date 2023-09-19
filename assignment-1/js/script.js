import { booksData } from "./booksData";

const mainElement = document.querySelector("main");
const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector(".search-input");
const paginationContainer = document.querySelector(".pagination-container");
const paginationNumbers = document.getElementById("pagination-numbers");
const footer = document.querySelector("footer");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 4;

let searchTimeout;
let currentPage = 1;

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

function getPaginationNumbers(currentPage, pageCount) {
    for (let i = currentPage; i <= pageCount; i++) {
        renderPageNumber(i);
    }
}

function renderPageNumber(index) {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    paginationNumbers.appendChild(pageNumber);
}

function renderActivePageNumber() {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");

        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
}

function renderPageButtonsStatus() {
    const booksArray = JSON.parse(localStorage.getItem("books"));
    const pageCount = Math.ceil(booksArray.length / paginationLimit);

    const disableButton = (button) => {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    };
    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    };

    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }
    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
}

function handlePageButtons() {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex) {
            button.addEventListener("click", () => {
                const updatedBooksArray = JSON.parse(
                    localStorage.getItem("books")
                );
                setCurrentPage(pageIndex, updatedBooksArray);
            });
        }
    });
}

function setCurrentPage(pageNum, books) {
    currentPage = pageNum;

    renderActivePageNumber();
    renderPageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;
    const bookRange = books.slice(prevRange, currRange);

    renderBooks(bookRange);
}

function initialRender() {
    let booksArray = JSON.parse(localStorage.getItem("books"));

    // only save mock data to localStorage on first render
    if (!booksArray) {
        localStorage.setItem("books", JSON.stringify(booksData));
        booksArray = JSON.parse(localStorage.getItem("books"));
    }
    const pageCount = Math.ceil(booksArray.length / paginationLimit);
    getPaginationNumbers(currentPage, pageCount);
    setCurrentPage(currentPage, booksArray);

    prevButton.addEventListener("click", () => {
        const updatedBooksArray = JSON.parse(localStorage.getItem("books"));
        setCurrentPage(currentPage - 1, updatedBooksArray);
    });
    nextButton.addEventListener("click", () => {
        const updatedBooksArray = JSON.parse(localStorage.getItem("books"));
        setCurrentPage(currentPage + 1, updatedBooksArray);
    });

    handlePageButtons();
}

function renderBooks(bookRange) {
    const books = bookRange
        ? bookRange
        : JSON.parse(localStorage.getItem("books"));

    tableBody.innerHTML = "";

    books.forEach((book) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.topic}</td>
            <td class="delete-button" data-id="${book.bookId}">Delete</td>
        `;

        tableBody.appendChild(newRow);
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

function renderBlur(modal) {
    document.body.appendChild(modal);
    mainElement.style.opacity = "0.4";
    mainElement.style.filter = "blur(5px)";
    mainElement.classList.add("disabled");

    paginationContainer.style.opacity = "0.4";
    paginationContainer.style.filter = "blur(5px)";
    paginationContainer.classList.add("disabled");

    footer.style.opacity = "0.4";
    footer.style.filter = "blur(5px)";
    footer.classList.add("disabled");

    document.body.style.cursor = "default";
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
    renderBlur(modal);
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
    renderBlur(modal);
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
            if (searchedBook) {
                setCurrentPage(1, searchedBook);
            }
        });
    });
}

function handleDeleteBook(target) {
    const booksArray = JSON.parse(localStorage.getItem("books"));
    const oldPageCount = Math.ceil(booksArray.length / paginationLimit);

    const remainingBooks = booksArray.filter(
        (book) => book.bookId !== parseInt(target.dataset.id)
    );
    localStorage.setItem("books", JSON.stringify(remainingBooks));
    handleModalClose();
    searchInput.value = "";

    const updatedBooksArray = JSON.parse(localStorage.getItem("books"));
    const newPageCount = Math.ceil(updatedBooksArray.length / paginationLimit);

    if (newPageCount < oldPageCount) {
        const pageNumbers = Array.from(
            document.querySelectorAll(".pagination-number")
        );
        const removedPage = pageNumbers.find((pageNumber) => {
            const pageIndex = Number(pageNumber.getAttribute("page-index"));

            if (pageIndex === oldPageCount) {
                return pageNumber;
            }
        });
        paginationNumbers.removeChild(removedPage);
    }
    setCurrentPage(newPageCount, updatedBooksArray);
}

function handleModalClose() {
    document.querySelector(".modal").remove();
    mainElement.style.opacity = "1";
    mainElement.style.filter = "none";
    mainElement.classList.remove("disabled");

    paginationContainer.style.opacity = "1";
    paginationContainer.style.filter = "none";
    paginationContainer.classList.remove("disabled");

    footer.style.opacity = "1";
    footer.style.filter = "none";
    footer.classList.remove("disabled");
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

    const updatedBooksArray = JSON.parse(localStorage.getItem("books"));
    const newPageCount = Math.ceil(updatedBooksArray.length / paginationLimit);

    if (newPageCount > currentPage) {
        getPaginationNumbers(currentPage + 1, newPageCount);
        handlePageButtons();
    }
    setCurrentPage(currentPage, updatedBooksArray);
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

initialRender();
