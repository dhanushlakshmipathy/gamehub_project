/*
  Lightweight RAWG seeder.
  Usage: node scripts/seedRawg.js
  Make sure .env has RAWG_API_KEY and MONGO_URI set.
*/
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Game = require('../models/Game');

async function main(){
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true });
  console.log('Connected to Mongo for seeding');

  const apiKey = process.env.RAWG_API_KEY;
  if(!apiKey){ console.error('Missing RAWG_API_KEY in .env'); process.exit(1); }

  try{
    const res = await axios.get('https://api.rawg.io/api/games', {
      params: { key: apiKey, page_size: 20 }
    });
    const games = res.data.results || [];
    for(const g of games){
      const doc = {
        rawgId: g.id,
        title: g.name,
        slug: g.slug,
        released: g.released,
        platforms: (g.platforms||[]).map(p=>p.platform.name),
        genres: (g.genres||[]).map(gg=>gg.name),
        cover: g.background_image
      };
      try {
        await Game.updateOne({ rawgId: g.id }, { $set: doc }, { upsert: true });
        console.log('Upserted', g.name);
      } catch(e){
        console.error('Upsert error', e.message);
      }
    }
    console.log('Seeding complete');
    process.exit(0);
  } catch(err){
    console.error('RAWG fetch error', err.message);
    process.exit(1);
  }
}

main();
