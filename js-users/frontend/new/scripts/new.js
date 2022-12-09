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
	.then(response => {
        alert(`${response.first_name} ${response.last_name} successfully added`)
        location.replace("/users/")
    })
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


