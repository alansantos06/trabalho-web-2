const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Usuario } = require('../models')

module.exports = {

    loginPage(req, res) {
        res.render('login')
    },

    registerPage(req, res) {
        res.render('register')
    },

    async register(req, res) {

        const {
            email,
            senha,
            pergunta1,
            pergunta2
        } = req.body

        let acertos = 0

        if (pergunta1.toLowerCase() === 'ejs')
            acertos++

        if (pergunta2.toLowerCase() === 'bcrypt')
            acertos++

        let role = 'junior'

        if (acertos === 1)
            role = 'pleno'

        if (acertos === 2)
            role = 'senior'

        const hash = await bcrypt.hash(senha, 10)

        await Usuario.create({
            email,
            senha: hash,
            role
        })

        res.redirect('/login')
    },

    async login(req, res) {

        const { email, senha } = req.body

        const usuario = await Usuario.findOne({
            where: { email }
        })

        if (!usuario)
            return res.send('Usuário não encontrado')

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        )

        if (!senhaValida)
            return res.send('Senha inválida')

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                role: usuario.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie(
            'token',
            token,
            {
                httpOnly: true,
                maxAge: 3600000
            }
        )

        res.redirect('/home')
    },

    logout(req, res) {

        res.clearCookie('token')

        res.redirect('/login')
    }

}