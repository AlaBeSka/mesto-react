import React from "react";

function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }
return(
    <div id="card-add">
        <article className="element">
            <div className="element__photocard">
                <img src={card.src} alt={card.alt} className="element__image" onClick={handleClick}/>
                <button name='popup-Card-delete' className="element__delete-button">
                </button>
            </div>
            <div className="element__vote">
                <h2 className="element__title">{card.cardName}</h2>
                <div className="element__like">
                    <button type="button" className="element__like-button">
                    </button>
                    <p className="element__counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    </div>
)
}

export default Card;