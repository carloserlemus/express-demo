//LOAD THE EXPRESS MODULE, express returns a function.
const express = require('express');
const Joi = require('joi');

// call the express function which will return an express object
// we call it app by convention.
const app = express();


//for post
app.use(express.json()) //Adding a piece of middleware.

//PORT
//global object: process, property:env, environment variable: port.
//A more dynamic way to set the port.
const port = process.env.PORT || 3000;

// Course Array
const courses = [
    { id: 1, name:'course1' },
    { id: 2, name:'course2' },
    { id: 3, name:'course3' }
]


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
    res.send('Hello World!!!')    
})

//define new route by definine app.get...
//We can organize our routes by putting all related routes in separate files.
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

//setting up a route to get a SINGLE course.
//we are looking to create a route that functions like...
// /api/courses/# where hashtag is the ID of the course.
// the key is the :, it helps us define a parameter.
// in the request object, req.params.id allows us to read the parameter.
// WE CAN HAVE MULTIPLE PARAMETERS IN A ROUTE.

/*
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
})

*/
 
// Code that makes it so we can find courses by id.
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course with given id not found.')
    res.send(course);

    /*
    .find (method available to all arrays in JS).
    .find(func); we pass a function to find a course with a given criteria
    The idea is that we right a function that returns a boolean value.
        Boolean value determines whether this is the course we're looking for.
    req.params.id RETURNS string, c.id returns a number.
        Which is why we use parseInt.
    We store all that information in a constant called course.

    if logic:
        the if logic is such that the course doesn't have a value
        we return a response with an error status code (convention)

    */
})

// POST METHOD

app.post('/api/courses', (req, res) => {
    //joi - define schema
    const { error } = validateCourse(req.body); //result.error
    if (error){
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course) //convention: we return the course object to the client.
});


//Update Handler.

app.put('/api/courses/:id', (req, res) => {
    // Look up the course.
    // if not existing, return a 404.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course with given id not found.')

    // validate course
    // if invalid, return 400 bad request.
    const { error } = validateCourse(req.body); //result.error
    if (error){
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;

    // return the update course
    res.send(course)
} )

//DELETE REQUEST
app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    //if doesnt exist, return 404.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course with given id not found.')


    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the deleted course.
    res.send(course)
})





function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

}

// In addition we can get query string parameters
// These are params that we add in the URL after a question mark.
// Used for additional data/backend services.

app.listen(port, (err) => {
    if(err){
        console.log('error!')
    } else {
        console.log(`Listening to port ${port}...`);
    }
})