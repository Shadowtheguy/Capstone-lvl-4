import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [deckList, setDeckList] = useState(null);

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

  function getDeckListTemp(deckData) {
    return {
      deckTitle: deckData.deck_title,
      deckAuthor: deckData.deck_author,
      format: deckData.format,
      cardList: parseCardList(deckData.card_list),
      hasCustomCards: deckData.custom_cards,
    };
  }

  function tempDeckChange(event) {
    fetch("http://localhost:3000/mtgdecks/1")
      .then((response) => response.json())
      .then(getDeckListTemp)
      .then(setDeckList);

  }

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
            className="col-3 bg-secondary border border-danger"
          />
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
                    {card.qty} {card.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
