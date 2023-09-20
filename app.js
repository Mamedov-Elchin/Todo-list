const submitBtn = document.getElementById('submit');
const changeBtn = document.getElementById('change')
const fullName = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const tbody = document.querySelector('tbody')
const thList = document.querySelectorAll('th')

let findId;
let sorted = false;

let users = JSON.parse(localStorage.getItem("users"));
if (users === null || users.length === 0) {
    users = [];
} else {
    userAddToTable(users)
    customId = users[users.length - 1].id
}

let userId = localStorage.getItem("userId");
if (userId === null) {
    userId = 0;
}


submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if (fullName.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    users.push({
        id: ++userId,
        name: fullName.value,
        email: email.value,
        password: password.value
    })
    localStorage.setItem('userId', userId)

    refreshTable()

    fullName.value = '';
    email.value = '';
    password.value = '';
})

changeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    users.forEach(user => {
        if (user.id === findId) {
            user.email = email.value;
            user.name = fullName.value;
            user.password = password.value;
        }
    });

    refreshTable()
    changeBtn.style.display = 'none';
    submitBtn.style.display = 'block'

})
thList.forEach(th => {
    th.addEventListener('click', (e) => {
        switch (e.target.innerText) {
            case 'Id':
                if (sorted) {
                    users.sort((a, b) => b.id - a.id)
                    sorted = false;
                    refreshTable(users)
                } else {
                    users.sort((a, b) => a.id - b.id)
                    sorted = true;
                    refreshTable(users)
                }
                console.log(users);
                break;
            case "Full Name":
            case "Email":
                if (sorted) {
                    users.sort((a, b) => b.name.localeCompare(a.name))
                    sorted = false;
                    refreshTable(users)
                } else {
                    users.sort((a, b) => a.name.localeCompare(b.name))
                    sorted = true;
                    refreshTable(users)
                }
                console.log(users);

            default:
                break
        }
    })
})


function userAddToTable(param) {
    users.forEach(item => {
        tbody.innerHTML += `
            <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>
                <button onclick ="deleteUser(${item.id})">Delete</button>
                <button  onclick ="updateUser(${item.id})" >Update</button>
            </td>
        </tr>
 `
    })
}
function deleteUser(param) {
    users = users.filter(item => item.id !== param)
    refreshTable()
}
function updateUser(param) {
    findId = param
    users.forEach(user => {
        if (user.id === param) {
            fullName.value = user.name
            email.value = user.email
            password.value = user.password

        }
    })
    changeBtn.style.display = 'block';
    submitBtn.style.display = 'none'
}
function refreshTable(param) {
    localStorage.setItem("users", JSON.stringify(users));
    tbody.innerHTML = ''
    userAddToTable(users)
}

function userSorting() {

}
