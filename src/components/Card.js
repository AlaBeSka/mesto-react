import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked && "element__like-button_active"}`;


    function handleClick() {
        onCardClick(card);
    }

    function handleCardLike() {
        onCardLike(card)
    }

    function handleDeleteCard() {
        onCardDelete(card)
    }


return(
        <article className="element">
            <div className="element__photocard">
                <img src={card?.link} alt={card.name} className="element__image" 
                     onClick={handleClick}/>
                {isOwn && (<button name='popup-Card-delete' className="element__delete-button"
                                   onClick={handleDeleteCard}>
                </button>)}
            </div>
            <div className="element__vote">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}>
                    </button>
                    <p className="element__counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
)
}

export default Card;