const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const city = mongoCollections.cities;

async function addCity(data) {
    const cityCollection = await city();
    const insertInfo = await cityCollection.insertOne(data);
    return data;
}
async function findCity(id) {
    const cityCollection = await city();
    const city_id = { _id: new ObjectId(id) }
    let data;
    if (id) {
        data = await cityCollection.findOne(city_id);
    } else {
        data = await cityCollection.find().toArray();
    }
    return data;
}
async function updateCity() {
    const cityCollection = await city();
    const data = await cityCollection.updateOne(
        { city: 'mumbai' },
        { $set: { city: 'baroda' } }
    )
    return data;
}
async function deleteCity(id) {
    const cityCollection = await city();
    const data = await cityCollection.deleteOne({ _id: new ObjectId(id) });
    return data;
}


module.exports = {
    addCity,
    findCity,
    updateCity,
    deleteCity
}
