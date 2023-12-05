const XRC20Token = artifacts.require("XRC20Token");

const NAME = "XinFin Renewable Energy Certificate";
const SYMBOL = "XREC";
const DECIMALS = 18;
const INITIAL_SUPPLY = 1000;
const AUTHORIZED_ORACLE_ADDRESS = "0x1e76BA8A2903429183afCc8a9dCBf36cC133026E"; // Placeholder for dynamic retrieval
const PLANT_CONTROLLER_ADDRESS = "0x1e76BA8A2903429183afCc8a9dCBf36cC133026E"; // Placeholder for dynamic retrieval
const OWNER_ADDRESS = "0x1e76BA8A2903429183afCc8a9dCBf36cC133026E"; // Placeholder for dynamic retrieval
const INITIAL_ENERGY = 500; // Initial renewable energy in MWh

module.exports = function (deployer) {
    deployer.deploy(
        XRC20Token,
        NAME,
        SYMBOL,
        DECIMALS,
        INITIAL_SUPPLY,
        AUTHORIZED_ORACLE_ADDRESS,
        PLANT_CONTROLLER_ADDRESS,
        OWNER_ADDRESS,
        INITIAL_ENERGY
    ).then(async () => {
        const tokenInstance = await XRC20Token.deployed();

        // Get addresses dynamically
        const authorizedOracleAddress = "<Dynamic_Oracle_Address>"; // Replace with dynamic retrieval logic
        const plantControllerAddress = "<Dynamic_Plant_Controller_Address>"; // Replace with dynamic retrieval logic
        const ownerAddress = "<Dynamic_Owner_Address>"; // Replace with dynamic retrieval logic

        // Add energy generators dynamically
        const energyGenerators = ["0x1e76BA8A2903429183afCc8a9dCBf36cC133026E", "0x85fF44b6d018a58685284d27cDEf090dB4EC3f9f","0xC61124f87dC615C2871990BD8aa471df1023764e"]; // Replace with your actual generator addresses

        for (let i = 0; i < energyGenerators.length; i++) {
            await tokenInstance.addEnergyGenerator(energyGenerators[i]);
        }

        // Mint tokens for each energy generator
        for (let i = 0; i < energyGenerators.length; i++) {
            const energy = 200; // Specify the energy for each generator
            await tokenInstance.mintTokensForGenerator(energyGenerators[i], energy);
        }
    });
};
