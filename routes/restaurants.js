const express = require('express')
const restaurantRoutes = express.Router()
const Restaurant = require('../models/index.js')

const { check, validationResult } = require('express-validator');

restaurantRoutes.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll()
    res.status(200).json(restaurants)
})

restaurantRoutes.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findOne({
        where: { id: req.params.id }
    })
    res.status(200).json(restaurant)
})

restaurantRoutes.post(
    '/',
    [
        check('name').trim().notEmpty().withMessage('Name is required and cannot be empty or whitespace'),
        check('location').trim().notEmpty().withMessage('Location is required and cannot be empty or whitespace'),
        check('cuisine').trim().notEmpty().withMessage('Cuisine is required and cannot be empty or whitespace')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const restaurantData = req.body;
        const newRestaurant = await Restaurant.create(restaurantData);
        res.status(201).json(newRestaurant);
    }
);

restaurantRoutes.put('/:id', async (req, res) => {
    const id = req.params.id;
    const newRestaurantData = req.body;
    await Restaurant.update(newRestaurantData, {
        where: { id: id }
    });
    const updatedRestaurant = await Restaurant.findByPk(id);
    res.status(200).json(updatedRestaurant);
});

restaurantRoutes.delete('/all', async (req, res) => {
    await Restaurant.destroy({
        where: {name: 'Test Restaurant'}
    })
    res.status(204).send();
})

restaurantRoutes.delete('/:id', async (req, res) => {
    const id = req.params.id
    await Restaurant.destroy({
        where: {id: id}
    })
    res.status(204).send();
})

module.exports = { restaurantRoutes };