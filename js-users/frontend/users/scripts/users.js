import { displayUsers } from '../../modules/displayUsers.js';

const editUser = (userId) => {
  location.href = `/edit/${userId}`;
};

const addEvent = () => {
  const userData = document.querySelectorAll('.user');
  userData.forEach((event) => {
    const editButton = event.querySelector('.edit-button');

    editButton.addEventListener('click', () => {
      editUser(event.id);
    });
  });
};

const getUsers = () => {
  const rootElement = document.querySelector('#root');

  fetch('https://assessment-users-backend.herokuapp.com/users/', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      const itemsPerPage = 10;
      const totalPages = Math.ceil(data.length / itemsPerPage);

      rootElement.insertAdjacentHTML('beforeend', '<div id="pagination-buttons"></div>');

      const showPage = (page) => {
        let currentPage = 1;
        // Update the current page
        currentPage = page;

        // Calculate the start and end indexes for the items on the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the array of items to get the items on the current page
        const pageItems = data.slice(startIndex, endIndex);

        // Generate the HTML for the items on the current page
        let itemsHtml = '';
        for (const item of pageItems) {
          itemsHtml += displayUsers(item);
        }

        // Insert the items HTML and the pagination buttons HTML into the page
        document.getElementById('items').innerHTML = itemsHtml;

        const paginationButtonsContainer = document.getElementById('pagination-buttons');

        paginationButtonsContainer.innerHTML = generatePaginationButtons();

        for (const button of paginationButtonsContainer.getElementsByTagName('button')) {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            showPage(event.target.innerText);
          });
        }

        addEvent();
      };

      const generatePaginationButtons = () => {
        // Create an empty string to store the HTML
        let paginationButtons = '';

        // Loop through the total number of pages
        for (let i = 1; i <= totalPages; i++) {
          // Add the page number to the pagination buttons

          paginationButtons += `<button>${i}</button>`;
        }

        return paginationButtons;
      };

      showPage(1);
    });
};



getUsers();
