const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const {nome, email, senha, tipo} = req.body;

        if (await User.findOne({email})) {
            return res.status(400).json({msg: 'Email já no cadastrado'});
        }

        const user = new User({nome, email, senha, tipo });
        await user.save();

        res.status(201).json({ msg: 'Usuario criado com sucesso!' });
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

exports.login = async (req,res) => {
    try {
        const {email, senha} = req.body;
        const user = await User.findOne ({email});
        if (!user) return res.status(404).json({msg: 'Senha Invalida' });

        const isMatch = await user.comparePassword(senha);
        if (!isMatch) return res.status(400).json({msg: 'Senha Inválida'});
        
        const token = jwt.sign(
            {id: user._id, tipo: user.tipo},
            process.env.JWT_SECRET,
            { expiresIn: 'id'}
        )

        res.json({ token, nome: user.nome, tipo: user.tipo });
    }   catch(error) {
        res.status(500).json({ error: error.message });
    }
};