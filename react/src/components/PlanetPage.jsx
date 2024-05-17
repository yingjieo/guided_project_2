import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Characters from './Characters';
import Films from './Films';

const PlanetPage = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const planet = await fetch(`http://localhost:3000/api/planets/${id}`)
                    .then(res => res.json());

                setData(planet);
            }
            catch (error) {
                console.error("Error fetching planet:", error);
            }
        };

        fetchData();
    }, []);

    // Need to provide default values so it is never undefined
    const characters = data?.characters || [{}];
    const films = data?.films || [{}]

    return (
        <>
            <h1 id="name">Name: {data?.name}</h1>
            <section id="generalInfo">
                <p>Climate: <span id="climate">{data?.climate}</span></p>
                <p>Surface water: <span id="surface_water">{data?.surface_water}</span></p>
                <p>Diameter: <span id="diameter">{data?.diameter}</span></p>
                <p>Rotation period: <span id="rotation_period">{data?.rotation_period}</span></p>
                <p>Terrain: <span id="terrain">{data?.terrain}</span></p>
                <p>Gravity: <span id="gravity">{data?.gravity}</span></p>
                <p>Orbital period: <span id="orbital_period">{data?.orbital_period}</span></p>
                <p>Population: <span id="population">{data?.population}</span></p>
            </section>

            <section id="characters">
                <h2>Characters</h2>
                <ul><Characters data={characters} frontPage={false}/></ul>
            </section>

            <section id="films">
                <h2>Films</h2>
                <ul><Films data={films} /></ul>
            </section>
        </>
    );
};

export default PlanetPage;