const axios = require('axios');

const normalizeArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.drivers)) return data.drivers;
  if (data && Array.isArray(data.data)) return data.data;
  const arr = data && Object.values(data).find(v => Array.isArray(v));
  return arr || [];
};

exports.list = async (req, res) => {
  try {
    const { q, ...otherQueries } = req.query;
    const resp = await axios.get('https://api.openf1.org/v1/drivers', { params: otherQueries });
    let data = normalizeArray(resp.data);

    if (q) {
      const qLower = q.toLowerCase();
      data = data.filter(item => {
        const name = `${item.givenName || ''} ${item.familyName || ''}`.toLowerCase();
        return name.includes(qLower);
      });
    }
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Error fetching drivers from OpenF1' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { driverId } = req.params;
    const resp = await axios.get(`https://api.openf1.org/v1/drivers/${driverId}`);
    const data = resp.data && (resp.data.driver || resp.data) || null;
    res.json({ success: true, data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Error fetching driver from OpenF1' });
  }
};
