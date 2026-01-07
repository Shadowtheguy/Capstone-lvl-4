import express from "express";
import supabase from "./supabase.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//* Reference Object
const cardListForReference =
  "1 Academy Manufactor\n1 Alchemist's Talent\n1 Amulet of Vigor\n1 Ancient Copper Dragon\n1 Beast Within\n1 Big Score\n1 Birds of Paradise\n1 Blasphemous Act\n1 Bootleggers' Stash\n1 Chaos Warp\n1 City of Death\n1 Crime Novelist\n1 Cultivate\n1 Deflecting Swat\n1 Delighted Halfling\n1 Displaced Dinosaurs\n1 Doubling Season\n1 Elvish Mystic\n1 Enduring Courage\n1 Fanatic of Rhonas\n1 Fiery Emancipation\n1 Generous Plunderer\n1 Goblin Anarchomancer\n1 Goldspan Dragon\n1 Great Train Heist\n1 Hellkite Charger\n1 Hellkite Tyrant\n1 Helm of the Host\n1 Heroic Intervention\n1 Karlach, Fury of Avernus\n1 Kibo, Uktabi Prince\n1 Kona, Rescue Beastie\n1 Leyline Tyrant\n1 Lightning Greaves\n1 Llanowar Elves\n1 Magda, Brazen Outlaw\n1 Magda, the Hoardmaster\n1 Old Gnawbone\n1 Omnath, Locus of Mana\n1 Panharmonicon\n1 Parallel Lives\n1 Professional Face-Breaker\n1 Ragavan, Nimble Pilferer\n1 Reckless Fireweaver\n1 Rhythm of the Wild\n1 Rootcast Apprenticeship\n1 Sakura-Tribe Elder\n1 Sarinth Greatwurm\n1 Second Harvest\n1 Solphim, Mayhem Dominus\n1 Swiftfoot Boots\n1 Tireless Provisioner\n1 Toski, Bearer of Secrets\n1 Unexpected Windfall\n1 Unwinding Clock\n1 Wulfgar of Icewind Dale\n1 Xorn\n\n1 Roxanne, Starfall Savant";

const deckShape = {
  deck_title: "Test Deck Roxanne", //text
  deck_author: "Shadowtheguy", //text
  format: "Commander", //text
  card_list: cardListForReference, //text
  custom_cards: false, //boolean
};

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/mtgdecks/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("MTG Deck Manager")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) {
    return res.status(404).json({ error: error.message });
  }

  res.status(200).json(data)
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
