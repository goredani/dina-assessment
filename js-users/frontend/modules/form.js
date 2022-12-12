export const form = (id, fName = '' , lName = '', status) => {
    return `

    <form id="editForm">
        <h2>${status === undefined ? "Add user" : "Edit user" } </h2>
        <div class="input-container">
            <div>
                <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" placeholder='eg. John' required value=${fName} ${status === 'locked' ? 'disabled' : ''} >
            </div>
            <div>
                <label for="lname">Last name:</label><br>
                <input type="text" id="lname" name="lname" placeholder='eg. Doe' required value=${lName} ${status === 'locked' ? 'disabled' : ''} >
            </div>
        </div>
        
       

        <fieldset>
            <legend>Select active:</legend>
            <div>
                <input type="radio" id="active" name="status" value='active' ${status === 'active' || status === undefined ? 'checked' : ''}>
                <label for="active">Active</label>
            </div>
            <div>
                <input type="radio" id="locked" name="status" value='locked' ${status === 'locked' ? 'checked' : ''}>
                <label for="locked">Locked</label>
            </div>
            
        </fieldset>
        <div class="button-container">
            <input type="submit" value="${status === undefined ? "Add new user" : "Save changes"}">
            <a href="/users/">Cancel </a>
        </div>
        
    </form>
    `
};