let tableData = [
    {id: "1",book: "Book1",author: "Author1",lender: "UserC",borrower: "UserB",action: "-"},
    {id: "2",book: "Book2",author: "Author2",lender: "UserC",borrower: "-",action: "-"},
    {id: "3",book: "Book3",author: "Author3",lender: "UserD",borrower: "UserC",action: "-"},
    {id: "4",book: "Book4",author: "Author4",lender: "UserA",borrower: "-",action: "-"},
    {id: "5",book: "Book5",author: "Author5",lender: "UserA",borrower: "-",action: "-"},
    {id: "6",book: "Book6",author: "Author6",lender: "UserB",borrower: "UserA",action: "-"}
]

const table = document.getElementById("info-table");
const addTableRow = (data) => {
    const row = document.createElement("tr")
    row.className = "element"
    row.setAttribute("id", `row-${data.id}`)
    row.innerHTML = `
    <td id="id-${data.id}">${data.id}</td>
    <td id="book-${data.id}">${data.book}</td>
    <td id="author-${data.id}">${data.author}</td>
    <td id="lender-${data.id}">${data.lender}</td>
    <td id="borrower-${data.id}">${data.borrower}</td>
    <td  id="action-${data.id}">${data.action}</td>`
    table.appendChild(row);
}

const printTable = () => {
    tableData.forEach(data => {
        addTableRow(data, "element")
    })
   document.getElementById("logged-in-user-name").innerText = "No user logged in"
}
printTable();   

let loggedInUser = ""
let isUserLogin = false

const changeLoggedInUser = () => {
    const user = document.getElementById("logged-user");
    const userID = document.getElementById("logged-in-user-name");
    if (isUserLogin) {
        logoutUser(userID)
    }
    tableData.forEach(data => {
        if (data.lender == user.value) {
            userID.innerText = `Logged in user: ${user.value}`
            isUserLogin = true
            loggedInUser = user.value
        }
    });
    if (isUserLogin){
        showLoginAttribute();
    }
    else{
        window.location.reload();
    }
}

const logoutUser = (userID) => {
    userID.innerText = "No user logged in"
    isUserLogin = false
    loggedInUser = ""
    const lastRow = document.getElementById(`row-${tableData.length+1}`)
    lastRow.remove()
}

const showLoginAttribute = () => {
    addBookAttribute();
    returnBookAttribute();
    borrowBookAttribute();
}

const addBook = () => {
    const lastRow = document.getElementById(`row-${tableData.length + 1}`)
    if(document.getElementById("newBook").value != "" && document.getElementById("newAuthor").value != ""){    
        const data = {
            id: tableData.length + 1,
            book: document.getElementById("newBook").value,
            author: document.getElementById("newAuthor").value,
            lender: loggedInUser,
            borrower: "-",
            action: "-"
        }
        lastRow.remove() 
        tableData.push(data)
        addTableRow(data)
        addBookAttribute()
    }
    else{
        alert("Please fill all the fields")
    }
}

const addBookAttribute = () => {
    const data = {
        id: tableData.length + 1,
        book: `<input type="text" id="newBook" placeholder="title"></input>`,
        author: `<input type="text" id="newAuthor" placeholder="author"></input>`,
        lender: loggedInUser,
        borrower: "-",
        action: `<button onClick="addBook()">Add Book</button>` 
    }
    addTableRow(data);
}
const borrowBookAttribute = () => {
    tableData.forEach((data) => {
        if (data.borrower == "-" && data.lender != loggedInUser) {
            let action = document.getElementById(`action-${data.id}`)
            action.innerHTML = `<button id=borrow-button-${data.id} onClick="borrowBook(${data.id})">Borrow</button>`
        }
    });
}

const borrowBook = (id) => {
    const borrower = document.getElementById(`borrower-${id}`)
    const action = document.getElementById(`action-${id}`)
    borrower.innerText = loggedInUser
    tableData[id - 1].borrower = loggedInUser
    action.innerHTML = `<button id=borrow-button-${id} onClick="returnBook(${id})">Return</button>`
}

const returnBookAttribute = () => {
    tableData.forEach((data) => {
        let action = document.getElementById(`action-${data.id}`)
        if (data.borrower == loggedInUser) {
            action.innerHTML = `<button id=return-button-${data.id} onClick="returnBook(${data.id})">Return</button>`
        }
        else{
            action.innerHTML="-"
        }
    });
}

const returnBook = (id) => {
    const borrower = document.getElementById(`borrower-${id}`)
    const action = document.getElementById(`action-${id}`)
    borrower.innerText = "-"
    tableData[id - 1].borrower = "-"
    action.innerHTML = `<button id=borrow-button-${id} onClick="borrowBook(${id})">Borrow</button>`
}