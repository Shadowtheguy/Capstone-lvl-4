import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function translateToSearch(string) {
  return string.replaceAll(" ", "+");
}

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

  async function filterCreatedDecks(listData) {
    const formattedList = await Promise.all(
      listData.map(async (deckData) => {
        const deck = getDeckList(deckData);

        // Fetch image if deck has one
        if (deck.deckPicture) {
          try {
            const cardInfo = await fetchDeckImage(deck.deckPicture);
            deck.deckImageUrl = cardInfo.cardPicture;
          } catch (err) {
            console.error("Failed to fetch deck image", err);
          }
        }

        return deck;
      }),
    );

    setCreatedDecks(formattedList);
  }

  // Getting Card Images
  function getCardinfo(cardData) {
    return {
      cardName: cardData.name,
      manaCost: cardData.mana_cost,
      cardType: cardData.type_line,
      cardDescription: cardData.oracle_text,
      cardPicture: cardData.image_uris.art_crop,
    };
  }

  function fetchDeckImage(deckPicture) {
    const fetchCard = translateToSearch(deckPicture);

    return fetch("http://localhost:3001/api/MTGcardTest/" + fetchCard)
      .then((response) => response.json())
      .then(getCardinfo);
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
      <section className="container mt-4">
        <div className="row">
          {createdDecks.map((deck, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={deck.deckImageUrl}
                  className="card-img-top"
                  alt={deck.deckTitle}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-white">{deck.deckTitle}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default DeckScreen;
