var _ = require('lodash');

module.exports = function(app) {

    _users = [];

    app.post('/user/create', function(req, res) {
        _users.push(req.body);
        res.json({message:'User created successfully'})
    });

    app.get('/user/list', function(req, res) {
        res.send(_users);
    });

    app.get('/user/find/:id', function(req, res) {
        res.send(
            _.find(
                _users, {id: req.params.id}
            )
        );
    });

    app.put('/user/update/:id', function(req, res) {
        var index = _.findIndex(
            _users, {id: req.body.id}
        );
        _.merge(_users[index], req.body);
        res.json({message: 'User successfully updated'});
    });

    app.delete('/user/delete/:id', function(req, res) {
        _.remove(_users, function(user) {
            return user.id === req.params.id;
        });
        res.json({message: 'User successfully deleted'});
    })
}

