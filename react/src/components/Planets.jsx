import React from 'react';
import PlanetButton from './PlanetButton';


const Planets = (props) => {
    return (
        <>
            {
                props.data.map((planet) => (
                    <li>
                        <PlanetButton data={planet} />
                    </li>

                ))
            }
        </>
    );
};

export default Planets;