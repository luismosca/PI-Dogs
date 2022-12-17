import React from "react";
import '../Dogs/DogsCards.css'
import { NavLink } from 'react-router-dom'


const DogCards = (props) => {
    console.log("estoy en DogsCards")
    //console.log(props.id)
    //console.log(props.name)
    return (
        <div className="cards" style={{backgroundImage: `url(${props.image})`}}>
            <div className="dog-info-container">
                <div className="black-box">
                    <div className="info-container">
                        <h3>{props.name}</h3>
                        <h3>{props.temperament}</h3>
                        <h3>{props.weight} Kg.</h3>
                    </div>
                <div className="div-button">
                    {props.id && (
                        <NavLink to={`/breeds/${props.id}`}>
                            <button className="Link">Dog Details</button>
                        </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
            
    )
}

export default DogCards
