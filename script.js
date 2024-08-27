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
    <img src="./images/icon-${cardTitle}.svg" alt="" class="card-background-img"/>
    <div class="card__content">
      <button class="card__ellipsis" aria-label="expand details">
        <svg width="21" height="5" viewBox="0 0 21 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2.5" cy="2.5" r="2.5" fill="#BBC0FF"/>
          <circle cx="10.5" cy="2.5" r="2.5" fill="#BBC0FF"/>
          <circle cx="18.5" cy="2.5" r="2.5" fill="#BBC0FF"/>
        </svg>
      </button>
      <h2 class="card__title">${element.title}</h2>
      <p class="current-hours"></p>
      <p class="previous-hours"></p>
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

// FUNCTION TO RETURN HR OR HRS
const hrOrHrs = (input) => (input === 1 ? 'hr' : 'hrs');

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

          currentHours.textContent = `${timeFrameSelected.current}${hrOrHrs(
            timeFrameSelected.current
          )}`;
          previousHours.textContent = `${timeFrameUnits(selectedTimeFrame)} - ${
            timeFrameSelected.previous
          }${hrOrHrs(timeFrameSelected.previous)}`;
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
