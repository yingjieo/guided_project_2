import React from 'react';
import Characters from "./Characters"

async function fetchHomeworld(homeworldID) {
    const url = 'localhost:3000';
    const planet = await fetch(url)
      .then(res => res.json())
    return planet;
  }
  
//   async function fetchFilms(character) {
//     const url = `${baseUrl}/characters/${character?.id}/films`;
//     const films = await fetch(url)
//       .then(res => res.json())
//     return films;

const CharacterPage = (props) => {
    
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
                <p>{props?.data?.homeworld}</p> 
                {/* homeworld on brings back id here */}
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <p>Grab Film here</p>
                <ul></ul>
            </section>

        </>
    );
};

export default CharacterPage;