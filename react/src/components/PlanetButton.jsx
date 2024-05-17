import React from 'react';
import { Link } from 'react-router-dom';


const PlanetButton = (props) => {
    const link = `/planets/${props.data.id}`

    return (
        <div>
            <Link to={link}>{props.data.name}</Link>
        </div>
    );
};

export default PlanetButton;