//LOAD THE EXPRESS MODULE, express returns a function.
const express = require('express');

// call the express function which will return an express object
// we call it app by convention.
const app = express();

// lines 2 and 6: represents our application

//methods: all correspond to HTTP verbs!
    // app.get()
    // app.post()
    // app.put()
    // app.delete()


//app.get takes two arguments, route of the website and callback func.
//the callback is called when we have a request to this http end point.
//callback function AKA route handler.
app.get('/', (req, res) => {
    //request object: properties: which give us information of INCOMING request.
    res.send('Hello World')    
})

//define new route by definine app.get...
//We can organize our routes by putting all related routes in separate files.
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})

app.listen(3000, (err) => {
    if(err){
        console.log('error!')
    } else {
        console.log('Smooth sailing on port 3000!')
    }
})