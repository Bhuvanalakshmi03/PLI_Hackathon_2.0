// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title XRC20 Token
 * @dev This is the a XinFin Network Compatible XRC20 token.
 */

contract XRC20Token {

    string public name;
    string public symbol;

    uint256 private _totalSupply;
    
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowances;
    mapping(address => bool) public validators; // Added validators mapping
    
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);
    event RECRequested(address indexed requester, string indexed powerPlantOwner, string location, uint256 energyGenerated);
    event RECValidated(address indexed validator, uint indexed recIndex);
    event RECRetired(address indexed holder, uint256 amount);
    event Mint(address indexed to, uint256 amount);
      
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;

        _totalSupply += _initialSupply;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowances[owner][spender];
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        require(recipient != address(0), "XRC20: transfer to the zero address");
        require(amount <= balances[msg.sender], "XRC20: transfer amount exceeds balance");
        
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

    function transferFrom(address sender, address recipient, uint amount) external returns (bool) {
        require(sender != address(0), "XRC20: transfer from the zero address");
        require(recipient != address(0), "XRC20: transfer to the zero address");
        require(amount <= balances[sender], "XRC20: transfer amount exceeds balance");
        require(amount <= allowances[sender][msg.sender], "XRC20: transfer amount exceeds allowance");
        
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function requestREC(string memory _powerPlantOwner, string memory _location, uint256 _energyGenerated) external {
        require(_energyGenerated > 0, "XRC20: Energy generated must be greater than zero");
        
        emit RECRequested(msg.sender, _powerPlantOwner, _location, _energyGenerated);
    }
    
    function validateREC(uint256 _recIndex) external {
        require(validators[msg.sender], "XRC20: Only validators can validate REC");
        emit RECValidated(msg.sender, _recIndex);
    }
    
    function retireREC(uint256 _amount) external {
        require(_amount <= balances[msg.sender], "XRC20: Insufficient REC balance");
        balances[msg.sender] -= _amount;
        _totalSupply -= _amount;
        emit RECRetired(msg.sender, _amount);
    }
    
    // Function to add or remove validators
    function setValidator(address _validator, bool _status) external {
        require(msg.sender == owner(), "XRC20: Only contract owner can set validators");
        validators[_validator] = _status;
    }
    
    // Function to get contract owner
    function owner() public view returns (address) {
        return address(this);
    }
    
    // Function to mint new tokens
    function mint(address _to, uint256 _amount) external {
        require(msg.sender == owner(), "XRC20: Only contract owner can mint tokens");
        
        _totalSupply += _amount;
        balances[_to] += _amount;
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
    }
}
