const formContainer = document.querySelector('#formContainer');

const submitForm = (newUserData) => {

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            origin: 'example.com',
            'x-requested-with': 'example.com',
            'X-RapidAPI-Key': '6785502b5fmshea061e0c1243d1fp1cdb88jsn46601d1f963a',
            'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
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
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname"><br><br>
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname"><br><br>
        <fieldset>
            <legend>Select active:</legend>
            <div>
                <input type="radio" id="active" name="active" value="active" checked>
                <label for="active">Active</label>
            </div>
            <div>
                <input type="radio" id="inactive" name="active" value="locked">
                <label for="inactive">Inactive</label>
            </div>
            

        </fieldset>
        
        <input type="submit" value="Create New">
    </form>
    `
}

formContainer.innerHTML = newForm();

const formHandler = document.querySelector('#newForm');

formHandler.addEventListener('submit', newUser);
