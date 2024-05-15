import React from 'react';
import { useParams } from 'react-router-dom';


const PlanetPage = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Planets</h1>
            <p> Planet {id} </p>
        </>
    );
};

export default PlanetPage;