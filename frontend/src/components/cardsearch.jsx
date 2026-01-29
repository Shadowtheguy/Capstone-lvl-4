import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//* Helper Functions
function translateToSearch(string) {
  return encodeURIComponent(string);
}

function CardSearch() {
  //* Navigation
  const navigate = useNavigate();

  //* Search
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  //* Variables
  const [currentSearch, setCurrentSearch] = useState(initialQuery);
  const [currentCards, setCurrentCards] = useState([]);
  const microserviceURL = import.meta.env.VITE_MICROSERVICE_URL

  //* Functions
  // Filtering Information
  function getCardinfo(cardData) {
    return {
      cardName: cardData.name,
      manaCost: cardData.mana_cost,
      cardType: cardData.type_line,
      cardDescription: cardData.oracle_text,
      cardPicture:
        cardData?.image_uris?.normal ||
        "https://via.placeholder.com/223x310?text=No+Image",
    };
  }

  // Fetching
  function fetchCard(cardName) {
    const fetchCardName = translateToSearch(cardName);

    fetch(`${microserviceURL}/api/MTGcard/` + fetchCardName)
      .then((response) => response.json())
      .then((data) => {
        const cardsArray = data.data || [];
        const cards = cardsArray.map(getCardinfo);
        setCurrentCards(cards);
      });
  }

  function searchForCard(event) {
    event.preventDefault();
    navigate(`/CardSearch?query=${encodeURIComponent(currentSearch)}`);
    fetchCard(currentSearch);
  }

  //* Search on Page Startup
  useEffect(() => {
    if (currentSearch) fetchCard(currentSearch);
  }, []);

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
            value={currentSearch}
            onChange={(event) => setCurrentSearch(event.target.value)}
          />
          <button className="btn btn-danger col-1" onClick={searchForCard}>
            Search
          </button>
        </div>
      </section>
      <hr />
      <section className="container mt-4">
        <div className="row">
          {currentCards?.map((card, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={card.cardPicture}
                  className="card-img-top"
                  alt={card.cardName}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-white">{card.cardName}</h5>
                  <p className="card-text">{card.cardType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CardSearch;
