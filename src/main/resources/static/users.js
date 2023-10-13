const usersTableNavLink = document.getElementById("usersTable");

const userList = document.querySelector('.all-users-table');


let output = '';


//User table
const renderUser = (users) => {
    users.forEach(user => {
        output += `
        <tr>
            <td> ${user.id} </td>
            <td> ${user.name} </td>
            <td> ${user.lastName} </td>
            <td> ${user.age} </td>
            <td> ${user.email} </td>
            <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? " USER" : " ADMIN")} </td>
            <td> <button type="button" class="btn btn-info btn-sm" id="btn-edit-modal-call" data-toggle="modal" data-target="modal-edit"
            data-id="${user.id}">Edit</button></td>
            <td> <button type="button" class="btn btn-danger btn-sm" id="btn-delete-modal-call"
            data-id="${user.id}">Delete</button></td>
        </tr>
        `;
    });
    userList.innerHTML = output;
}

const urlUsers = 'http://localhost:8080/api/v1/users';


// Get all user
// Method: GET
function getAllUsers () {
    fetch(urlUsers)
        .then(res => res.json())
        .then(data => renderUser(data))
}
getAllUsers();


//role generation
function getRolesFromAddUserForm() {
    let roles = Array.from(FormRoles.selectedOptions)
        .map(option => option.value);
    let addedRoles = [];
    if (roles.includes("1")) {
        let role1 = {
            name: "ROLE_ADMIN"
        }
        addedRoles.push(role1);
    }
    if (roles.includes("2")) {
        let role2 = {
            name: "ROLE_USER"
        }
        addedRoles.push(role2);
    }
    return addedRoles;
}

// Create user
// Method: POST
const urlAdd = 'http://localhost:8080/api/v1/add';
const addUserForm = document.querySelector('.adduser')

const FormName = document.getElementById("name");
const FormLastName = document.getElementById("lastName");
const FormAge = document.getElementById("age");
const FormEmail = document.getElementById("email");
const FormPassword = document.getElementById("password");
const FormRoles = document.getElementById("addUserRoles");

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    output = '';
    fetch(urlAdd, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: FormName.value,
            lastName: FormLastName.value,
            age: FormAge.value,
            email: FormEmail.value,
            password: FormPassword.value,
            roles: getRolesFromAddUserForm()
        })
    })
    .then(res => res.json())
    .then(data => renderUser(data))
    usersTableNavLink.click();
})

//edit


const modalEditExitBtn = document.getElementById("exitBtnEditModal");
const modalEditCloseBtn = document.getElementById("closeBtnEditModal");
const modalEditSubmitBtn = document.getElementById("submitBtnEditModal");
const editUsersRoles = document.getElementById("editRoles");
const editRoleAdminOption = document.getElementById("edit-role_admin");
const editRoleUserOption = document.getElementById("edit-role_user");

const url = 'http://localhost:8080/api/v1'


//role generation
function getRolesFromEditUserForm() {
    let roles = Array.from(editUsersRoles.selectedOptions)
        .map(option => option.value);
    let addedRoles = [];
    if (roles.includes("1")) {
        let role1 = {
            name: "ROLE_ADMIN"
        }
        addedRoles.push(role1);
    }
    if (roles.includes("2")) {
        let role2 = {
            name: "ROLE_USER"
        }
        addedRoles.push(role2);
    }
    return addedRoles;
}


//submit click Edit/Delete
userList.addEventListener("click", e => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id === 'btn-delete-modal-call';
    let editButtonIsPressed = e.target.id === 'btn-edit-modal-call';




const editUserId = document.getElementById("editId");
const editUserName = document.getElementById("editName");
const editUserLastName = document.getElementById("editLastName");
const editUserAge = document.getElementById("editAge");
const editUserEmail = document.getElementById("editEmail");
const editUserPassword = document.getElementById("editPassword");

if (editButtonIsPressed) {
    let currentUserId = e.target.dataset.id;
    fetch(url + "/" + currentUserId, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {

            editUserId.value = user.id;
            editUserName.value = user.name;
            editUserLastName.value = user.lastName;
            editUserAge.value = user.age;
            editUserEmail.value = user.email;

            let editRoles = user.roles.map(role => role.name)
            editRoles.forEach(
                role => {
                    if (role === "ROLE_ADMIN") {
                        editRoleAdminOption.setAttribute('selected', "selected");

                    } else if (role === "ROLE_USER") {
                        editRoleUserOption.setAttribute('selected', "selected");
                    }
                })
        })
    $('#editModal').modal('show');

    // Method: PATCH
    modalEditSubmitBtn.addEventListener("click", e => {
        output = '';
        e.preventDefault();
        let user = {
            id: editUserId.value,
            name: editUserName.value,
            lastName: editUserLastName.value,
            age: editUserAge.value,
            email: editUserEmail.value,
            password: editUserPassword.value,
            roles: getRolesFromEditUserForm()
        }
        fetch(`${url}`+ "/", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => renderUser(data))
        usersTableNavLink.click();
    })
}



//Delete user

const modalDeleteExitBtn = document.getElementById("exitBtnDeleteModal");
const modalDeleteCloseBtn = document.getElementById("closeBtnDeleteModal");
const modalDeleteSubmitBtn = document.getElementById("submitBtnDeleteModal");
const deleteUsersRoles = document.getElementById("deleteRoles");
const deleteRoleAdminOption = document.getElementById("delete-role_admin");
const deleteRoleUserOption = document.getElementById("delete-role_user");


const deleteUserId = document.getElementById("deleteId");
const deleteUserName = document.getElementById("deleteName");
const deleteUserLastName = document.getElementById("deleteLastName");
const deleteUserAge = document.getElementById("deleteAge");
const deleteUserEmail = document.getElementById("deleteEmail");
const deleteUserPassword = document.getElementById("deletePassword");

if (delButtonIsPressed) {
    let currentUserId = e.target.dataset.id;
    fetch(url + "/" + currentUserId, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {

            deleteUserId.value = user.id;
            deleteUserName.value = user.name;
            deleteUserLastName.value = user.lastName;
            deleteUserAge.value = user.age;
            deleteUserEmail.value = user.email;

            let editRoles = user.roles.map(role => role.name)
            editRoles.forEach(
                role => {
                    if (role === "ROLE_ADMIN") {
                        deleteRoleAdminOption.setAttribute('selected', "selected");

                    } else if (role === "ROLE_USER") {
                        deleteRoleUserOption.setAttribute('selected', "selected");
                    }
                })
        })
    $('#deleteModal').modal('show');

    // Method: DELETE
    modalDeleteSubmitBtn.addEventListener("click", e => {
        output = '';
        e.preventDefault();
        fetch(`${url}/${currentUserId}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => renderUser(data))
        usersTableNavLink.click();
    })
}
})

const principal = 'http://localhost:8080/api/v1/principal'

const userPanelData = document.getElementById("userPanel");
const authorisedUserData = document.getElementById("principal");

let currentUser = () => {
    fetch (principal, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {
            if (user != null) {
                userPanelData.innerHTML = `
                    <tr>
                        <td> ${user.id} </td>
                        <td> ${user.name} </td>
                        <td> ${user.lastName} </td>
                        <td> ${user.age} </td>
                        <td> ${user.email} </td>
                        <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? " USER" : " ADMIN")} </td>
                    </tr>
                `
                authorisedUserData.innerHTML = `
                    <a class="text-start">${user.username} with role ${user.roles.map((role) => role.name === "ROLE_USER" ? " USER" : " ADMIN")}</a>`
            }
        })
}
currentUser();


