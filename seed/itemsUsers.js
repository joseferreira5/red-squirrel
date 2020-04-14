const db = require('../db');
const User = require('../models/user');
const Item = require('../models/item');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
  const items = [];

  const item1 = await new Item({
    name: 'Item 001',
    imgURL:
      'https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    preferredQty: '5',
    onHandQty: '5',
  });
  item1.save();

  const item2 = await new Item({
    name: 'Product 002',
    imgURL:
      'https://images.unsplash.com/photo-1576594496020-534bf2437b21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    preferredQty: '5',
    onHandQty: '5',
  });
  item2.save();

  const item3 = await new Item({
    name: 'Product 003',
    imgURL:
      'https://i.ibb.co/XkKm1pM/assorted-color-paint-brush-stroke-1672850.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    preferredQty: '5',
    onHandQty: '5',
  });
  item3.save();

  const item4 = await new Item({
    name: 'Product 004',
    imgURL:
      'https://images.unsplash.com/photo-1580380853934-834251ec0e95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    preferredQty: '5',
    onHandQty: '5',
  });
  item4.save();

  const item5 = await new Item({
    name: 'Product 005',
    imgURL:
      'https://images.unsplash.com/photo-1531826338556-162edb086560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    preferredQty: '5',
    onHandQty: '5',
  });
  item5.save();

  await items.push(item1, item2, item3, item4, item5);

  await User.findByIdAndUpdate(
    { _id: '5e95ceaa1007c94ab0a450ab' },
    { items: items }
  );

  console.log('Created items!');
};
const run = async () => {
  await main();
  db.close();
};

run();
