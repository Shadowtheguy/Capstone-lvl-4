import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Microservice is running" });
});

app.get("/api/MTGcard/:name", async (req, res) => {
  const name = req.params.name

  const url = `https://api.scryfall.com/cards/named?fuzzy=${name}`

  console.log(`Fetching information for cards related to ${name}`)

  if(!name) {
    return res.status(404).json({ error: "Name Required" })
  }

  const response = await fetch(url);
  const data = await response.json();

  console.log(data)

  res.status(201).json(data)
})

app.listen(PORT, () => {
  console.log(`Microservice running on port ${PORT}`);
});
