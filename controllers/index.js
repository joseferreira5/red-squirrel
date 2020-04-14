const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Product = require('../models/product')
const db = require('../db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylonggoodkey'

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
        const user = await new User({
            username,
            email,
            password_digest
        })

        await user.save()

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(payload, TOKEN_KEY)
        return res.status(201).json({ user, token })
    } catch (error) {
        console.log(
            'You made it to the signUp controller, but there was an error :('
        )
        return res.status(400).json({ error: error.message })
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (await bcrypt.compare(password, user.password_digest)) {
            const payload = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            const token = jwt.sign(payload, TOKEN_KEY)
            return res.status(201).json({ user, token })
        } else {
            res.status(401).send('Invalid Credentials')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const verifyUser = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token, TOKEN_KEY)
        res.json({ user })
    } catch (e) {
        res.status(401).send('Not Authorized')
    }
}

const changePassword = async (req, res) => { }

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (product) {
            return res.json(product)
        }
        res.status(404).json({ message: 'Product not found!' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body, { new: true }, (error, product) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' })
        }
        res.status(200).json(product)
    })
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Product deleted")
        }
        throw new Error("Product not found")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    signUp,
    signIn,
    verifyUser,
    changePassword,
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}