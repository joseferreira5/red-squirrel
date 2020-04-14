![Alt Text](https://media.giphy.com/media/iIMFCINb0C5GavJZ5X/giphy.gif)

# **Red Squirrel**

### Overview

**Red Squirrel** is a visual inventory management and tracking software that allows the user to input items and their details as well as track changes to the quantities of the items. This app is designed to provide the user with a simple interface for taking the guesswork out of managing inventory.
<br>

### Wireframes

Mobile Landing Page
![](https://i.imgur.com/TgkkKY0.png)

Mobile Sign Up Page
![](https://imgur.com/FkHvIvf.png)

Mobile Log In Page
![](https://imgur.com/rqj3Js2.png)

Mobile Inventory Page
![](https://imgur.com/c6r9O3e.png)

Mobile Create Item Page
![](https://imgur.com/CDdvJFF.png)

Mobile Edit Item Page
![](https://imgur.com/8EMZVSM.png)

Desktop Landing Page
![](https://imgur.com/WbQViyR.png)

Desktop Sign Up Page
![](https://imgur.com/Tb7uQKI.png)

Desktop Log In Page
![](https://imgur.com/tw3xMKV.png)

Desktop Inventory Page
![](https://imgur.com/fLigxRE.png)

Desktop Create Item Page
![](https://imgur.com/pPW0iZW.png)

Desktop Edit Item Page
![](https://imgur.com/9pTOyf6.png)

### MVP Goals

The homepage will have will have sign up and login prompts to allow users to create and secure personal accounts. Once signed in, the homepage will show a cumulative inventory panel of all the user's products.
The item page will display a particular product that had been added to the master list as well as allow the user to update current stocked quantities or desired minimum inventory levels.
The app will utilize React, JS, CSS, and mongoDB. React and JS will render data stored on our development api created with mongoDB. The site would be hosted on Surge.

### Libraries

|     Library      | Description                      |
| :--------------: | :------------------------------- |
|      axios       | _To make get requests to API_    |
|   body-parser    | _Body parsing middleware_        |
|       cors       | _CORS enabling middleware_       |
|     express      | _Web framework for node_         |
|  framer-motion   | _Page transitions_               |
|       jest       | _JavaScript testing_             |
|     mongoose     | _MongoDB object modeling tool_   |
|      morgan      | _HTTP request logger middleware_ |
|     nodemon      | _Auto restart app on save_       |
| react-router-dom | _Link and Route components_      |
|    supertest     | _Component library_              |

### Component Hierarchy

```structure

root
|__ client/
      |__ public/
            |__ index.html
      |__ src/
      |__ components/
            |__ shared/
                  |__ Header.js
                  |__ Footer.js
                  |__ Layout.js
            |__ Home.js
            |__ ItemCreate.js
            |__ ItemDetail.js
            |__ ItemEdit.js
            |__ Inventory.js
            |__ SignIn.js
            |__ SignUp.js
            |__ services/
                  |__ apiConfig.js
                  |__ items.js
                  |__ app.js
                  |__ index.js
            |__ README.md
            |__ package-lock.json
            |__ package.json
|__ controllers/
      |__ index.js
|__ db/
      |__ index.js
|__ models/
      |__ user.js
      |__ item.js
|__ routes/
      |__ index.js
|__ seed/
      |__ usersItems.js
|__ tests/
      |__ base.test.js
      |__ routes.test.js
|__ .gitignore
|__ app.js
|__ info.yml
|__ package-lock.json
|__ package.json
|__ README.md
|__ server.js

```

### Post-MVP

**Red Squirrel** allows the user to maintain a balance between too much and too little inventory. Color codes highlight levels of inventory that fall below the desired minimum inventory level.

### Team Members

Created, designed and developed by [Yolea Mayers](), [Michael Reidy](), [Mouzayan Delbourgo]() and [Jose Ferreira]() (Git Czar) for the General Assembly Software Engineering Immersive (February '20 Cohort) Unit 3 Project.
