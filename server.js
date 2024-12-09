
//load express lib and create app
const express = require('express');
const bodyParser = require('body-parser');
const { insertFlight } = require('./database/Insert');
const { DeleteFlight } = require('./database/Delete');
const { updateFlight } = require('./database/Update');
const { FindDestination } = require('./database/PracticalQuiz.js');


const app = express();

const { neon } = require("@neondatabase/serverless");

const sql = neon("postgresql://HolidayHackers_owner:r6WSgcZ5bXuE@ep-snowy-bush-a5jfjett.us-east-2.aws.neon.tech/HolidayHackers?sslmode=require");


// Middleware to parse URL-encoded form data. added to handle form submission
app.use(bodyParser.urlencoded({ extended: true }));  

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.get('/', async (req, res) => {
  res.render('index');
}
)

app.get('/quiz_home', async (req, res) => {
  res.render('quiz_home');
}
)

app.get('/practical-quiz-results', async (req, res) => {
  res.render('practical-quiz-results');
}
)

app.get('/dest', async (req, res) => {
  res.render('dest');
 }
)

app.get('/practical_quiz', async (req, res) => {
  res.render('practical_quiz');
 } 
)

app.get('/personality_quiz', async (req, res) => {
  res.render('personality_quiz');
 } 
)

app.get('/flights', async (req, res) => {
  const flights = await sql`
  SELECT * FROM "Flights"
`;

 allFlights = [];
   for (let flight of flights){
      allFlights.push({"flight_num" : flight.flight_number, 
        "arrive_gate": flight.arrive_gate, "depart_gate": flight.depart_gate, "cost":  flight.cost, "duration": flight.duration,
        "depart_time": flight.depart_time, "arrival_time": flight.arrival_time})
       
      }
  res.render('flights', {allFlights});

}
)

app.get('/admin_flights', async (req, res) => {
  const flights = await sql`
  SELECT * FROM "Flights"
`;
 allFlights = [];
   for (let flight of flights){
      allFlights.push({"flight_num" : flight.flight_number, 
        "arrive_gate": flight.arrive_gate, "depart_gate": flight.depart_gate, "cost":  flight.cost, "duration": flight.duration,
        "depart_time": flight.depart_time, "arrival_time": flight.arrival_time})
       
      }
  res.render('admin_flights');
  }
)

app.post('/add-flight', async (req, res) => {
  const {flightNumber, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time} = req.body;

  const flights = await sql`
  SELECT flight_Number FROM "Flights"
  `;
   
  let flightNums = [];
  for(let i = 0; i < flights.length; i++){
    flightNums.push((flights[i].flight_number).toString());
  }
   if(flightNums.includes(flightNumber)){
    res.send(
     '<script> alert("A flight already exists with this flight number. Please create a new flight number."); </script>'+
     '<script> window.location.href = "/admin_flights"; </script>'
      );
   } else {
    try {
    await insertFlight(flightNumber, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time);
    res.send(
      '<script> alert("flight record added!"); </script>'+
      '<script> window.location.href = "/admin_flights"; </script>'
      );
  } catch (error) {
    console.error('ERROR INSERTING FLIGHT');
  }
}
});


app.post('/update-flight', async (req, res) => {
  const {flightNumberUpdate, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time} = req.body;
    try {
    await updateFlight(flightNumberUpdate, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time);
    res.send(
      '<script> alert("flight record updated!"); </script>'+
      '<script> window.location.href = "/admin_flights"; </script>'
      );
  } catch (error) {
    console.error('ERROR UPDATING FLIGHT');
    res.status(500).json({
      message: "Error updating flight",
      error: error.message 
    });
  }
});

app.post('/delete-flight', async (req, res) => {
   const {flightNumberRemove} = req.body;
   try {
    await DeleteFlight(flightNumberRemove);
    res.send(
      '<script> alert("flight record deleted!"); </script>'+
      '<script> window.location.href = "/admin_flights"; </script>'
      );
   } catch (error) {
    console.error('ERROR DELETING FLIGHT');
   }
})

app.post('/submit-practical-quiz', async (req, res) => {
  const {duration, trip_type, activity, budget, distance} = req.body;
  try {
    let {topTwo, rest, hotel} = await FindDestination(duration, trip_type, activity, budget, distance);
    let resta = {"name" : rest.restname, "cost": rest.restcost};
    let hotelInfo = {"name" : hotel.hotelname, "cost": hotel.hotelcost};

    res.render('practical-quiz-results', {topTwo, resta, hotelInfo});
  } catch (error) {
    console.error('ERROR FINDING PRACTICAL QUIZ RESULTS: ' + error);
  }
})

app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});