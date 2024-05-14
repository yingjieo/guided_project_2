import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = process.env.PORT;

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        let { id } = req.params;

        const client = await MongoClient.connect(url);
        // const db = client.db(dbName);
        // const collection = db.collection("films_planets");

        // const planets = await collection.find({"planet_id" : Number(id)}).toArray();

        // const filmCollection = db.collection("films");
        // // const films = await collection.find()

        /*
         * Requires the MongoDB Node.js Driver
         * https://mongodb.github.io/node-mongodb-native
         */

        const agg = [
            {
                '$match': {
                  'id': 1
                }
              }, {
              '$lookup': {
                'from': 'films_planets', 
                'localField': 'id', 
                'foreignField': 'planet_id', 
                'as': 'planets_films'
              }
            }, {
              '$lookup': {
                'from': 'films', 
                'localField': 'planets_films.film_id', 
                'foreignField': 'id', 
                'as': 'films_res'
              }
            }, {
              '$project': {
                '_id': 0, 
                'films_res': 1
              }
            }
          ]

        const collection = client.db(dbName).collection('planets');
        const aggregation = await collection.aggregate(agg).toArray(); // aggregated array
        await client.close();
        const films = aggregation[0]; // only one object in the array

        res.json(films["films_res"]); // name will change depending on what you named it in agg

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/planets/:id', async (req, res) => {
    try {
        let { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");

        const planets = await collection.find({ "id": Number(id) }).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});