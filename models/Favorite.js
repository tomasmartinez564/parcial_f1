const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  givenName: String,
  familyName: String,
  nationality: String,
  notes: String,
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
