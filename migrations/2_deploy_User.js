const User = artifacts.require("UserAuth");

module.exports = function(deployer) {
  deployer.deploy(User)
}