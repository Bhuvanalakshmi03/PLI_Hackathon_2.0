const XRC20Marketplace = artifacts.require("XRC20Marketplace");
const XRC20Token = artifacts.require("XRC20Token");

module.exports = function (deployer) {
  deployer.deploy(XRC20Token, /* arguments for XRC20Token constructor */).then(() => {
    return deployer.deploy(XRC20Marketplace, XRC20Token.address);
  });
};
