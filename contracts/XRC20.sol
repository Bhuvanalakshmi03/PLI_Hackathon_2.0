// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token for Renewable Energy Certificates (RECs).
 */

contract XRC20Token {
    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 private _totalSupply;
    uint256 private remainingEnergy; // Track remaining renewable energy
    
    address public authorizedOracle; // Authorized entity for minting
    address public plantControllerAddress; // Controller of the renewable energy plant
    address public renewableGeneratorAddress; // Address of the renewable energy generator
    address public owner;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;
    mapping(address => bool) public isEnergyGenerator; // Track valid energy generators

    event EnergyGeneratorAdded(address indexed generatorAddress);
    event EnergyTokensMinted(address indexed generatorAddress, uint256 tokensMinted, uint256 energyMinted);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event MintREC(uint256 tokensMinted, uint256 energyMinted);

     // Modifier to ensure that only the contract owner or authorized entities can perform certain actions
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || msg.sender == authorizedOracle || msg.sender == plantControllerAddress,
            "Unauthorized caller"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply,
        address _authorizedOracle,
        address _plantControllerAddress,
        address _renewableGeneratorAddress,
        uint256 _initialEnergy // New parameter for initial renewable energy
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        authorizedOracle = _authorizedOracle;
        plantControllerAddress = _plantControllerAddress;
        renewableGeneratorAddress = _renewableGeneratorAddress;
        owner = msg.sender;

        _totalSupply += _initialSupply * 10**decimals;
        balances[_renewableGeneratorAddress] = _initialEnergy * 10**decimals; // Mint initial tokens to the renewable energy generator
        remainingEnergy = (_initialSupply - _initialEnergy) * 10**decimals; // Set remaining energy
        
        emit Transfer(address(0), _renewableGeneratorAddress, _initialEnergy * 10**decimals);
        emit Transfer(address(0), msg.sender, (_initialSupply - _initialEnergy) * 10**decimals);
    }

    // Function to add an energy generator dynamically
    function addEnergyGenerator(address _generatorAddress) external onlyOwner {
        isEnergyGenerator[_generatorAddress] = true;
        emit EnergyGeneratorAdded(_generatorAddress);
    }

    // Function to mint tokens for a specific energy generator
    function mintTokensForGenerator(address _generatorAddress, uint256 _energy) external onlyAuthorized {
        require(isEnergyGenerator[_generatorAddress], "Not a valid energy generator");

        uint256 tokensToMint = _energy * 10**decimals;
        _totalSupply += tokensToMint;
        balances[_generatorAddress] += tokensToMint;
        remainingEnergy -= _energy;

        emit EnergyTokensMinted(_generatorAddress, tokensToMint, _energy);
        emit Transfer(address(0), _generatorAddress, tokensToMint);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function getRemainingEnergy() public view returns (uint256) {
        return remainingEnergy;
    }

    function mintREC(uint256 _energy) public {
        require(msg.sender == authorizedOracle || msg.sender == plantControllerAddress, "Unauthorized caller");
        require(_energy <= remainingEnergy, "Insufficient renewable energy for minting");

        uint256 tokensToMint = _energy * 10**decimals;
        _totalSupply += tokensToMint;
        balances[renewableGeneratorAddress] += tokensToMint;
        remainingEnergy -= _energy;

        emit MintREC(tokensToMint, _energy);
        emit Transfer(address(0), renewableGeneratorAddress, tokensToMint);
    }

     function transfer(address recipient, uint amount) external returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
}
