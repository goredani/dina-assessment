const addToForm = (data) => formContainer.innerHTML = editForm(data.id, data.first_name, data.last_name, data.status);

let editForm = (id, fName, lName, status) => {
    return `
    
    <form id="editForm">
        <h2>Edit User (${id}) </h2>
        <div class="input-container">
            <div>
                <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" required value=${fName} ${status === 'locked' ? 'disabled' : ''}>
            </div>
            <div>
                <label for="lname">Last name:</label><br>
                <input type="text" id="lname" name="lname" required value=${lName} ${status === 'locked' ? 'disabled' : ''}>
            </div>
        </div>
        
       

        <fieldset>
            <legend>Select active:</legend>
            <div>
                <input type="radio" id="active" name="status" value='active' ${status === 'active' ? 'checked' : ''}>
                <label for="active">Active</label>
            </div>
            <div>
                <input type="radio" id="locked" name="status" value='locked' ${status === 'locked' ? 'checked' : ''}>
                <label for="locked">Locked</label>
            </div>
            
        </fieldset>
        <div class="button-container">
            <input type="submit" value="Save changes" >
            <a href="/users/">Cancel </a>
        </div>
        
    </form>
    `
}

const addEvent = () => {
    const handleForm = document.querySelector('#editForm');
    handleForm.addEventListener('submit', submit);
}
