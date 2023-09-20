import React from "react";

export default function SearchBar() {
    return (
        <div class="search-bar">
            <input
                class="search-input"
                placeholder="Search books"
                type="text"
            />
            <button class="button" id="add-button">
                Add Book
            </button>
        </div>
    );
}
