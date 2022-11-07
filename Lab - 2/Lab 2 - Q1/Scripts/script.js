let conArray = [];
let sort = 1;

class Person
{
    constructor(name, num, email)
    {
        this.name = name;
        this.num = num;
        this.email = email;
    }

    getName()
    {
        return this.name;
    }

    getNum()
    {
        return this.num;
    }

    getEmail()
    {
        return this.email;
    }
}

function viewTable()
{
    const tableBody = document.querySelector("tbody");
    let filteredArray = conArray;

    while (tableBody.lastChild)
    {
        tableBody.removeChild(tableBody.lastChild);
    }

    const table = document.querySelector("table");

    filteredArray.forEach(function(Person) 
    {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${Person.getName()}</td>
        <td>${Person.getNum()}</td>
        <td>${Person.getEmail()}</td>
        `;
        tableBody.appendChild(row);
    })
}

window.onload = function()
{
    viewTable();
    document.getElementById("saveContact").addEventListener("click", () => 
    {
        const nameInput = document.getElementById("contactName");
        const numInput = document.getElementById("mobNum");
        const emailInput = document.getElementById("emailAdd");

        const name = nameInput.value;
		const num = numInput.value;
		const email = emailInput.value;

        if(!name || !num || !email) 
        {
			errorMes("All Fields Must Be Filled Out");
			return;
		}
		if(name.match(/[^a-zA-Z\s]/)) 
        {
			errorMes("The Name Should Only Contain Letters");
			return;
		}

		if(name.length >= 20) 
        {
			errorMes("The Name Can Only Have 20 Or Less Characters");
			return;
		}

		if(num.match(/[^0-9]/)) 
        {
			errorMes("Mobile Number Should Only Contain Numbers");
			return;
		}

		if(num.length !== 10) 
        {
			errorMes("Mobile Number Should Have 10 Numbers");
			return;
		}

		if(!email.match(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)) 
        {
			errorMes("The Email Address Can Only Contain The Following Characters: Letters, Numbers, @, .");
			return;
		}

		if(email.length >= 40) 
        {
			errorMes("The Email Can Only Have 40 Or Less Characters");
			return;
		}

        nameInput.value = "";
        numInput.value = "";
        emailInput.value = "";

        conArray.push(new Person(name, num, email));
        viewTable();
    })
}

function errorMes(warning) 
{
    let errorModal = new bootstrap.Modal(document.getElementById("error"));
    document.getElementById("errorMessage").innerHTML = warning;
    errorModal.show();
}

document.getElementById("sorting").addEventListener("click", () => 
{
    if(sort === 1) 
    {
        conArray.sort((x, y) => x.name.localeCompare(y.name));
        sort = -1;
    }
    else 
    {
        conArray.sort((x, y) => y.name.localeCompare(x.name));
        sort = 1;
    }
    viewTable();
});