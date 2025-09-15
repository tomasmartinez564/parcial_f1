const axios = require('axios');
const Favorite = require('../models/Favorite');

exports.list = async (req, res) => {
  try {
    const list = await Favorite.find().sort({ addedAt: -1 });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { driverId, notes } = req.body;
    if (!driverId) return res.status(400).json({ success: false, message: 'driverId es obligatorio' });

    let driverInfo = {};
    try {
      const resp = await axios.get(`https://api.openf1.org/v1/drivers/${driverId}`);
      driverInfo = resp.data && (resp.data.driver || resp.data) || {};
    } catch (e) { driverInfo = {}; }

    const fav = new Favorite({
      driverId,
      givenName: driverInfo.givenName || req.body.givenName,
      familyName: driverInfo.familyName || req.body.familyName,
      nationality: driverInfo.nationality || req.body.nationality,
      notes
    });
    await fav.save();
    res.status(201).json({ success: true, data: fav });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const fav = await Favorite.findById(req.params.id);
    if (!fav) return res.status(404).json({ success: false, message: 'Favorite no encontrado' });
    res.json({ success: true, data: fav });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const fav = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fav) return res.status(404).json({ success: false, message: 'Favorite no encontrado' });
    res.json({ success: true, data: fav });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const fav = await Favorite.findByIdAndDelete(req.params.id);
    if (!fav) return res.status(404).json({ success: false, message: 'Favorite no encontrado' });
    res.json({ success: true, message: 'Borrado correctamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
