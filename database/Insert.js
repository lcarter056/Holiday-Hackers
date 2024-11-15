
const { neon } = require("@neondatabase/serverless");

const sql = neon("postgresql://HolidayHackers_owner:r6WSgcZ5bXuE@ep-snowy-bush-a5jfjett.us-east-2.aws.neon.tech/HolidayHackers?sslmode=require");

const insertFlight = async (flightNumber, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time) => {
  try {
    const result = await sql`
      INSERT INTO "Flights" (flight_Number, arrive_Gate, depart_Gate, "cost", duration, "end-city", "start-city", depart_Time, arrival_Time)
      VALUES (${flightNumber}, ${arrivalGate}, ${departGate}, ${cost}, ${duration}, ${end_city}, ${start_city}, ${depart_Time}, ${arrival_Time})
      RETURNING flight_Number;
    `;
    return result[0]; 
  } catch (error) {
    console.error("Error inserting flight record data:", error);
    throw error;
  }
};

module.exports = { insertFlight }; 