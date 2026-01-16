import { useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//* Helper Functions
function translateToSearch(string) {
  return string.replaceAll(" ", "+");
}

function App() {
  //* Variables
  const [deckList, setDeckList] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const currentSearch = useRef("");

  //* Decoding the Deck List
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

  //* Filtering Information
  function getDeckListTemp(deckData) {
    return {
      deckTitle: deckData.deck_title,
      deckAuthor: deckData.deck_author,
      format: deckData.format,
      cardList: parseCardList(deckData.card_list),
      hasCustomCards: deckData.custom_cards,
    };
  }

  function getCardinfo(cardData) {
    return {
      cardName: cardData.name,
      manaCost: cardData.mana_cost,
      cardType: cardData.type_line,
      cardDescription: cardData.oracle_text,
      cardPicture: cardData.image_uris.normal,
    };
  }

  //* Fetch the Deck List
  function tempDeckChange(event) {
    event.preventDefault();

    fetch("http://localhost:3000/mtgdecks/1")
      .then((response) => response.json())
      .then(getDeckListTemp)
      .then(setDeckList);
  }

  //* Fetch the Searched Card
  function fetchCard(cardName) {
    const fetchCard = translateToSearch(cardName);

    fetch("http://localhost:3001/api/MTGcard/" + fetchCard)
      .then((response) => response.json())
      .then(getCardinfo)
      .then(setCurrentCard);
  }

  function searchForCard(event) {
    event.preventDefault();
    fetchCard(currentSearch.current.value);
  }

  //*HTML
  return (
    <>
      <section>
        <h1 className="text-center">Creative Deck-nique!</h1>
        <hr />
        <div className="row d-flex align-items-center">
          <button
            className="col-3 text-center btn btn-outline-danger"
            onClick={tempDeckChange}
          >
            Decks
          </button>
          <button className="col-3 text-center btn btn-outline-danger">
            Card Maker
          </button>
          <label className="col-2 text-center text-danger">Card Search:</label>
          <input
            type="text"
            ref={currentSearch}
            className="col-3 bg-secondary border border-danger"
          />
          <button onClick={searchForCard} className="btn btn-danger col-1">
            Search
          </button>
        </div>
        <hr />
      </section>
      <section>
        <div className="row">
          <div className="col-7 border-end">
            <h2 className="text-center">Deck List:</h2>
            <ul>
              {deckList &&
                deckList.cardList.map((card, index) => (
                  <li key={index}>
                    {card.qty}{" "}
                    <button
                      className="btn btn-link p-0 text-danger"
                      onClick={() => fetchCard(card.name)}
                    >
                      {card.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-5 text-center">
            {currentCard && (
              <>
                <h3>{currentCard.cardName}</h3>
                <img
                  src={currentCard.cardPicture}
                  alt={currentCard.cardName}
                  className="img-fluid rounded"
                />
                <p>{currentCard.cardType}</p>
                <p>{currentCard.cardDescription}</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
