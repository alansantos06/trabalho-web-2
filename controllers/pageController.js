module.exports = {

    home(req, res) {

        res.render('home', {
            user: req.user
        })

    },

    pleno(req, res) {

        res.render('pleno', {
            user: req.user
        })

    },

    senior(req, res) {

        res.render('senior', {
            user: req.user
        })

    }

}