const filterElement = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const showFilterControls = () => {
  filterElement.classList.remove('img-filters--inactive');
};

const addFilterButtonsHandlers = (cb) => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active'); //this?
      cb();
    });
  });
};

export {showFilterControls, addFilterButtonsHandlers};
