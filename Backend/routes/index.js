const userRoutes = require('./user.route');
const taskRoutes = require('./task.route');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send({
            message: 'OK - Server is up and running',
            code: 200,
            version: '1.0.0'
        })
    });

    app.get('/failure', (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'public', 'failure.html'));
    });

    // routes 
    app.use('/user', userRoutes);
    app.use('/task', taskRoutes);
};