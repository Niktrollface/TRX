let balance = 0;
let walletBalance = 0;
let miningSpeed = 1; // 1 GH/s
const clickValue = 0.0000007;
const autoIncome = 0.0000002;
const claimThreshold = 1;
const walletAddress = "TD5h5iM35J8EPZCf7YbTz31B3ozFtFKKx8";


function clickCircle() {
    balance += clickValue;
    updateBalance();
    animateCircle();
}

function animateCircle() {
    const circle = document.querySelector('.fan-image');
    circle.style.transform = 'scale(1.1)';
    setTimeout(() => {
        circle.style.transform = 'scale(1)';
    }, 100);
}

function updateBalance() {
    document.getElementById('balance').textContent = balance.toFixed(6);
    document.getElementById('claimButton').disabled = balance < claimThreshold;
}

function claimCoins() {
    if (balance >= claimThreshold) {
        walletBalance += balance;
        balance = 0;
        updateBalance();
        updateWalletBalance();
        document.getElementById('claimButton').disabled = true;
    }
}

function updateWalletBalance() {
    document.getElementById('walletBalance').textContent = walletBalance.toFixed(6);
}

function openWallet() {
    document.getElementById('wallet').style.display = 'flex';
}

function closeWallet() {
    document.getElementById('wallet').style.display = 'none';
}

function openBoost() {
    document.getElementById('boost').style.display = 'flex';
}

function closeBoost() {
    document.getElementById('boost').style.display = 'none';
}

function openPayment() {
    document.getElementById('payment').style.display = 'flex';
}

function closePayment() {
    document.getElementById('payment').style.display = 'none';
}

function setBoostAmount(amount) {
    let hashRate = amount * 0.1; // 10 GH/s per 100 TRX
    let unit = "GH/s";
    if (hashRate >= 1000) {
        hashRate /= 1000;
        unit = "TH/s";
    }
    document.getElementById('boostInfo').textContent = `${amount} TRX - ${hashRate.toFixed(1)} ${unit}`;
}

function setCustomBoost() {
    const amount = parseFloat(document.getElementById('customAmount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('boostInfo').textContent = "Invalid amount";
        return;
    }
    setBoostAmount(amount);
}

setInterval(() => {
    balance += autoIncome * (miningSpeed / 1);
    updateBalance();
}, 1000);
