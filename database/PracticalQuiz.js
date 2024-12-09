
const { neon } = require("@neondatabase/serverless");

const sql = neon("postgresql://HolidayHackers_owner:r6WSgcZ5bXuE@ep-snowy-bush-a5jfjett.us-east-2.aws.neon.tech/HolidayHackers?sslmode=require");

const FindDestination = async (duration, trip_type, activity, budget, distance) => {
  try {
    let destTable = await sql`
    SELECT DISTINCT ON (d.location) 
      d.location AS "Destination", 
      d.airport_code AS "AirPortCode", 
      f.flight_Number AS "FlightNumber",
      f.depart_Time AS "FlightDepart",
      f.duration AS "Duration", 
      f."cost" AS "FlightCost",
      a.tag AS "ActivityTag",
      a.name AS "ActivityName", 
      a.price AS "ActivityCost", 
      0 AS "Points"
    FROM "Destinations" d
    JOIN "Attractions" a ON d.airport_code = a.airport_code
    LEFT JOIN "Flights" f ON f."end-city" = d.location
    WHERE a.tag = ${activity}
    ORDER BY d.location, f."cost" ASC;

  `;

   if (distance == "FarAway"){
        destTable = destTable.filter(dest => dest.Duration > 160);
        
    }
   
   else if (distance == "Nearby"){
        destTable = destTable.filter(dest => dest.Duration < 160); 
   } 
 

   const destsTripType = [
    {"Monterrey": ["Urban", "Tropical"]},
    {"Dallas": ["Urban", "Urban"]},
    {"Las Vegas": ["Urban", "Scenic"]},
    {"Miami": ["Tropical", "Urban"]},
    {"San Francisco": ["Scenic", "Urban"]},
    {"Phoenix": ["Urban", "Scenic"]},
    {"Baltimore": ["Urban", "Urban"]}
  ];
  
  for(let i=0; i < destTable.length; i++) {
    let city = destTable[i].Destination;
    let dest = destsTripType.find(d =>Object.keys(d)[0] === city)
    let tripTypes = Object.values(dest)[0];
       
    sum = tripTypes.filter(type => type === trip_type).length;
    destTable[i].Points = sum;
    
   if(budget == "Limited"){  
    if (destTable[i].FlightCost > 265){
        destTable[i].Points-=1;
        }
    }
  }

  if(budget == "Limited"){  
  destTable.sort((a, b) => a.ActivityCost - b.ActivityCost);
  if (destTable.length > 0){
    destTable[0].Points+=2
    
  }
  if (destTable.length > 1){
    destTable[1].Points+=1
  }
}
let topTwo = destTable.sort((a, b) => a.ActivityCost - b.ActivityCost).slice(0, 2);
let topOneHotel = await sql`
    SELECT h.name AS hotelName, h.cost as hotelCost
    FROM "Hotel" h
    WHERE h.airport_code = ${topTwo[0].AirPortCode}
     ORDER BY cost ASC
     `

 let topOneRest = await sql`
    SELECT r.restaraunts_name AS restName, r.cost AS restCost
    FROM "Restaraunts" r
    WHERE r.airport_code = ${topTwo[0].AirPortCode}
    ORDER BY cost ASC
`
   if(budget == "Limited"){
    rest = topOneRest[0];
    hotel = topOneHotel[0];
   }
   else {
    rest = topOneRest[1];
    hotel = topOneHotel[1];
   }

return {topTwo, rest, hotel};
  
  } catch (error) {
    console.error("Error getting all destinations", error);
    throw error;
  }

};

module.exports = { FindDestination }; 