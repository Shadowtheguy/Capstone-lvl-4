import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {


  return (
    <>
      <section>
        <h1 className="text-center">Creative Deck-nique!</h1>
        <hr />
        <div className="row d-flex align-items-center">
          <button className="col-3 text-center btn btn-outline-danger">Decks</button>
          <button className="col-3 text-center btn btn-outline-danger">Card Maker</button>
          <label className="col-2 text-center text-danger">Card Search:</label>
          <input type="text" className="col-3 bg-secondary border border-danger" />
        </div>
        <hr />
      </section>
      <section>
        <h2>Deck List:</h2>
      </section>
    </>
  );
}

export default App;
