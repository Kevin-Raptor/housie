var emailExistence = require('email-existence');


emailExistence.check('jjain@solaria.com', function(err,res){
    console.log('res: '+res);
});