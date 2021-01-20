import React from "react";
import cards from "../cardList";
import NavCard from "../Schemas/NavCardSchema";

function Cards(params) {
    return (
        <div style={{paddingTop: "6%"}}>
            <div className="mainCard" >
                    {cards.map(card => <NavCard 

                    key = {card.id}
                    id = {card.id}
                    heading = {card.heading} 
                    description = {card.description}
                    icon = {card.icon}
                    route = {card.route}
                    background = {card.background}
                    onClick = {params.onClick}

                    />)}
            </div>
        </div>
    );
}

export default Cards;