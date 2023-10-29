const cardsData = [
  { id: 1, color: '#FF5722' },
  { id: 2, color: '#FF5722' },
  { id: 3, color: '#FFC107' },
  { id: 4, color: '#FFC107' },
  { id: 5, color: '#4CAF50' },
  { id: 6, color: '#4CAF50' },
  { id: 7, color: '#673AB7' },
  { id: 8, color: '#673AB7' },
  { id: 9, color: '#FF9800' },
  { id: 10, color: '#FF9800' },
  { id: 11, color: '#607D8B' },
  { id: 12, color: '#607D8B' },
];

let cards = [];
let flippedCards = [];
let matchedCards = [];

function initializeGame() {
  const cardsContainer = document.getElementById('cards-container');
  cardsData.forEach(data => {
    const cardElement = createCardElement(data);
    cards.push({ data, element: cardElement });
    cardsContainer.appendChild(cardElement);
  });
}

function createCardElement(data) {
  const cardElement = document.createElement('div');
  const cardInnerElement = document.createElement('div');
  const cardFrontElement = document.createElement('div');
  const cardBackElement = document.createElement('div');

  cardElement.classList.add('card');
  cardInnerElement.classList.add('card-inner');
  cardFrontElement.classList.add('card-front');
  cardBackElement.classList.add('card-back');

  cardBackElement.style.backgroundColor = data.color;

  cardInnerElement.appendChild(cardFrontElement);
  cardInnerElement.appendChild(cardBackElement);
  cardElement.appendChild(cardInnerElement);

  cardElement.addEventListener('click', () => selectCard(cardElement));

  return cardElement;
}

function selectCard(cardElement) {
  if (canSelectCard(cardElement)) {
    flipCard(cardElement);
    const cardData = getCardData(cardElement);
    flippedCards.push(cardData);

    if (flippedCards.length === 2) {
      setTimeout(() => checkMatch(), 1000);
    }
  }
}

function canSelectCard(cardElement) {
  const cardData = getCardData(cardElement);
  return cardElement.classList.contains('card') &&
    !cardElement.classList.contains('flipped') &&
    flippedCards.length < 2 &&
    !matchedCards.includes(cardData);
}

function getCardData(cardElement) {
  const cardIndex = Array.from(cardElement.parentNode.children).indexOf(cardElement);
  return cards[cardIndex].data;
}

function flipCard(cardElement) {
  cardElement.classList.add('flipped');
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.color === card2.color) {
    matchedCards.push(card1, card2);
    checkWin();
  } else {
    flipCardBack(card1);
    flipCardBack(card2);
  }

  flippedCards = [];
}

function flipCardBack(cardData) {
  const cardElement = cards.find(card => card.data === cardData).element;
  cardElement.classList.remove('flipped');
}

function checkWin() {
  if (matchedCards.length === cardsData.length) {
    setTimeout(() => alert('Congratulations! You won the game.'), 100);
  }
}

initializeGame();