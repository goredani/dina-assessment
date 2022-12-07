const formContainer = document.querySelector('#form');

const pattern = /edit\/(\d+)/;
const url = window.location.pathname;
let regex = new RegExp(pattern);
let match = regex.exec(url);
let userId = String(match[1]);

let editForm = (id, fName, lName, status) => {
    return `
    <h2>Edit User (${id}) </h2>
    <form id="editForm">
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname" value=${fName} ${status === 'locked' ? 'disabled' : ''}><br><br>
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname" value=${lName} ${status === 'locked' ? 'disabled' : ''}><br><br>
       

        <fieldset>
            <legend>Select active:</legend>
            <div>
                <input type="radio" id="active" name="status" value='active' ${status === 'active' ? 'checked' : ''}>
                <label for="active">Active</label>
            </div>
            <div>
                <input type="radio" id="locked" name="status" value='locked' ${status === 'locked' ? 'checked' : ''}>
                <label for="inactive">Locked</label>
            </div>
            

        </fieldset>
        <input type="submit" value="Submit" >
        <button>Cancel</button>
    </form>
    `
}

let update = {};

const submit = (event) => {
    event.preventDefault();
    const first_name = event.target.elements.fname.value;
    const last_name = event.target.elements.lname.value;
    update = {
        first_name: first_name,
        last_name: last_name
    }
    JSON.stringify(update)
    console.log(update)
   updateUser();
}



const getUser = () => {
    fetch(`https://assessment-users-backend.herokuapp.com/users/${userId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        formContainer.innerHTML = editForm(data.id, data.first_name, data.last_name, data.status);
        const handleForm = document.querySelector('#editForm');
        handleForm.addEventListener('submit', submit);
        }    
    )
 
}

const options = {
	method: 'PUT',
	headers: {
		'content-type': 'application/json',
		origin: 'example.com',
		// 'x-requested-with': 'example.com',
		// 'X-RapidAPI-Key': '6785502b5fmshea061e0c1243d1fp1cdb88jsn46601d1f963a',
		// 'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
	},
	body: update
};

const updateUser = () => {
    fetch(`https://assessment-users-backend.herokuapp.com/users/${userId}`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

getUser(userId);

