const User = require('../models/userModel')

//login
const loginUser = async (req, res) => {
    res.json({msg: 'Login user'})
}

//signup
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    res.json({msg: 'Signup user'})
}

module.exports = {
    signupUser,
    loginUser
}