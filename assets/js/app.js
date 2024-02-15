App = {

    loading: false,
    contracts: {},
    account: "",

    load: async () => {
        console.log('App connecting...')
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContracts()
        return false;
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // window.location.href = `/index`
        web3.eth.getAccounts().then(accounts => {
                App.account = accounts[0]
                console.log(App.account)
            })
            .catch(error => {
                console.error(error)
            })
    },

    loadContracts: async () => {
        // rec ABI
        const RECContract = await $.getJSON('../build/contracts/REC.json')
        const contractAddress = '0xe5E7bE6F4F947FA53aB57eDEC09EA1E87CF41009';
        App.contracts.rec = new web3.eth.Contract(RECContract.abi, contractAddress);

        // users ABI
        const UserContract = await $.getJSON('../build/contracts/UserAuth.json')
        const UserAddress = '0x987946dD7F5c4cd7A0E179bA49C63f0089aE43C6';
        App.contracts.user = new web3.eth.Contract(UserContract.abi, UserAddress);

        // // users ABI
        // const TokenContract = await $.getJSON('../build/contracts/XRC20Token.json')
        // const TokenAddress = '0x16b193CD70549dDFFe2E8119d978e28e530902F5';
        // App.contracts.user = new web3.eth.Contract(TokenContract.abi, TokenAddress);

        // // users ABI
        // const MarketPlaceContract = await $.getJSON('../build/contracts/XRC20Marketplace.json')
        // const MarketPlaceAddress = '0x4C851E1f55E67ED250289eF792190b88Ec17F249';
        // App.contracts.user = new web3.eth.Contract(UserContract.abi, MarketPlaceAddress);
    },

    WalletRegister: async () => {
        await App.load()
        data = {}

        data['name'] = document.getElementById('register_name').value
        data['location'] = document.getElementById('register_location').value
        data['authority'] = document.getElementById('register_authority').value
        data['wallet_id'] = App.account

        await App.contracts.user.methods.setUser(data['wallet_id'], data['name'], data['location'], data['authority']).send({ from: App.account });
        let r = await fetch('/register', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-type': 'application/json;charset=UTF-8' } })
        r = await r.json()
        console.log(r)
        if (r) {
            alert(data['name'] + ' Welcome to the Application')
            window.location.href = `/index`
        }
    },

    WalletLogin: async () => {
        await App.load()
        data = {}
        data['wallet_id'] = App.account

        console.log(App.contracts.user.methods.Users(App.account))

        var dataChain = await App.contracts.user.methods.Users(App.account).call()

        data['name'] = dataChain['name']
        data['role'] = dataChain['location']
        let r = await fetch('/login', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-type': 'application/json; charset=UTF-8' } })
        r = await r.json();
        if (r) {
            window.location.href = `/index`
        }
    },

    recMark: async () => {
        await App.load()

        const walletID = document.getElementById('walletID').value;
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value.toString();
        const mwh = document.getElementById('mwh').value.toString();
        const date = document.getElementById('date').value;

        const etherValue = web3.utils.toWei((parseFloat(0.0001) * parseFloat(mwh)).toString(), 'ether');

        App.contracts.rec.methods
            .createRECData(walletID, name, location, mwh, date)
            .send({ from: App.account, value: etherValue })
            .on('transactionHash', (hash) => {
                console.log('Transaction hash:', hash);
            })
            .on('error', (error) => {
                console.error('Error:', error);
            });

        await App.contracts.token.methods.burnToken(App.account,1).send({from:App.account})
        .on('transactionHash', (hash) => {
            console.log('Transaction hash:', hash);
            window.location.href = '/index'
        })
    },

    FetchREC: async () => {
        await App.load()
        const taskCount = await App.contracts.erc.methods.dataCount().call()
        const userWallet = document.cookie.split(';')[0].split('=')[1]

        tabel_body = document.getElementById('tabel-body')
        html = ``

        j = 1
        for (var i = 1; i <= taskCount; i++) {
            const task = await App.contracts.rec.methods.emmis(i).call()
            if (userWallet == task[0]) {

                html +=
                    `<tr>
          <th scope="row">${j}</th>
          <td>${task[2]}</td>
          <td>${task[0]}</td>
          <td>${task[1]}</td>
          <td>${task[3] / 10000}</td>
          <td>${task[4]}</td>
          </tr>`
                j += 1
            }
        }
        tabel_body.innerHTML = html
    },

    FetchAllREC: async () => {
        await App.load()

        const taskCount = await App.contracts.rec.methods.dataCount().call()

        tabel_body = document.getElementById('full-tabel-body')
        html = ``

        for (var i = 1; i <= taskCount; i++) {
            const task = await App.contracts.rec.methods.emmis(i).call()
            html +=
                `<tr>
        <th scope="row">${i}</th>
        <td>${task[2]}</td>
        <td>${task[0]}</td>
        <td>${task[1]}</td>
        <td>${task[3]}</td>
        <td>${task[4]}</td>
        </tr>`
        }
        tabel_body.innerHTML = html

    },

    Sale:async () => {
        await App.load()
        const price = document.getElementById('price').value
        await App.contracts.rec.methods
            .createRECData(App.account, 'bhuvana', 'theni', '10', '10-03-2023')
            .send({ from: App.account, value: '100000000' })
        localStorage.setItem('sale',price)
        window.location.href = `/market`
    },

    Buy:async () => {
        await App.load()
        const price = 2
        await App.contracts.rec.methods
            .createRECData(App.account, 'bhuvana', 'theni', '10', '10-03-2023')
            .send({ from: App.account, value: '100000000' })
        localStorage.setItem('buy',price)

        window.location.href = `/market`
    },

    SpecificFetchREC: async () => {
        await App.load()

        const taskCount = await App.contracts.rec.methods.dataCount().call()
        const walletID = document.getElementById('walletSearch').value

        let userWallet;

        if (walletID.toLowerCase().startsWith('xdc')) {
            userWallet = '0x' + walletID.slice(3);
        } else if (walletID.toLowerCase().startsWith('0x')) {
            userWallet = walletID;
        } else {
            alert('Invalid input address');
        }

        tabel_body = document.getElementById('trans-tabel-body')
        html = ``
        cum_emission = 0
        cum_fees = 0
        x_data = []
        y_data = []
        j = 1
        for (var i = 1; i <= taskCount; i++) {
            const task = await App.contracts.rec.methods.emmis(i).call()

            if (userWallet == task[0]) {


                html +=
                    `<tr>
          <th scope="row">${j}</th>
          <td>${task[2]}</td>
          <td>${task[0]}</td>
          <td>${task[1]}</td>
          <td>${task[3] / 10000}</td>
          <td>${task[4]}</td>
          </tr>`
                j += 1
            }
        }
        tabel_body.innerHTML = html
    },
}