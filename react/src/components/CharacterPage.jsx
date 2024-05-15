import React from 'react';
import Characters from "./Characters"





const CharacterPage = (props) => {
    async function fetchHomeworld(homeworldID) {
        const url = `http://localhost:3000/api/planets/${homeworldID}`;
        const planet = await fetch(url)
            .then(res => res.json())
        console.log(planet[0].name)
        return planet[0].name;
    }
    async function fetchFilms(characterID) {
        const url = `http://localhost:3000/api/character/${characterID}/films`;
        const films = await fetch(url)
            .then(res => res.json())
        return films;
    }
        return (
            <>
                <h1 id="name">Name: {props?.data?.name}</h1>
                <section id="generalInfo">
                    <p>Height: {props?.data?.height} cm</p>
                    <p>Mass: {props?.data?.mass} kg</p>
                    <p>Born: {props?.data?.birth_year}</p>
                </section>
                <section id="planets">
                    <h2>Homeworld</h2>
                    <p>{props?.data?.birth_year}</p>
                    {/* <div>{fetchHomeworld(props?.data?.homeworld)}</div> */}



                </section>
                <section id="films">
                    <h2>Films appeared in</h2>
                    <p>Grab Film here</p>
                    <div>{fetchFilms(props?.data?.id)}</div>
                
                    <ul></ul>
                </section>

            </>
        );
    };

    export default CharacterPage;