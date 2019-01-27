var _ = require('lodash');
var bcrypt = require('bcryptjs');
var User = require('./user-model.js');

module.exports = function(app) {

    app.post('/user/create', function(req, res) {
        bcrypt.hash(req.body.password, 10, function(err, hashValue) {
            req.body.password = hashValue;
            var newUser = new User(req.body);
            newUser.save(function(error) {
                if(error) {
                    res.json({message:'Error while creating user', error: error});
                } else {
                    res.json({message:'User created successfully'});
                }
            });
        });        
    });

    app.get('/user/list', function(req, res) {
        User.find(function(error, users) {
            if(error) {
                res.json({message: 'Error during find', error: error});
            } else {
                res.json({message: 'Users found', data: users});
            }
        });
    });

    app.get('/user/find/:username/:password', function(req, res) {
        User.find({'username':req.params.username}, function(error, user) {
            if(error) {
                res.json({message: 'Error searching for user', error: error});
            } else {
                user.forEach(account => {
                    bcrypt.compare(req.params.password, account.password, function(err, result) {
                        if(err) {
                            console.log('Error message: ' + err);
                            res.json({message: 'Error', error: err});
                        } else {
                            if(result) {
                                console.log('Password matched');
                                res.json({message: 'User found', data: account});
                            } else {
                                console.log('No matched');
                                res.json({message: 'User not found'});
                            }
                            
                        }
                    });
                });
            }
        });
    });

    app.put('/user/update/:id', function(req, res) {
        User.findById(req.params.id, function(error, user) {
            if(error) {
                res.json({message: 'Error searching for user', error: error});
            }
            if(user) {
                _.merge(user, req.body);
                user.save(function(error) {
                    if(error) {
                        res.json({message: 'Error during update', error: error});
                    } else {
                        res.json({message: 'User updated successfully'});
                    }
                })
            } else {
                res.json({message: 'User not found'});
            }
        });
    });

    app.delete('/user/delete/:id', function(req, res) {
        User.findByIdAndRemove(req.params.id, function(error) {
            if(error) {
                res.json({message: 'Error while deleting', error: error});
            } else {
                res.json({message: 'User deleted successfully'});
            }
        });
        res.json({message: 'User successfully deleted'});
    });

    app.get('/user/test', function(req, res) {
    });
}
