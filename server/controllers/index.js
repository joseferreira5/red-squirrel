const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Item = require('../models/item');
const db = require('../db');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const SALT_ROUNDS = 11;
const TOKEN_KEY = 'areallylonggoodkey';

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await new User({
      username,
      email,
      password_digest,
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(
      'You made it to the signUp controller, but there was an error :('
    );
    return res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      const token = jwt.sign(payload, TOKEN_KEY);
      return res.status(201).json({ user, token });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyUser = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, TOKEN_KEY);
    res.json({ user });
  } catch (e) {
    res.status(401).send('Not Authorized');
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ username: username });

    if (await bcrypt.compare(oldPassword, user.password_digest)) {
      password_digest = await bcrypt.hash(newPassword, SALT_ROUNDS);
      await User.findByIdAndUpdate(user._id, { password_digest });
      res.status(200).send('Updated Password');
    } else {
      return res.status(401).send('Password does not match');
    }
  } catch (error) {
    console.log("there's an error");
    return res.status(500).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await User.findById({ _id: userId }).populate('items');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    // Find user by id and then find specific item requested
    const { itemId } = req.params;
    const item = await Item.findById({ _id: itemId });
    if (item) {
      return res.json(item);
    }
    res.status(404).json({ message: 'Item not found!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const item = await new Item(rest);
    await item.save();
    await User.findByIdAndUpdate(
      { _id },
      { $push: { items: item._id } },
      { upsert: true }
    );
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndUpdate(id, req.body, { new: true }, (error, item) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!item) {
      return res.status(404).json({ message: 'Item not found!' });
    }
    res.status(200).json(item);
  });
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('Item deleted');
    }
    throw new Error('Item not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  verifyUser,
  changePassword,
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
};
