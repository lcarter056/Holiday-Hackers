const { neon } = require("@neondatabase/serverless");

const sql = neon(
  "postgresql://HolidayHackers_owner:r6WSgcZ5bXuE@ep-snowy-bush-a5jfjett.us-east-2.aws.neon.tech/HolidayHackers?sslmode=require"
);

const NewDestination = async (color, drink, superpower, element, food) => {
  try {
    const destAttributes = [
      { destination: "Monterrey", attributes: { color: "Green", drink: "Soda", superpower: "Flight", element: "Water", food: "Chocolate" } },
      { destination: "Dallas", attributes: { color: "Pink", drink: "Coffee", superpower: "Telepathy", element: "Fire", food: "Pizza" } },
      { destination: "Las Vegas", attributes: { color: "Pink", drink: "Soda", superpower: "Invisibility", element: "Fire", food: "Pizza" } },
      { destination: "Miami", attributes: { color: "Green", drink: "Tea", superpower: "Telepathy", element: "Water", food: "Chocolate" } },
      { destination: "San Francisco", attributes: { color: "Yellow", drink: "Coffee", superpower: "Flight", element: "Earth", food: "Soup" } },
      { destination: "Phoenix", attributes: { color: "Pink", drink: "Soda", superpower: "Invisibility", element: "Water", food: "Chocolate" } },
      { destination: "Baltimore", attributes: { color: "Yellow", drink: "Tea", superpower: "Flight", element: "Earth", food: "Soup" } }
    ];
      let bestMatch = null;
      let highestMatch = 0;

      for (const dest of destAttributes) {
        let count = 0;
      
        if (dest.attributes.color === color) count++;
        if (dest.attributes.drink === drink) count++;
        if (dest.attributes.superpower === superpower) count++;
        if (dest.attributes.element === element) count++;
        if (dest.attributes.food === food) count++;

        if (count > highestMatch) {
          highestMatch = count;
          bestMatch = dest.destination;
        }
      
    } 
  
    return bestMatch;
  
} catch (error) {
    console.error("Error determining destination:", error);
    return null;
  }
};

module.exports = { NewDestination };
