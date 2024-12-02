
const { neon } = require("@neondatabase/serverless");

const sql = neon("postgresql://HolidayHackers_owner:r6WSgcZ5bXuE@ep-snowy-bush-a5jfjett.us-east-2.aws.neon.tech/HolidayHackers?sslmode=require");


const updateFlight = async (flightNumber, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time) => {
const code = [];

if(arrivalGate != ""){
    await sql`
    UPDATE "Flights" 
    SET arrive_Gate = ${arrivalGate}
    WHERE flight_Number = ${flightNumber}
  `;
}
if(departGate != ""){
      await sql`
      UPDATE "Flights" 
      SET depart_Gate = ${departGate}
      WHERE flight_Number = ${flightNumber}
    `;
  }
  if(arrivalGate != ""){
    await sql`
    UPDATE "Flights" 
    SET arrive_Gate = ${arrivalGate}
    WHERE flight_Number = ${flightNumber}
  `;
}
if(departGate != ""){
      await sql`
      UPDATE "Flights" 
      SET depart_Gate = ${departGate}
      WHERE flight_Number = ${flightNumber}
    `;
  }

  if(arrivalGate != ""){
    await sql`
    UPDATE "Flights" 
    SET arrive_Gate = ${arrivalGate}
    WHERE flight_Number = ${flightNumber}
  `;
}
if(departGate != ""){
      await sql`
      UPDATE "Flights" 
      SET depart_Gate = ${departGate}
      WHERE flight_Number = ${flightNumber}
    `;
  }

  if(cost != ""){
    await sql`
    UPDATE "Flights" 
    SET "cost" = ${cost}
    WHERE flight_Number = ${flightNumber}
  `;
}
if(duration != ""){
      await sql`
      UPDATE "Flights" 
      SET duration = ${duration}
      WHERE flight_Number = ${flightNumber}
    `;
  }

  if(end_city != ""){
    await sql`
    UPDATE "Flights" 
    SET "end-city" = ${end_city}
    WHERE flight_Number = ${flightNumber}
  `;
}
if(start_city != ""){
      await sql`
      UPDATE "Flights" 
      SET "start-city" = ${start_city}
      WHERE flight_Number = ${flightNumber}
    `;
  }

  if(depart_Time != ""){
    await sql`
    UPDATE "Flights" 
    SET depart_time = ${depart_Time}
    WHERE flight_Number = ${flightNumber}
  `;
}

if(arrival_Time != ""){
    await sql`
    UPDATE "Flights" 
    SET arrival_time = ${arrival_Time}
    WHERE flight_Number = ${flightNumber}
  `;
}
}


module.exports = { updateFlight };
