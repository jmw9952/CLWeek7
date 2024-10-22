// let express = require('express');
// require as import
// STORE STEP 0 install and load LOWDB module
import express from 'express'
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

let app = express();

let bookTracker = [];

// app.get('/', (request,response)=>{
//     response.send('this is the main page');
// })


// STORE STEP 1 connect to the database
const defaultData = { bookTrackerData: [] };
const adapter = new JSONFile('db.json'); // telling node db to create new json file and use it to process data
const db = new Low(adapter, defaultData); // asking lowdb to utalize lowdb json file to create the data from an empty array


app.use('/', express.static('public'));
app.use(express.json());


// add route on server that is listening to POST request
app.post('/bookList', (request, response)=>{
    console.log(request.body);
    let currentDate = Date();
    console.log(currentDate);
    let obj = {
        date: currentDate,
        book: request.body.title
    }

    // bookTracker.push(obj);
    // console.log(bookTracker);

    // STORE STEP 2 add values to the database
    db.data.bookTrackerData.push(obj);
    db.write()
    .then(() => {
      //send message back to the client
      response.json({ 'msg' : "success" });
    });

    // response.json({task:"success"});
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('listening at ', port);
});


// app.listen(5000,()=>{
//     console.log('listening at localhost:5000');
// })

//add route to get all book tracking info
app.get('/getBooks', (request, response)=>{
    // let obj = {data: bookTracker};
    // STORE STEP 3 fetch from the database

    db.read()
    .then(() => {
    //save the messages to an object
    let obj = {data : db.data.bookTrackerData};
    //send the messages to the client
    response.json(obj);
    });
})