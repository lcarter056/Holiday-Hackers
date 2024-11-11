
//load express lib and create app
const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  res.render('home');

});


const server = app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});