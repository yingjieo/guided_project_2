import React from 'react';
import { Link } from 'react-router-dom';


const FilmButton = (props) => {
    const link = `/films/${props.data.id}`

    return (
        <div>
        <Link to={link}>{props.data.name}</Link>
        </div>
    );
};

export default FilmButton;