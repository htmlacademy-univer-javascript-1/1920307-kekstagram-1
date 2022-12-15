import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000; //вынести в main?

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showDownloadErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '3';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.width = '100%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.color = '#FF6D6D';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#232321';
  alertContainer.style.borderBottomWidth = '2px';
  alertContainer.style.borderBottomStyle = 'solid';
  alertContainer.style.borderBottomColor = '#FF6D6D';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getMessageElement = () => document.querySelector('.success, .error');

const closeMessage = () => {
  getMessageElement().remove();
  removeClosingHandlers();
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt) && getMessageElement()) {
    evt.preventDefault();
    closeMessage();
  }
};

const documentClickHandler = (evt) => {
  const messageElement = getMessageElement();
  if (messageElement && messageElement.contains(evt.target)) {
    closeMessage();
  }
};

function removeClosingHandlers () {
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
}

const messageButtonClickHandler = () => closeMessage();

const openMessage = (isSuccess) => {
  const message = isSuccess ? successMessageTemplate.cloneNode(true) : errorMessageTemplate.cloneNode(true);
  const typeMessage = isSuccess ? 'success' : 'error';
  const closeMessageButton = message.querySelector(`.${typeMessage}__button`);
  message.style.zIndex = '3';
  document.body.append(message);

  closeMessageButton.addEventListener('click', messageButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
};

export {showDownloadErrorMessage, openMessage};
