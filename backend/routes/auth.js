const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//Registro para teste
router.post('/register', async (req, res) => {
    const {name, email, password, role} = req.body;

    try{
        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({error: 'Usuário já cadastrado'});

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassord, role});
        await user.save();

        res.status(201).json({message: 'Usuário registrado com sucesso'});
    } catch (err) {
        res.status(500).json({error: 'Erro no servidor'});
    }
});

//Login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({error: 'Usuário não encontrado'});

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(401).json({error: 'Senha Incorreta'});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET,{
            expiresIn: '8h'
        });

        res.json({token, user: {name: user.name, email:user.email, role: user.role}});
    } catch (err) {
        res.status(500).json({error: 'Erro no login'});
    }
});

module.exports = router; 