// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface XRC20Token {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function owner() external view returns (address);
}

contract XRC20Marketplace {
    XRC20Token public tokenContract;
    address public owner;

    struct SellOrder {
        address seller;
        uint256 amount;
    }

    mapping(uint256 => SellOrder) public sellOrders;
    uint256 public sellOrderCount;

    event SellOrderPlaced(uint256 indexed orderId, address indexed seller, uint256 amount);
    event TokenPurchased(uint256 indexed orderId, address indexed buyer, address indexed seller, uint256 amount);
    event TokensRetired(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(address _tokenAddress) {
        tokenContract = XRC20Token(_tokenAddress);
        owner = msg.sender;
    }

    function placeSellOrder(uint256 amount) external {
        require(tokenContract.balanceOf(msg.sender) >= amount, "Insufficient balance");

        tokenContract.transfer(address(this), amount);
        sellOrderCount++;
        sellOrders[sellOrderCount] = SellOrder(msg.sender, amount);

        emit SellOrderPlaced(sellOrderCount, msg.sender, amount);
    }

    function buyTokens(uint256 orderId) external payable {
        require(orderId <= sellOrderCount && orderId > 0, "Invalid order ID");

        SellOrder storage order = sellOrders[orderId];
        require(order.amount > 0, "Order already fulfilled");

        uint256 amountToBuy = order.amount;
        address payable seller = payable(order.seller);

        require(msg.value >= amountToBuy, "Insufficient token sent");

        tokenContract.transfer(msg.sender, amountToBuy);
        seller.transfer(amountToBuy);

        delete sellOrders[orderId];

        emit TokenPurchased(orderId, msg.sender, seller, amountToBuy);
    }

    function retireTokens(uint256 amount) external onlyOwner {
        require(tokenContract.balanceOf(address(this)) >= amount, "Insufficient tokens in marketplace");
        
        tokenContract.transfer(tokenContract.owner(), amount);
        emit TokensRetired(amount);
    }

    // Owner can withdraw tokens if needed
    function withdrawTokens(uint256 amount) external onlyOwner {
        tokenContract.transfer(msg.sender, amount);
    }
}
