// console.log("hello from app.js")
window.addEventListener('load', ()=>{
    document.getElementById('book-button').addEventListener('click', ()=>{
        let bookTitle = document.getElementById('book-name').value;
        console.log(bookTitle);

        //creating the object
        let obj = {"title" : bookTitle};
        
        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fethch the route 
        fetch('/bookList', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})
        //make a fetch request of type POST to send info to the server
    })

    document.getElementById('get-tracker').addEventListener('click', ()=> {
        //get info on ALL of the books that have been read so far
        fetch('/getBooks')
        .then(response => response.json())
        .then(data => {
            document.getElementById('book-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length;i++) {
                let string = data.data[i].date + " : " + data.data[i].book;
                let element = document.createElement('p');
                element.innerHTML = string;
                document.getElementById('book-info').appendChild(element);
            }
        })
    })
})