const formContainer = document.querySelector('#formContainer');

const submitForm = (newUserData) => {

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            origin: 'example.com'
        },
        body: newUserData
    };

    console.log(newUserData);

    fetch(`https://assessment-users-backend.herokuapp.com/users/`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

const newUser = (event) => {
    event.preventDefault();
    const first_name = event.target.elements.fname.value;
    const last_name = event.target.elements.lname.value;
    const status = event.target.elements.active.value;

    newUserData = {
        first_name: first_name,
        last_name: last_name,
        status: status
    }

    submitForm(JSON.stringify(newUserData));
}

const newForm = () => {
    return `
    <form id="newForm">
        <h2>New User</h2>
        <div class="input-container">
            <div>
                <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" placeholder="First name" required >
            </div>
            <div>
                <label for="lname">Last name:</label><br>
                <input type="text" id="lname" name="lname" placeholder="Last name" required >
            </div>
        </div>
        
       

        <fieldset>
            <legend>Select active:</legend>
            <div>
                <input type="radio" id="active" name="status" value='active' checked >
                <label for="active">Active</label>
            </div>
            <div>
                <input type="radio" id="locked" name="status" value='locked' >
                <label for="locked">Locked</label>
            </div>
            
        </fieldset>
        <div class="button-container">
            <input type="submit" value="Add new user" >
            <a href="/users/">Cancel </a>
        </div>
        
    </form>
    `
}

formContainer.innerHTML = newForm();

const formHandler = document.querySelector('#newForm');

formHandler.addEventListener('submit', newUser);
