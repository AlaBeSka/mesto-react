import React from "react";

function isCardSelected(card) {
    return card && Object.keys(card).length > 0 ? 'popup_is-opened' : '';
}

function ImagePopup({card, onClose}) {
    return (
        <div name="popup_photo" className={`popup popup_type_photo ${isCardSelected(card)}`}>
            <figure className="popup__caption">
                <button name='popup-photo-close' className="popup__close" onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__image"/>
                <figcaption className="popup__figcaption">{card.name}</figcaption>
            </figure>
        </div>
    );
}
export default ImagePopup;

