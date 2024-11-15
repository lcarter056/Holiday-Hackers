
const { neon } = require("@neondatabase/serverless");

const sql = neon("postgresql://HolidayHackers_owner:r6WSgcZ5bXuE@ep-snowy-bush-a5jfjett.us-east-2.aws.neon.tech/HolidayHackers?sslmode=require");

const DeleteFlight = async (flightNumber) => {
  try {
    const result = await sql`
      DELETE FROM "Flights" 
      WHERE flight_Number = ${flightNumber}
      RETURNING flight_Number;
    `;
    if (result.length == 0) {
        return { message: "No flight found"};
    }
    else {
        return { message: "Flight Deleted"}
    }
  } catch (error) {
    console.error("Error Deleting flight record data:", error);
    throw error;
  }
};

module.exports = { DeleteFlight }; 