const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const { restaurantRoutes } = require('../routes/restaurants.js')

//TODO: Create your GET Request Route Below: 

app.use(express.json())
app.use(express.urlencoded())

app.use('/restaurants', restaurantRoutes)

// app.get('/restaurants', async (request, response) => {
//     let restaurants = await Restaurant.findAll({})
//     response.json(restaurants)
// })

// app.get('/restaurants/:id', async (req, res) => {
//     let param = req.params.id
//     let id = await Restaurant.findByPk(param)
//     res.json(id)
// })

// app.post('/restaurants/:id', async (req, res) => {
//     const restaurantId = req.params.id
//     const restaurantData = req.body
//     const newRestaurant = await Restaurant.create({ id: restaurantId, ...restaurantData })
//     res.json(newRestaurant)
// });

// app.put('/restaurants/:id', async (req, res) => {
//     const restaurantId = req.params.id
//     const restaurantData = req.body
//     const updatedRestaurant = await Restaurant.update(restaurantData, {
//         where: { id: restaurantId }
//     })
//     res.json(updatedRestaurant)
// })

// app.delete('/restaurants/:id', async (req, res) => {
//     const restaurantId = req.params.id
//     await Restaurant.destroy({
//         where: { id: restaurantId }
//     })
//     res.send()
// })

module.exports = app;