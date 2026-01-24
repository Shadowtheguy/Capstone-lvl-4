import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <hr />
        <div className="row">
          <div className="col-3"></div>
          <h1 className="text-center col-6">Creative Deck-nique!</h1>
          <button className="col-1 m-1 btn btn-danger loginbuttons">
            Log In
          </button>
          <button className="col-1 m-1 btn btn-danger loginbuttons">
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
      <section>
        <p className="m-2 text-center">
          Welcome to my website! Here you can make deck lists for Magic the
          Gathering, as well as create custom cards for proxy use! Want to put
          those theoretical cards in a decklist? Go on ahead! Make sure to log
          in so you can save your progress. To get started, just click on one of
          the buttons above.
        </p>
      </section>
    </>
  );
}

export default FrontPage;
