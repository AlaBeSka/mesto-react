function PopupWithForm({isOpen, name, onClose, title, children, submitText, onSubmit, isLoading}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}   >
            <div className="popup__container">
                <button className="popup__close"
                        onClick={onClose}>
                    </button>
                <h2 className="popup__title">{title}</h2>
                <form id={`popup-${name}`} className="popup__form"
                      onSubmit={onSubmit}>
                    {children}
                    <button
                        type="submit"
                        className="popup__save"
                        name="submit"
                       defaultValue={submitText}>
                        {isLoading ? "Сохранение..." : submitText || "Сохранить"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
