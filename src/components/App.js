import React from 'react';
import { Api } from '../utils/Api';
import '../App.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {options} from '../utils/constant';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

    const api = new Api(options);

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

    React.useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if(isOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    React.useEffect(() => {
        Promise.all([api.getInfoProfile(), api.getInitialCards()])
        .then(([data, cards]) => {
            setCurrentUser(data);
            setCards(cards);
        })
        .catch((err) => console.log(err));
    },[]);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        const method = isLiked ? 'deleteLike' : 'setLike';
        api[method](card._id)
          .then((newCard) => {
            const index = cards.findIndex((c) => c._id === card._id);
            setCards((state) => {
              const newCards = [...state];
              newCards[index] = newCard;
              return newCards;
            });
          })
          .catch((err) => console.log(err));
      }

    function handleDeleteCard(card) {
        api.deleteCard(card._id)
          .then(() => {
            const index = cards.findIndex((c) => c._id === card._id);
            const newCards = [...cards];
            newCards.splice(index, 1);
            setCards(newCards);
          })
          .catch((err) => console.log(err));
      }
    
    function handleUpdateUser(data) {
        setIsLoading(true);
        api
            .editProfile(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true);
        api
            .changeAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleAddPlace(newCard) {
        setIsLoading(true);
        api
            .createCard(newCard)
            .then((newCard) =>{
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header/>
            <Main
                cards = {cards}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                handleCardClick={() => setSelectedCard}
                handleCardLike={() => handleCardLike}
                handleDeleteCard={() => handleDeleteCard}/>
            <Footer/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                              isLoading={isLoading}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                             isLoading={isLoading}/>
            <AddPlacePopup  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}  onAddPlace={handleAddPlace}
                              isLoading={isLoading}/>
            <PopupWithForm name="delete-card-form"
                           className="delete-card"
                           title='Вы уверены?'
                           submitText='Да'
            >
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
