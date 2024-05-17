import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = process.env.PORT;

const client = await MongoClient.connect(url);
const db = client.db(dbName);

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        let { id } = req.params;

        const agg = [
            {
                '$match': {
                    'id': Number(id)
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
        const films = aggregation[0]; // only one object in the array

        res.json(films["films_res"]); // name will change depending on what you named it in agg

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        let { id } = req.params;
        const agg = [
            {
                '$match': {
                    'id': Number(id)
                }
            }, {
                '$lookup': {
                    'from': 'characters',
                    'localField': 'id',
                    'foreignField': 'homeworld',
                    'as': 'planet_characters'
                }
            }, {
                '$project': {
                    '_id': 0,
                    'id': 1,
                    'planet_characters': 1
                }
            }
        ]

        const collection = db.collection('planets');
        const aggregation = await collection.aggregate(agg).toArray();
        const characters = aggregation[0];

        res.json(characters["planet_characters"]);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const agg = [
            {
                '$match': {
                    'id': +req.params.id
                }
            }, {
                '$lookup': {
                    'from': 'films_planets',
                    'localField': 'id',
                    'foreignField': 'film_id',
                    'as': 'films_planets'
                }
            }, {
                '$lookup': {
                    'from': 'planets',
                    'localField': 'films_planets.planet_id',
                    'foreignField': 'id',
                    'as': 'planets_res'
                }
            }, {
                '$project': {
                    '_id': 0,
                    'planets_res': 1
                }
            }
        ]

        const collection = db.collection('films');
        const aggregation = await collection.aggregate(agg).toArray();
        const planets = aggregation[0];

        res.json(planets["planets_res"]);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/planets/:id', async (req, res) => {
    try {
        let { id } = req.params;

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
        const collection = db.collection("planets");
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/films', async (req, res) => {
    try {
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
        const collection = db.collection('characters');
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

// returns a character + info on their homeworld (an array of size 1) and films (array)
app.get('/api/characters/:id', async (req, res) => {
    try {
        const grabbedId = req.params.id;

        // const characters = await collection.find({ "id": Number(grabbedId) }).toArray();

        const agg = [
            {
              '$match': {
                'id': +req.params.id
              }
            }, {
              '$lookup': {
                'from': 'planets', 
                'localField': 'homeworld', 
                'foreignField': 'id', 
                'as': 'homeworld'
              }
            }, {
              '$lookup': {
                'from': 'films_characters', 
                'localField': 'id', 
                'foreignField': 'character_id', 
                'as': 'character_films'
              }
            }, {
              '$lookup': {
                'from': 'films', 
                'localField': 'character_films.film_id', 
                'foreignField': 'id', 
                'as': 'films'
              }
            }, {
              '$project': {
                'character_films': 0
              }
            }
          ];

          const collection = db.collection('characters');
          const cursor = collection.aggregate(agg);
          const characters = await cursor.toArray();

        res.json(characters[0]);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/films/:id', async (req, res) => {
    try {
        // const films = await collection.find({ "id": Number(grabbedId) }).toArray();

        const agg = [
            {
              '$match': {
                'id': +req.params.id
              }
            }, {
              '$lookup': {
                'from': 'films_characters', 
                'localField': 'id', 
                'foreignField': 'film_id', 
                'as': 'characters_films'
              }
            }, {
              '$lookup': {
                'from': 'characters', 
                'localField': 'characters_films.character_id', 
                'foreignField': 'id', 
                'as': 'characters'
              }
            }, {
              '$lookup': {
                'from': 'films_planets', 
                'localField': 'id', 
                'foreignField': 'film_id', 
                'as': 'planets_films'
              }
            }, {
              '$lookup': {
                'from': 'planets', 
                'localField': 'planets_films.planet_id', 
                'foreignField': 'id', 
                'as': 'planets'
              }
            }, {
              '$project': {
                'characters_films': 0, 
                'planets_films': 0
              }
            }
          ];

        const collection = db.collection("films");
        const cursor = collection.aggregate(agg);
        const film = await cursor.toArray(0);

        res.json(film[0]);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const agg = [
            {
                '$match': {
                    'id': +req.params.id
                }
            }, {
                '$lookup': {
                    'from': 'films_characters',
                    'localField': 'id',
                    'foreignField': 'character_id',
                    'as': 'characters_films'
                }
            }, {
                '$lookup': {
                    'from': 'films',
                    'localField': 'characters_films.film_id',
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

        const collection = db.collection('characters');
        const aggregation = await collection.aggregate(agg).toArray();
        const films = aggregation[0];

        res.json(films["films_res"]);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const agg = [
            {
                '$match': {
                    'id': +req.params.id
                }
            }, {
                '$lookup': {
                    'from': 'films_characters',
                    'localField': 'id',
                    'foreignField': 'film_id',
                    'as': 'films_characters'
                }
            }, {
                '$lookup': {
                    'from': 'characters',
                    'localField': 'films_characters.character_id',
                    'foreignField': 'id',
                    'as': 'characters_res'
                }
            }, {
                '$project': {
                    '_id': 0,
                    'characters_res': 1
                }
            }
        ]

        const collection = db.collection('films');
        const aggregation = await collection.aggregate(agg).toArray();
        const characters = aggregation[0];

        res.json(characters["characters_res"]);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Got lost in the galaxy somewhere far far away...");
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    client.close();
    process.exit(0);
});