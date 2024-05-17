import React from 'react';
import FilmButton from './FilmButton';


const Films = (props) => {

    return (
        <>
            {
                props.data.map((film) => (
                    <li>
                        <FilmButton data={film} />
                    </li>

                ))
            }
        </>
    );
};

export default Films;