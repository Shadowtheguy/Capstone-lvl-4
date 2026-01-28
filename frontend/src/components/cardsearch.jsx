import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//* Helper Functions
function translateToSearch(string) {
  return string.replaceAll(" ", "+");
}

function CardSearch() {
  //* Variables
  // Navigation
  const navigate = useNavigate();

  // Card Searching
  const [currentSearch, setCurrentSearch] = useState("")
  const [currentCards, setCurrentCards] = useState(null)

  //* Fetch Functions
  function fetchCard(cardName) {
    const fetchCard = translateToSearch(cardName);

    fetch("http://localhost:3001/api/MTGcard/" + fetchCard)
      .then((response) => response.json())
      .then(getCardinfo)
      .then(setCurrentCards);
  }

  function searchForCard(event) {
    event.preventDefault();
    fetchCard(currentSearch);
  }

  //* Search on Page Startup
  useEffect(() => {
    fetchCard(currentSearch)
  })

  return (
    <>
      <section>
        <hr />
        <div className="row">
          <div className="col-3"></div>
          <h1 className="text-center col-6">Creative Deck-nique!</h1>
          <button className="col-1 m-1 btn btn-danger loginbuttons" onClick={() => navigate("/LogIn")}>
            Log In
          </button>
          <button className="col-1 m-1 btn btn-danger loginbuttons" onClick={() => navigate("/LogIn")}>
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
      <section></section>
    </>
  );
}

export default CardSearch;
