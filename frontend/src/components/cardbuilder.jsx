import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CardBuilder() {
  const navigate = useNavigate();

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
    </>
  );
}

export default CardBuilder;
