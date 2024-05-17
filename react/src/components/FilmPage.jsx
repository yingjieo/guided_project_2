import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Characters from './Characters';
import Planets from './Planets';


const FilmPage = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const film = await fetch(`http://localhost:3000/api/films/${id}`)
                    .then(res => res.json());

                setData(film);
            }
            catch (error) {
                console.error("Error fetching film:", error);
            }
        };

        fetchData();
    }, []);

    // Need to provide default values so it is never undefined
    const characters = data?.characters || [{}]
    const planets = data?.planets || [{}];

    return (
        <>
            <h1 id="name">Name: {data?.title}</h1>
            <section id="generalInfo">
                <p>Released: <span id="released">{data?.release_date}</span></p>
                <p>Producer(s): <span id="producer">{data?.producer}</span></p>
                <p>Director: <span id="director">{data?.director}</span></p>
                <p>Episode: <span id="episode">{data?.episode_id}</span></p>
                <p><span id="opening_crawl">{data?.opening_crawl}</span></p>
                {/* <section id="starWars">
                    <div className="crawl">
                        <span id="opening_crawl"></span>
                    </div>
                </section> */}
            </section>

            <section id="characters">
                <h2>Characters</h2>
                <ul><Characters data={characters} frontPage={false}/></ul>
            </section>

            <section id="planets">
                <h2>Planets</h2>
                <ul><Planets data={planets} /></ul>
            </section>
        </>
    );
};

export default FilmPage;