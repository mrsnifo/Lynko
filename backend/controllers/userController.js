const User = require('../models/User');
const Link = require('../models/Link');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password -email');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const links = await Link.find({ user: user._id, active: true }).sort('order');

    res.json({
      username: user.username,
      displayName: user.displayName,
      bio: user.bio,
      links
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { displayName, bio } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { displayName, bio },
      { new: true, runValidators: true }
    ).select('-password -email');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};