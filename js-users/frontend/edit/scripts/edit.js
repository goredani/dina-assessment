const formContainer = document.querySelector('#form-container');

const pattern = /edit\/(\d+)/;
const url = window.location.pathname;
const regex = new RegExp(pattern);
const match = regex.exec(url);
const userId = String(match[1]);

let update = {};

const submit = (event) => {
  event.preventDefault();
  const first_name = event.target.elements.fname.value;
  const last_name = event.target.elements.lname.value;
  let status = '';
  if (event.target.elements.active.checked === true) {
    status = 'active';
  } else {
    status = 'locked';
  }

  update = {
    first_name,
    last_name,
    status,
  };

  console.log(update);
  updateUser();
};

const getUser = () => {
  fetch(`https://assessment-users-backend.herokuapp.com/users/${userId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      addToForm(data);
      addEvent();
    });
};

const updateUser = () => {
  fetch(`https://assessment-users-backend.herokuapp.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
	    body: JSON.stringify(update),
  })
    .then(() => {
      alert('User data has been changed');
      location.replace(`/edit/${userId}`);
    })
    .catch((err) => console.error(err));
};

getUser(userId);
