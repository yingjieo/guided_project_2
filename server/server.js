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
        res.json({ "Planet": "Mars" });
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
app.get('/api/films', async (req, res) => {
    try {

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});
app.get('/api/characters', async (req, res) => {
    try {


        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");

        //console.log(`GRABBED ID ${grabbedId}`);

        const characters = await collection.find({}).toArray();


        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});
app.get('/api/characters/:id', async (req, res) => {
    try {
        const grabbedId = req.params.id;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        //console.log(`GRABBED ID ${grabbedId}`);
        const characters = await collection.find({ "id": Number(grabbedId) }).toArray();

        //console.log(films)
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});
app.get('/api/films/:id', async (req, res) => {
    try {
        const grabbedId = req.params.id;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");

        //console.log(`GRABBED ID ${grabbedId}`);

        const films = await collection.find({ "id": Number(grabbedId) }).toArray();

        console.log(films)
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});
app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const grabbedId = req.params.id;

        const client = await MongoClient.connect(url);
        
        const db = client.db(dbName);
        const collection = db.collection("films");
        //SEAN START here

        //console.log(`GRABBED ID ${grabbedId}`);

        const films = await collection.find({ "id": Number(grabbedId) }).toArray();

        console.log(films)
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const grabbedId = req.params.id;

        const client = await MongoClient.connect(url);
        const agg = [
             {
                '$match': {
                  'id': Number(grabbedId)
                }
              },
            {
                '$lookup': {
                    'from': 'films_characters',
                    'localField': 'id',
                    'foreignField': 'film_id',
                    'as': 'films_characters'
                }
            },
            {
                '$lookup': {
                    'from': 'characters',
                    'localField': 'films_characters.character_id',
                    'foreignField': 'id',
                    'as': 'films_characters'

                }
            },
            // {
            //     '$project': {
            //         'id': 1,
            //         'films_res': 1
            //     }
            // }
           


        ];


        const coll = client.db('swapi').collection('films');
        const cursor = coll.aggregate(agg);
        const result = await cursor.toArray();
        
  

        await client.close();



        res.json(result);
        //res.json(finalResult);


    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});