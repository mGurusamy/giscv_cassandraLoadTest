var express = require('express');
module.exports = function (client) {
    var policyRouter = express.Router();
    var policyController = require('../Controllers/policyController')(client);
    policyRouter.route('/policies')
        .get(policyController.getPolicies);

    policyRouter.route('/policies/:id')
        .get(policyController.getPolicyById);
    return policyRouter;
};