const BACKEND_URL = 'https://23.javascript.pages.academy/kekstagram';

export const getData = (onSuccess, onFail) => {
  fetch(`${BACKEND_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        onFail();
      }
    })
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => {
      onFail();
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(BACKEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response)=> {
      if (response.ok){
        onSuccess();
      } else {
        // eslint-disable-next-line no-console
        console.log('сервер ответил, но с ошибкой');

        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


