const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// Initial route
app.get("/", (req, res) => {
  res.send("TourMate server is running...");
});

// MongoDB connection
const uri = "mongodb+srv://tourmate:2tBf52kCMWGaLExg@cluster0.iwxuiom.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    const allCountryDetails = client
      .db("tourmate")
      .collection("countryDetails");
    const adminInfo = client.db("tourmate").collection("adminInfo");

    // Authenticate the admin
    app.get("/admin", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await adminInfo.findOne(query);
      if (result) {
        res.send(true);
      } else {
        res.send(false);
      }
    });

    // Get all country details
    app.get("/allcountrydetails", async (req, res) => {
      const cursor = allCountryDetails.find({});
      const costs = await cursor.toArray();
      res.send(costs);
    });

    //  Get country details by country name
    app.get("/allcountrydetails/:country", async (req, res) => {
      const country = req.params.country;
      const query = { country_name: country };
      const result = await allCountryDetails.findOne(query);
      res.send(result);
    });

    // Get country details by budget
    app.patch("/allcountrydetails", async (req, res) => {
      const budget = parseInt(req.query.budget);
      const query = { total_cost: { $lte: budget } };
      const result = await allCountryDetails.find(query).toArray();
      if (result.length === 0) {
        res.send([{ country_name: "No country found" }]);
      } else {
        res.send(result);
      }
    });

    // Updating country data by country from database
    app.patch("/updatecost/:country", async (req, res) => {
      const country = req.params.country;
      const { airfare_cost, accommodation_cost, meals_cost, total_cost } =
        req.body;
      const query = { country_name: country };
      const updateDoc = {
        $set: {
          airfare_cost,
          accommodation_cost,
          meals_cost,
          total_cost,
        },
      };
      const result = await allCountryDetails.updateOne(query, updateDoc);
      res.send(result);
    });

    // Add new country to database
    app.post("/addcountry", async (req, res) => {
      const {
        country_name,
        capital_name,
        currency_code,
        cuisine,
        airfare_cost,
        accommodation_cost,
        meals_cost,
        total_cost,
      } = req.body;

      const result = await allCountryDetails.insertOne({
        country_name,
        capital_name,
        currency_code,
        cuisine,
        airfare_cost,
        accommodation_cost,
        meals_cost,
        total_cost,
      });
      res.send(result);
      console.log(result);
    });

    // Deleting country data by country from database
    app.delete("/deletecountry/:country", async (req, res) => {
      const country = req.params.country;
      const query = { country_name: country };
      const result = await allCountryDetails.deleteOne(query);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

// Server connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
