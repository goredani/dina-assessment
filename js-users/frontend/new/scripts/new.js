import { form } from '../../modules/form.js';
import { addNewUser } from '../../modules/addNewUser.js';

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

  addNewUser(update);
};

const formContainer = document.querySelector('#form-container');

const addToForm = () => formContainer.innerHTML = form();

const addEvent = () => {
  const handleForm = document.querySelector('#editForm');
  handleForm.addEventListener('submit', submit);
};

addToForm();
addEvent();







