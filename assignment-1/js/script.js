import { booksData } from "./booksData";

function renderBooks() {
    const tbody = document.querySelector("tbody");

    booksData.forEach((book) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.topic}</td>
            <td class="delete-button">Delete</td>
        `;

        tbody.appendChild(newRow);
    });
}

renderBooks();
