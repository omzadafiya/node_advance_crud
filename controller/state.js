const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const state = mongoCollections.states;

async function addState(data) {
    const stateCollection = await state();
    const insertInfo = await stateCollection.insertOne(data);
    return data;
}
async function findState(id) {
    const stateCollection = await state();
    const state_id = { _id: new ObjectId(id) }
    let data;
    if (id) {
        data = await stateCollection.findOne(state_id);
    } else {
        data = await stateCollection.find().toArray();
    }
    return data;
}
async function updateState() {
    const stateCollection = await state();
    const data = await stateCollection.updateOne(
        { state: 'rajstan' },
        { $set: { state: 'kasmir' } }
    )
    return data;
}
async function deleteState(id) {
    const stateCollection = await state();
    const data = await stateCollection.deleteOne({ _id: new ObjectId(id) });
    return data;
}

module.exports = {
    addState,
    findState,
    updateState,
    deleteState
}

