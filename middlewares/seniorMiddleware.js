module.exports = (req, res, next) => {

    if (req.user.role === 'senior')
        return next()

    res.render('erro')
}