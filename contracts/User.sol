// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAuth {
    uint public userCount;

    struct User {
        string name;
        string locaion;
        string authority;
    }

    event UserRegistered(
        address indexed walletId,
        string indexed name,
        string indexed location,
        string authority
    );

    mapping(address => User) public Users;

    function setUser(
        address _walletId,
        string memory _name,
        string memory _location,
        string memory _authority
    ) public {
        Users[_walletId] = User(_name, _location, _authority);
        userCount += 1;
        emit UserRegistered(_walletId, _name, _location, _authority);
    }
}
