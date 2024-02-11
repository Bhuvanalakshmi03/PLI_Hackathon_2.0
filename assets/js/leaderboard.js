var modal = document.getElementById('popup');

var span = document.getElementsByClassName('close')[0];

function openPopup(totalBuy, totalSell, totalBurned) {
  document.getElementById('total-buy').textContent = totalBuy;
  document.getElementById('total-sell').textContent = totalSell;
  document.getElementById('total-burned').textContent = totalBurned;
  modal.style.display = 'flex';
}

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
	modal.style.display = 'none';
  }
}

var boxes = document.querySelectorAll('.item');
boxes.forEach(function(box) {
  box.addEventListener('click', function() {
	var totalBuy = Math.floor(Math.random() * 100) + 1; // Random total buy
	var totalSell = Math.floor(Math.random() * 100) + 1; // Random total sell
	var totalBurned = Math.floor(Math.random() * 100) + 1; // Random total burned
	openPopup(totalBuy, totalSell, totalBurned); // Open popup with the generated data
  });
});