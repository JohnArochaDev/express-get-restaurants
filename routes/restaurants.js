const express = require('express')
const restaurantRoutes = express.Router()
const Restaurant = require('../models/index.js')

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

restaurantRoutes.post('/', async (req, res) => {
    const restaurantData = req.body
    const newRestaurant = await Restaurant.create(restaurantData)
    res.status(201).json(newRestaurant)
})

restaurantRoutes.put('/:id', async (req, res) => {
    const id = req.params.id;
    const newRestaurantData = req.body;
    await Restaurant.update(newRestaurantData, {
        where: { id: id }
    });
    const updatedRestaurant = await Restaurant.findByPk(id);
    res.status(200).json(updatedRestaurant);
});

restaurantRoutes.delete('/:id', async (req, res) => {
    const id = req.params.id
    await Restaurant.destroy({
        where: {id: id}
    })
    res.status(204).send();
})

module.exports = { restaurantRoutes };