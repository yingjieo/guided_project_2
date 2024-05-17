import React from 'react';
import { Link } from 'react-router-dom';


const CharacterButton = (props) => {
    const link = `/characters/${props.data.id}`

    return (
        <div>
            <Link to={link}>{props.data.name}</Link>
        </div>
    );
};

export default CharacterButton;