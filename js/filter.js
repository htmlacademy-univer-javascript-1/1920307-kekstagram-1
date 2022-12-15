const filterContainer = document.querySelector('.img-filters');

const showFilterControls = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

const initializeFilterControls = (cb) => {
  const filterContainerClickHandler = (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      filterContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      cb();
    }
  };

  showFilterControls();
  filterContainer.addEventListener('click', filterContainerClickHandler);
};

export { initializeFilterControls };
