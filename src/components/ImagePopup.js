import React from "react";

function isCardSelected(card) {
    return card && Object.keys(card).length > 0 ? 'popup_is-opened' : '';
}

function ImagePopup(props) {
    return (
        <div name="popup_photo" className={`popup popup_type_photo ${isCardSelected(props.card)}`}>
            <figure className="popup__caption">
                <button name='popup-photo-close' className="popup__close" onClick={props.onClose}></button>
                <img src={props.card.src} alt={props.card.alt} className="popup__image"/>
                <figcaption className="popup__figcaption">{props.card.cardName}</figcaption>
            </figure>
        </div>
    );
}
export default ImagePopup;

