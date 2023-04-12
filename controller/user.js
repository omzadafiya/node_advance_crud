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
    let data;
    if (id) {
        data = await userCollection.aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "cities",
                    as: "city",
                    let: {
                        localId: "$city",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$_id",
                                        "$$localId"
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0
                            }
                        },
                    ]
                }
            },
            {
                $lookup: {
                    from: "states",
                    as: "state",
                    let: {
                        localId: "$state"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$_id",
                                        "$$localId"
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0
                            }
                        },
                    ]
                }
            },
            {
                $addFields: {
                    city: {
                        $first: "$city.city",
                    }
                }
            },
            {
                $addFields: {
                    state: {
                        $arrayElemAt: [
                            "$state.state",
                            0
                        ]
                    }
                }
            },
            // {
            //     $lookup: {
            //         from: "cities",
            //         localField: "city",
            //         foreignField: "_id",
            //         as: "citys"
            //     }
            // },
            // {
            //     $lookup: {
            //         from: "states",
            //         localField: "state",
            //         foreignField: "_id",
            //         as: "states"
            //     }
            // },
            // {
            //     $project: {
            //         name: 1,
            //         address: 1,
            //         gender: 1,
            //         age: 1,
            //         citys: 1,
            //         states: 1,
            //     }
            // },
            // {
            //     $project: {
            //         "citys._id": 0,
            //         "states._id": 0
            //     }
            // },
            // {
            //     $unwind: "$citys"
            // },
            // {
            //     $unwind: "$states"
            // },
            // {
            //     $project: {
            //         name: 1,
            //         address: 1,
            //         gender: 1,
            //         age: 1,
            //         city: "$citys.city",
            //         state: "$states.state"
            //     }
            // }

        ]).toArray();
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


