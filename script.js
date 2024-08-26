const currentHours = Array.from(document.querySelectorAll('.current-hours'));
const cardContentData = document.querySelector('.card__content-data');
const appContainer = document.querySelector('.grid');

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

// FUNCTION TO STRUCTURE EACH CARD
const appendItem = (element) => {
  const card = document.createElement('div');
  const cardTitle = element.title.toLowerCase().replace(' ', '-');

  // ADD CLASSES TO EACH CONTAINER CARD
  const cardStyleClass = `card__${cardTitle}`;
  card.classList.add('card', cardStyleClass);

  // WRITE HTML FOR EACH CONTAINER CARD
  card.innerHTML = `
    <img src="./images/icon-${cardTitle}.svg" alt="" />
    <div class="card__content">
      <button class="card__content-ellipsis">
        <img src="./images/icon-ellipsis.svg" alt="" />
      </button>
      <h3 class="card__title">${element.title}</h3>
      <div class="card__content-data">
        <p class="current-hours"></p>
        <p class="previous-hours"></p>
      </div>
    </div>`;

  appContainer.appendChild(card);
};

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

// FUNCTION TO RETURN TIME FRAME UNITS
const timeFrameUnits = (timeFrame) => {
  switch (timeFrame) {
    case 'daily':
      return 'Yesterday';
    case 'weekly':
      return 'Last Week';
    case 'monthly':
      return 'Last Month';
    default:
      return '';
  }
};

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

// FUNCTION TO UPDATE TIME FRAMES
const updateSelectedTimeFrame = () => {
  const selectedTimeFrame = document.querySelector(
    'input[name=timeFrame]:checked'
  ).value;
  const cards = document.querySelectorAll('.card');

  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      cards.forEach((card) => {
        const cardTitle = card.querySelector('.card__title').textContent;
        const dataItem = data.find((item) => item.title === cardTitle);

        if (dataItem) {
          const currentHours = card.querySelector('.current-hours');
          const previousHours = card.querySelector('.previous-hours');
          const timeFrameSelected = dataItem.timeframes[selectedTimeFrame];

          currentHours.textContent = `${timeFrameSelected.current}hrs`;
          previousHours.textContent = `${timeFrameUnits(selectedTimeFrame)} - ${
            timeFrameSelected.previous
          }hrs`;
        }
      });
    })
    .catch((error) => console.error('Error loading JSON:', error));
};

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

// WHEN RADIO BUTTON CLICKED, UPDATE TIME FRAMES
const timeFrameRadioButtons = document.querySelectorAll(
  'input[name="timeFrame"]'
);
timeFrameRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', updateSelectedTimeFrame);
});

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

// FETCH DATA AND STRUCTURE PAGE
fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      appendItem(element);
      updateSelectedTimeFrame();
    });
  })
  .catch((error) => console.error('Error loading JSON:', error));
