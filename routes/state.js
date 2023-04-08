const express = require('express');
const router = express.Router();
const stateController = require('../controller/state');


router.post("/insert",async (req,resp) => {
    let state = await stateController.addState(req.body)
    resp.send(state)
});
router.get('/getdata',  async (req, resp) => {
    let data = await stateController.findState(req.query.id)
    resp.send(data);
});
router.put('/update',  async (req, resp) => {
    let data = await stateController.updateState()
    resp.send(data);
});
router.delete('/deletedata/:id',  async (req, resp) => {
    let data = await stateController.deleteState(req.params.id)
    resp.send(data);
});
module.exports = router;