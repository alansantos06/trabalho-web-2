const express = require('express')

const router = express.Router()

const authMiddleware =
    require('../middlewares/authMiddleware')

const plenoMiddleware =
    require('../middlewares/plenoMiddleware')

const seniorMiddleware =
    require('../middlewares/seniorMiddleware')

const pageController =
    require('../controllers/pageController')

router.get(
    '/home',
    authMiddleware,
    pageController.home
)

router.get(
    '/pleno',
    authMiddleware,
    plenoMiddleware,
    pageController.pleno
)

router.get(
    '/senior',
    authMiddleware,
    seniorMiddleware,
    pageController.senior
)

module.exports = router