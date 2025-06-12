function displayQuotes(quotes) {
    const listElement = document.getElementById("quotes");
    if (!listElement) return;
    listElement.innerHTML = "";
    quotes.forEach(quote => {
        const li = document.createElement("li");
        li.textContent = quote;
        listElement.appendChild(li);
    });
}

function checkQuotes() {
    const savedQuotes = localStorage.getItem("pride-prejudice");
    if (savedQuotes) {
        const quotes = JSON.parse(savedQuotes);
        displayQuotes(quotes);
        document.getElementById("quote-button").classList.add("hide");
    }
}

async function loadQuotes() {
    try {
        const response = await fetch("quotes.json"); 
        if (!response.ok) {
            throw new Error("Data not fetched");
        }
        const data = await response.json();
        const prideBook = data.books.find(book => book.title === "Pride and Prejudice");
        if (!prideBook) {
            throw new Error("Book not found");
        }
        const quotes = prideBook.quotes;
        localStorage.setItem("pride-prejudice", JSON.stringify(quotes));

        document.getElementById("quote-button").classList.add("hide");
        displayQuotes(quotes);
    } catch (error) {
        console.error("Error:", error);
    }
}

checkQuotes();
document.getElementById("quote-button").addEventListener("click", loadQuotes);