const users = document.querySelector('#paginated-list');

const displayUsers = (user) => {
            return `<div ${user.status === 'locked' ? 'class="user locked"' : 'class="user"'}>
            <div>
                <div class="user-name">${user.first_name} ${user.last_name}</div>
                <div class="user-created">${new Date(user.created_at)}</div>
            </div>
            
            <div class="button-container">
                <button id=${user.id}>Edit</button>
            </div>
            
            </div>`      
}

const editUser = (userId) => {
    location.href = `/edit/${userId}`;
}

const addEvent = () => {
    const userData = document.querySelectorAll('.user');
    userData.forEach((event) => {
        const editButton = event.querySelector('button');
        editButton.addEventListener('click', () => {
            editUser(editButton.id);
        });
    })
}

const getUsers = () => {
    fetch('https://assessment-users-backend.herokuapp.com/users/', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => 
        {  
            const itemsPerPage = 10;
            const totalPages = Math.ceil(data.length / itemsPerPage);
            console.log(totalPages);

            let currentPage = 1;

            const paginationButtonsContainer = document.getElementById('pagination-buttons');

            function showPage(page) {
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
                paginationButtonsContainer.innerHTML = generatePaginationButtons();

                for (let button of paginationButtonsContainer.getElementsByTagName('button')) {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        showPage(event.target.innerText);
                    })
                }

                addEvent();
            }


            function generatePaginationButtons() {
                // Create an empty string to store the HTML
                let paginationButtons = '';
              
                // Loop through the total number of pages
                for (let i = 1; i <= totalPages; i++) {
                  // Add the page number to the pagination buttons
                  paginationButtons += `<button>${i}</button>`;
                }

                return paginationButtons;
            }
             
            // Function to show the specified page of items 
            // showPage(${i})

            showPage(1);


            
    })
 
}

getUsers();




