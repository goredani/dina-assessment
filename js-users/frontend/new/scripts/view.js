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