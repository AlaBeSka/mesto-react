import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const [avatar, setAvatar] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar });
    } 

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    return (
        <PopupWithForm
            name="new-avatar-form"
            className="new-avatar"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            title='Обновить аватар'
            submitText='Сохранить'
        >
            <input
                name='newAvatar'
                id="change-new-avatar"
                type="url"
                placeholder="Ссылка на картинку"
                minLength="2"
                required
                className="popup__input popup__input_type_name"
                value={avatar || ''}
                onChange={handleAvatarChange}
                ref={(input) => input && input.focus()}
            />
            <span id="change-new-avatar-error" className="popup__input-span"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;