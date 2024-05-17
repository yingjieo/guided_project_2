import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlanetButton from './PlanetButton';
import Films from './Films';


const CharacterPage = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const character = await fetch(`http://localhost:3000/api/characters/${id}`)
                    .then(res => res.json());
                    
                setData(character);
            }
            catch (error) {
                console.error("Error fetching character:", error);
            }
        };

        fetchData();
    }, []);


    // Need to provide default values so it is never undefined
    const homeworld = data?.homeworld || [{}];
    const films = data?.films || [{}]

    return (
        <>
            <h1 id="name">Name: {data?.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height">{data?.height}</span> cm</p>
                <p>Mass: <span id="mass">{data?.mass}</span> kg</p>
                <p>Born: <span id="birth_year">{data?.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <ul><PlanetButton data={homeworld[0]} /></ul>
            </section>
            <section id="films">
                <h2>Films</h2>
                <ul><Films data={films} /></ul>
            </section>

        </>
    );
};

export default CharacterPage;