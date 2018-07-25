var policyController = function (client) {
    var getPolicies = function (req, res) {
        var policiesQuery = 'select * from policydb.policy';
        client.execute(policiesQuery, [], function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                var policies = [];
                result.rows.forEach(function(element){
                    var currentPolicy = element;
                    var links = {
                        self : "http://" + req.headers.host + "/api/policies/" + currentPolicy.policyid
                    };
                    currentPolicy.links = links;
                    policies.push(currentPolicy);
                });
                res.json(policies);
            };
        });
    };

    var getPolicyById = function (req, res) {
        var getPolicy = 'select *from policydb.policy where policyid= ? allow filtering';
        client.execute(getPolicy, [req.params.id], { prepare: true }, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404).send(err);
            } else {
                res.json(result.rows);
            }
        });
    };
    return {
        getPolicies: getPolicies,
        getPolicyById: getPolicyById
    };
};

module.exports = policyController;