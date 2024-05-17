import React from 'react';
import CharacterButton from './CharacterButton';


const Characters = (props) => {
    if (props.frontPage) {
        return (
            <section id="charactersList">
                {
                    props.data.map((character) => (
                        <li>
                            <CharacterButton data={character} />
                        </li>

                    ))
                }
            </section>
        );
    }
    else {
        return (
            <>
                {
                    props.data.map((character) => (
                        <li>
                            <CharacterButton data={character} />
                        </li>

                    ))
                }
            </>
        );
    }
};

export default Characters;