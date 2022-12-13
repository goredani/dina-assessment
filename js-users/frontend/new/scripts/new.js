import { form } from '../../modules/form.js';

let update = {};


const submit = (event) => {
  event.preventDefault();
  let first_name =  event.target.elements.fname.value;
  let last_name = event.target.elements.lname.value;

  
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

  addNewUser(update);
};

const addNewUser = (update) => {
  fetch(`https://assessment-users-backend.herokuapp.com/users/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
        body: JSON.stringify(update),
  })
  .then(response => response.json())
    .then(response => {
          alert(`${response.first_name} ${response.last_name} successfully added`)
          location.replace("/users/")
      })
      .catch(err => console.error(err));
};

const formContainer = document.querySelector('#form-container');

const addToForm = () => formContainer.innerHTML = form();

const addEvent = () => {
  const handleForm = document.querySelector('#editForm');
  handleForm.addEventListener('submit', submit);
};

addToForm();
addEvent();









