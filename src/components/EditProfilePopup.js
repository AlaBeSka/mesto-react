import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
      } 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);


    return (
        <PopupWithForm name="edit-profile" className="profile-edit"
                           onClose={onClose}
                           isOpen={isOpen}
                           onSubmit={handleSubmit}
                           isLoading = {isLoading}
                           title='Редактировать профиль'
                           submitText='Сохранить'>
                <input name='userName' id="edit-name-input" type="text" placeholder="Ваше имя"
                       minLength="2" maxLength="40"
                       required
                       className="popup__input popup__input_type_name"
                       value={name}
                       onChange={handleChangeName}/>
                <span id="edit-name-input-error" className="popup__input-span popup__input-span_type_name"></span>
                <input name='userProfession' id="edit-profession-input" type="text"
                       minLength="2" maxLength="200"
                       required
                       placeholder="О себе"
                       className="popup__input popup__input_type_profession"
                       value={description}
                       onChange={handleChangeDescription}/>
                <span id="edit-profession-input-error"
                      className="popup__input-span popup__input-span_type_profession"></span>
            </PopupWithForm>
    )
}

export default EditProfilePopup;