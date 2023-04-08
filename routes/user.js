const express = require('express');
const router = express.Router();
const userController = require('../controller/user');


router.post("/insert", async (req, resp) => {
    let user = await userController.addUser(req.body)
    resp.send(user)
});
router.get('/getdata', async (req, resp) => {
    let data = await userController.findUser(req.query.id)
    resp.send(data);
});
router.put('/update', async (req, resp) => {
    let data = await userController.updateUser()
    resp.send(data);
});
router.delete('/deletedata/:id', async (req, resp) => {
    let data = await userController.deleteUser(req.params.id)
    resp.send(data);
});
module.exports = router;