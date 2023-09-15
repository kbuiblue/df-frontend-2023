import { booksData } from "./booksData";

document.querySelector("#add-button").addEventListener("click", () => {
    renderModal();
    renderSelect();
    setTimeout(attachEventListeners(), 1000);
});

function renderBooks() {
    booksData.forEach((book) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.topic}</td>
            <td class="delete-button">Delete</td>
        `;

        document.querySelector("tbody").appendChild(newRow);
    });
}

function renderSelect() {
    const topicsArray = booksData.map((book) => book.topic);

    topicsArray.forEach((topic) => {
        const optionElement = document.createElement("option");

        optionElement.value = topic;
        optionElement.text = topic;

        document.querySelector("select").appendChild(optionElement);
    });
}

function renderModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-top">
            <h2>Add Book</h2>
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
    document.querySelector("main").style.opacity = "0.8";
    document.querySelector("main").style.filter = "blur(5px)";
}

function handleModalClose() {
    document.querySelector(".modal").remove();
    document.querySelector("main").style.opacity = "1";
    document.querySelector("main").style.filter = "none";
}

function handleSubmitForm(event) {
    event.preventDefault();
}

function attachEventListeners() {
    document
        .querySelector(".close-icon")
        .addEventListener("click", handleModalClose);
    document
        .querySelector(".modal")
        .addEventListener("submit", handleSubmitForm);
}

renderBooks();
