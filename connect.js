

const http = require("http");
const { insertFlight } = require("./database/Insert"); 
const { DeleteFlight } = require("./database/Delete");   

const requestHandler = async (req, res) => {
  if (req.method === "POST" && req.url === "/insert-flight") {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const {flightNumber, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time} = JSON.parse(body);
        const insertedFlight = await insertFlight(flightNumber, arrivalGate, departGate, cost, duration, end_city, start_city, depart_Time, arrival_Time);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(insertedFlight));  
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error inserting flight data" }));
      }
    });
    
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
