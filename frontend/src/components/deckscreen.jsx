import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeckScreen() {
  //* Navigation
  const navigate = useNavigate();

  //* Variables
  const [createdDecks, setCreatedDecks] = useState([]);

  //* Functions
  // Filtering the deck items
  function parseCardList(cardListString) {
    return cardListString
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const firstSpace = line.indexOf(" ");
        return {
          qty: parseInt(line.slice(0, firstSpace), 10),
          name: line.slice(firstSpace + 1),
        };
      });
  }
  
  function getDeckList(deckData) {
    return {
      deckTitle: deckData.deck_title,
      deckAuthor: deckData.deck_author,
      format: deckData.format,
      cardList: parseCardList(deckData.card_list),
      hasCustomCards: deckData.custom_cards,
      deckPicture: deckData.deck_picture,
    };
  }
  
  function filterCreatedDecks(listData) {
    const formattedList = listData.map(getDeckList);
    setCreatedDecks(formattedList);

    console.log(formattedList);
  }
  
  // Set Up Page
  useEffect(() => {
    fetch("http://localhost:3000/mtgdecks")
      .then((response) => response.json())
      .then(filterCreatedDecks);
  }, []);

  //*HTML
  return (
    <>
      <section>
        <hr />
        <div className="row">
          <div className="col-3"></div>
          <h1 className="text-center col-6">Creative Deck-nique!</h1>
          <button
            className="col-1 m-1 btn btn-danger loginbuttons"
            onClick={() => navigate("/LogIn")}
          >
            Log In
          </button>
          <button
            className="col-1 m-1 btn btn-danger loginbuttons"
            onClick={() => navigate("/LogIn")}
          >
            Sign Up
          </button>
        </div>
      </section>
      <hr />
      <section>
        <div className="row d-flex align-items-center gap-2">
          <button
            className="col-3 text-center btn btn-outline-danger"
            onClick={() => navigate("/Decks")}
          >
            Decks
          </button>
          <button
            className="col-3 text-center btn btn-outline-danger"
            onClick={() => navigate("/CustomCard")}
          >
            Card Maker
          </button>
          <label className="col-2 text-end text-danger">Card Search:</label>
          <input
            type="text"
            className="col-2 bg-secondary border border-danger"
          />
          <button className="btn btn-danger col-1">Search</button>
        </div>
      </section>
      <hr />
    </>
  );
}

export default DeckScreen;
