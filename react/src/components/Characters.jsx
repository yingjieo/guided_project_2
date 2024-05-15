import React from 'react';
import CharacterPage from './CharacterPage';
import CharacterButton from './CharacterButton';


const Characters = (props) => {

    return (
        <>
            {
                props.data.map((character) => (
                    <CharacterButton data = {character}  />
                    
                ))
            }
        </>
    );
};

export default Characters;