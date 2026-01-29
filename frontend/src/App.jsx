import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TestBuild from "./components/testbuild";
import FrontPage from "./components/frontpage";
import DeckScreen from "./components/deckscreen";
import CardBuilder from "./components/cardbuilder";
import CardSearch from "./components/cardsearch";
import DeckList from "./components/decklist";
import LogIn from "./components/login";

function App() {
  //* Variables
  const [user, setUser] = useState(
    sessionStorage.getItem('userInfo') || ''
  );

  //*HTML
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/Decks" element={<DeckScreen />} />
      <Route path="/CustomCard" element={<CardBuilder />} />
      <Route path="/DeckList" element={<DeckList />} />
      <Route path="/CardSearch" element={<CardSearch />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/TestBuild" element={<TestBuild />} />
    </Routes>
  );
}

export default App;
