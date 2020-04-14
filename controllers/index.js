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

const changePassword = async (req, res) => {};

const getItems = async (req, res) => {
  try {
    const { _id } = req.body;
    const items = await User.findById({ _id }).populate('items');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    // Find user by id and then find specific item requested
    const { id } = req.params;
    const item = await Item.findById(id);
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
    // Find the user and update the users items
    const item = await new Item(req.body);
    await item.save();
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
