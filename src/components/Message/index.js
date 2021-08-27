import React from 'react';
import '../../App.css'

let counter = 60

export const Message = ({text}) => {
    return (
        <div className="warningBlock">
            <h1>{ text }</h1>
            <p>Покиньте страницу в течение {counter} секунд</p>
        </div>
    )
};  