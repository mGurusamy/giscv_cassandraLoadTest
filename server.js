let db = require('cassandra-driver');
let express = require('express');
let router = express.Router();
let client = new db.Client({contactPoints: ['localhost'], keyspace: 'policydb'});
client.connect(function(err, result){
    console.log('serverjs connected to cassandra database');
});

const getPolicy = 'select *from policy';
let responseJson = {};
router.get('/api/policy', function(req, res){
    client.execute(getPolicy, [], function(err, result){
        if(err){
            console.log('error happened');
        } else {
            console.log(result.rows);
            console.log('fetch succeeded');
        }
    });
});

module.exports = router;
// client.execute(getPolicy, [])
//     .then(result =>{
//         console.log(result);
//     });
// var execute = function(){
//     client.execute(getPolicy, [], function(err,result){
//         if(err){
//             responseJson.error = err;
//             console.log('error happened ' + err);
//         } else {
//             console.log(result.rows);
//             responseJson.policyDetails = result.rows;
//         }
//     });
// };

// execute();
// console.log(responseJson);
// module.exports.responseJson = responseJson;

