const express = require('express');
const router = express.Router();
const cityController = require('../controller/city');


router.post("/insert",async (req,resp) => {
    let city = await cityController.addCity(req.body)
    resp.send(city)
});
router.get('/getdata',  async (req, resp) => {
    let data = await cityController.findCity(req.query.id)
    resp.send(data);
});
router.put('/update',  async (req, resp) => {
    let data = await cityController.updateCity()
    resp.send(data);
});
router.delete('/deletedata/:id',  async (req, resp) => {
    let data = await cityController.deleteCity(req.params.id)
    resp.send(data);
});

module.exports = router;