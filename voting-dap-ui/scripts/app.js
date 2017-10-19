(function(){
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
    VotingContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the  contract is deployed and change the line below to use your deployed address
    contractInstance = VotingContract.at('0xa11c674b8b20751c9b41990721356d161dce0772');
    candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

    const ramaBtn = document.getElementById('Rama'),nickBtn = document.getElementById('Nick'),joseBtn = document.getElementById('Jose');

    init();

    ramaBtn.addEventListener('click',function(){
        vote(this.id)
    });
    nickBtn.addEventListener('click',function(){
        vote(this.id)
    });
    joseBtn.addEventListener('click',function(){
        vote(this.id)
    });

    function vote(candidate){
        contractInstance.voteForCandidate(candidate, {from: web3.eth.accounts[0]}, function() {
            let divId = (candidate + '-votes').toLowerCase();
            let voteDiv = document.getElementById(divId);
            voteDiv.innerHTML = contractInstance.totalVotesFor.call(candidate).toString();
        });
    }

    function init(){
        let candidateNames = Object.keys(candidates);
        for (var i = 0; i < candidateNames.length; i++) {
            let candidate = candidateNames[i];
            let val = contractInstance.totalVotesFor.call(candidate).toString();
            let divId = (candidate + '-votes').toLowerCase();
            let voteDiv = document.getElementById(divId);
            voteDiv.innerHTML = contractInstance.totalVotesFor.call(candidate).toString();
        }
    }
})();