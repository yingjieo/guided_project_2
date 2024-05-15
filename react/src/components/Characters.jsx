import React from 'react';
import CharacterPage from './CharacterPage';


const Characters = (props) => {

    return (
        <>
            {
                props.data.map((character) => (
                    <CharacterPage data = {character}  />
                    
                ))
            }
        </>
    );
};

export default Characters;