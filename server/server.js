import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = process.env.PORT;

const app = express();

app.get('/api/planets', async (req, res) => {
    try {
        res.json({"Planet": "Mars"});
        // const client = await MongoClient.connect(url);
        // const db = client.db(dbName);
        // const collection = db.collection(collectionName);
        // const planets = await collection.find({}).toArray();
        // res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});