        //Seletcing popup-show-btn,popup-overlay,popup-close
        let popupoverlay = document.getElementById("popup-overlay")
        let popupshowbtn = document.getElementById("popup-show-btn")
        let cancelbtn = document.getElementById("cancel-btn")
        let contentboxcontainer = document.querySelector(".contentbox-container")

        popupshowbtn.addEventListener("click", function () {
            popupoverlay.style.display = "block"
        })
        cancelbtn.addEventListener("click", function () {
            popupoverlay.style.display = "none"
        })

        // selecting the inputs
        let titleinput = document.getElementById("book-title")
        let authorinput = document.getElementById("book-author")
        let textarea = document.getElementById("short-description")

        // seleting add-btn
        let addbtn = document.getElementById("add-btn")
        let books = []
        addbtn.addEventListener("click", function () {
            if (titleinput.value === "" || authorinput.value === "" || textarea.value === "") {
                alert("Please Fill the All Content")
                return
            }
            let book = {
                title: titleinput.value,
                author: authorinput.value,
                description: textarea.value
            }
            books.push(book)
            localStorage.setItem("books", JSON.stringify(books))
            displaybooks()
            popupoverlay.style.display = "none"
            titleinput.value = ""
            authorinput.value = ""
            textarea.value = ""

        })
        function displaybooks() {
            contentboxcontainer.innerHTML = ""
            books.forEach(function (book, index) {
                let div = document.createElement("div")
                div.setAttribute("class", "content-box")
                div.innerHTML = `<h1>${book.title}</h1>
                            <h2>${book.author}</h2>
                            <p>${book.description}</p>
                            <button class="delete-btn" onclick="deletebook(${index})">Delete Book</button>`
                contentboxcontainer.append(div)
            })
        }
        function deletebook(index) {
            books.splice(index, 1)
            localStorage.setItem("books", JSON.stringify(books))
            displaybooks()
        }
        let storedbooks = JSON.parse(localStorage.getItem("books"))
        if (storedbooks) {
            books = storedbooks
            displaybooks()
        }