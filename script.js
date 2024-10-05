document.getElementById('history-tab').addEventListener('click', function () {
    toggleBtnShow('history-of-transaction');
    toggleBtnHide('two-btn');
    document.getElementById('history-tab').style.backgroundColor = '#B4F461';
    document.getElementById('donate-tab').style.backgroundColor = 'white';
});