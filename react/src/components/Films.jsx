import React from 'react';
import FilmButton from './FilmButton';


const Films = (props) => {

    return (
        <>
            {
                props.data.map((film) => (
                    <FilmButton data = {film}  />
                    
                ))
            }
        </>
    );
};

export default Films;