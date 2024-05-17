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

    // async function fetchFilms(characterID) {
    //     const url = `http://localhost:3000/api/characters/${characterID}/films`;
    //     const films = await fetch(url)
    //         .then(res => res.json())
    //     return films;
    // }


    // Need to provide default values so it is never undefined
    const homeworld = data?.homeworld || [{}];
    const films = data?.films || [{}]

    return (
        <>
            <h1 id="name">Name: {data?.name}</h1>
            <section id="generalInfo">
                <p>Height: {data?.height} cm</p>
                <p>Mass: {data?.mass} kg</p>
                <p>Born: {data?.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <PlanetButton data={homeworld[0]} />
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <Films data={films} />
                <ul></ul>
            </section>

        </>
    );
};

export default CharacterPage;