import React from 'react';


const Characters = (props) => {
    return (
        <>
            {
                props.data.map((character) => (
                    <p>{character.name}</p>
                ))
            }
        </>
    );
};

export default Characters;