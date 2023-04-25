import React from 'react';
import '../App.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    return (
        <div className="page">
            <Header/>
            <Main
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                handleCardClick={() => setSelectedCard}/>
            <Footer/>
            <PopupWithForm name="edit-profile" className="profile-edit"
                           onClose={closeAllPopups}
                           isOpen={isEditProfilePopupOpen}
                           title='Редактировать профиль'
                           submitText='Сохранить'>
                <input name='userName' id="edit-name-input" type="text" placeholder="Ваше имя"
                       minLength="2" maxLength="40"
                       required
                       className="popup__input popup__input_type_name"/>
                <span id="edit-name-input-error" className="popup__input-span popup__input-span_type_name"></span>
                <input name='userProfession' id="edit-profession-input" type="text"
                       minLength="2" maxLength="200"
                       required
                       placeholder="О себе"
                       className="popup__input popup__input_type_profession"/>
                <span id="edit-profession-input-error"
                      className="popup__input-span popup__input-span_type_profession"></span>
            </PopupWithForm>
            <PopupWithForm name="add-form"
                           className="card-add"
                           onClose={closeAllPopups}
                           isOpen={isAddPlacePopupOpen}
                           title='Новое место'
                           submitText='Сохранить'>
                <input name='cardName' id="add-name-input" type="text" placeholder="Название" minLength="2"
                       maxLength="30" required
                       className="popup__input popup__input_type_name"/>
                <span id="add-name-input-error" className="popup__input-span"></span>
                <input name='cardSrc' id="add-url-input" type="url" placeholder="Ссылка на картинку" required
                       className="popup__input popup__input_type_profession"/>
                <span id="add-url-input-error" className="popup__input-span popup__input-span_type_profession"></span>
            </PopupWithForm>
            <PopupWithForm name="delete-card-form"
                           className="delete-card"
                           title='Вы уверены?'
                           submitText='Да'
            >
            </PopupWithForm>
            <PopupWithForm name="new-avatar-form"
                           className="new-avatar"
                           onClose={closeAllPopups}
                           isOpen={isEditAvatarPopupOpen}
                           title='Обновить аватар'
                           submitText='Сохранить'>
                <input name='newAvatar' id="change-new-avatar" type="url" placeholder="Ссылка на картинку" minLength="2"
                       maxLength="infinity" required
                       className="popup__input popup__input_type_name"/>
                <span id="change-new-avatar-error" className="popup__input-span"></span>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
    );
}

export default App;
