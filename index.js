const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

// set up express app
const app = express();

//use swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connect to mongodb
const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/`

const options = {
    useNewUrlParser: true
  }

MongoClient.connect(url, options, (err, database) => {
    if (err) {
      console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`)
      process.exit(1)
    }
    app.locals.db = database.db('api')
    app.listen(process.env.port || 4000, function(){
        console.log('now listening for requests');
        app.emit('APP_STARTED')
    });
  })

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});


// listen for requests
// app.listen(process.env.port || 4000, function(){
//     console.log('now listening for requests');
// });


// mongoose.connect(url);
// mongoose.Promise = global.Promise;
// mongoose.set('strictQuery', true);
