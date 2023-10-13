const principal = 'http://localhost:8080/api/v1/principal'

const CurrenUserPanelData = document.getElementById("CurrenUserPanel");
const CurrentAuthorisedUserData = document.getElementById("CurrentPrincipal");

let currentUserInfo = () => {
    fetch (principal, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {
            if (user != null) {
                CurrenUserPanelData.innerHTML = `
                    <tr>
                        <td> ${user.id} </td>
                        <td> ${user.name} </td>
                        <td> ${user.lastName} </td>
                        <td> ${user.age} </td>
                        <td> ${user.email} </td>
                        <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? " USER" : " ADMIN")} </td>
                    </tr>
                `
                CurrentAuthorisedUserData.innerHTML = `
                    <p class="text">${user.username} with role ${user.roles.map((role) => role.name === "ROLE_USER" ? " USER" : " ADMIN")}</p>`
            }
        })
}
currentUserInfo();