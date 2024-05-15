import React from 'react';


const Characters = (props) => {

    return (
        <>
            {
                props.data.map((character) => (
                    <div>{character.name}</div>
                ))
            }
        </>
    );
};

export default Characters;