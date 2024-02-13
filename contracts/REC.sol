// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract REC {
    uint256 public dataCount = 0;
    
    struct Data {
        address wallet_id;
        string name;
        string location;
        string mwh;
        string date;
    }

    event RECData(address indexed wallet_id, string indexed name, string indexed location, string mwh, string date);

    mapping(uint256 => Data) public emmis;

    function createRECData(address _walletID, string memory _name, string memory _location, string memory _mwh, string memory _date) public payable {
        dataCount++;
        emmis[dataCount] = Data(_walletID, _name, _location, _mwh, _date);
        emit RECData(_walletID, _name, _location, _mwh, _date);
    }
}