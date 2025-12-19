const Link = require('../models/Link');

exports.getLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.userId }).sort('order');
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLink = async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = await Link.create({ user: req.userId, title, url });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const link = await Link.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.json({ message: 'Link deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};