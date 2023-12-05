pragma solidity ^0.8.0;

import "./XRC20.sol";

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

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(address _tokenAddress) {
        tokenContract = XRC20Token(_tokenAddress);
        owner = msg.sender;
    }

    function placeSellOrder(uint256 _amount) external {
        require(tokenContract.balanceOf(msg.sender) >= _amount, "Insufficient balance");

        tokenContract.transferFrom(msg.sender, address(this), _amount);
        sellOrderCount++;
        sellOrders[sellOrderCount] = SellOrder(msg.sender, _amount);

        emit SellOrderPlaced(sellOrderCount, msg.sender, _amount);
    }

    function buyTokens(uint256 _orderId) external payable {
        require(_orderId <= sellOrderCount && _orderId > 0, "Invalid order ID");

        SellOrder storage order = sellOrders[_orderId];
        require(order.amount > 0, "Order already fulfilled");

        uint256 amountToBuy = order.amount;
        address payable seller = payable(order.seller);

        require(msg.value >= amountToBuy, "Insufficient ether sent");

        tokenContract.transfer(msg.sender, amountToBuy);
        seller.transfer(amountToBuy);

        delete sellOrders[_orderId];

        emit TokenPurchased(_orderId, msg.sender, seller, amountToBuy);
    }

    // Owner can withdraw tokens if needed
    function withdrawTokens(uint256 _amount) external onlyOwner {
        tokenContract.transfer(msg.sender, _amount);
    }
}
