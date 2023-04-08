const cityRoutes = require('./city');
const stateRoute = require('./state');
const userRoute = require('./user');

const constructorMethod = (app) => {
    app.use('/city', cityRoutes);
    app.use('/state', stateRoute);
    app.use('/', userRoute);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;