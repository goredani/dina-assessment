export const displayUsers = (user) => `<div ${user.status === 'locked' ? 'class="user locked"' : 'class="user"'} id=${user.id}>
            <div>
                <div class="user-name">${user.first_name} ${user.last_name}</div>
                <div class="user-created">${new Date(user.created_at)}</div>
            </div>
            
            <div class="button-container">
                <button class="edit-button">Edit</button>
            </div>
            
            </div>`;