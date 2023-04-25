function PopupWithForm({isOpen, name, onClose, title, children, submitText}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}   >
            <div className="popup__container">
                <button className="popup__close"
                        onClick={onClose}>
                    </button>
                <h2 className="popup__title">{title}</h2>
                <form id={`popup-${name}`} className="popup__form" noValidate>
                    {children}
                    <button
                        type="submit"
                        className="popup__save"
                        name="submit"
                       defaultValue={submitText}>
                        {submitText}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
