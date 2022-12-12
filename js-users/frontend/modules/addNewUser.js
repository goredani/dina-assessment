export const addNewUser = (update) => {
    fetch(`https://assessment-users-backend.herokuapp.com/users/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
          body: JSON.stringify(update),
    })
    .then(response => response.json())
      .then(response => {
            alert(`${response.first_name} ${response.last_name} successfully added`)
            location.replace("/users/")
        })
        .catch(err => console.error(err));
  };