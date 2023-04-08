const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.users;

async function addUser(data) {
    const userCollection = await user();
    const insertInfo = await userCollection.insertOne(data);
    return data;
}
async function findUser(id) {
    const userCollection = await user();
    const user_id = { _id: new ObjectId(id) }
    let data;
    if (id) {
        data = await userCollection.findOne(user_id);
    } else {
        data = await userCollection.find().toArray();
    }
    return data;
}
async function updateUser() {
    const userCollection = await user();
    const data = await userCollection.updateOne(
        { name: 'shubham' },
        { $set: { name: 'jay sondager' } }
    )
    return data;
}
async function deleteUser(id) {
    const userCollection = await user();
    const data = await userCollection.deleteOne({ _id: new ObjectId(id) });
    return data;
}

module.exports = {
    addUser,
    findUser,
    updateUser,
    deleteUser
}


