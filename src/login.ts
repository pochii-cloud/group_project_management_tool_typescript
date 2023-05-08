interface iUsers {
    username: string,
    password: string,
    id: number
}


async function validateLogin() {
    // get our values
    const loginedusername = (document.getElementById("loginusername")! as HTMLInputElement).value;
    const loginedpassword = (document.getElementById("loginpassword")! as HTMLInputElement).value;
    const loginForm = document.getElementById('loginform')! as HTMLFormElement;

    // fetch username and passwords from db
    // put into function    
    // const usersdetails = getUsersDetails(); 
    const response = await fetch('http://localhost:3000/users')
    const usersdetails = await response.json() as iUsers[]
    // console.log(usersdetails)
    
    const userdetail = usersdetails.find(userdt => {
        if(userdt.username == loginedusername && userdt.password == loginedpassword )
        {
            return userdt.id
        }
        return false;        
    });

    if(userdetail)
    {
        console.log("nikuzuri");
        //console.log(userdetail);
        document.getElementById("usernamespan")!.classList.remove("error-message");
        document.getElementById("usernamespan")!.innerText = "";
        document.getElementById("passwordspan")!.classList.remove("error-message");
        document.getElementById("passwordspan")!.innerText = "";
        // redirect
        loginForm.submit();
        if(loginedusername == 'admin')
        {
            
            window.location.href = "/index.html";
        }
        else {
            window.location.href = "/user.html";
        }
        localStorage.setItem("auth",'1');
    }
    else if(!userdetail)
    {
        // redirect
        console.log("nikubad");
        for(let i=0; i<usersdetails.length; i++)
        {
            if(usersdetails[i].username != loginedusername && usersdetails[i].password != loginedpassword)
            {
                document.getElementById("usernamespan")!.innerText = "usernames do not match".toUpperCase();
                document.getElementById("usernamespan")!.classList.add("error-message"); 
                document.getElementById("passwordspan")!.innerText = "passwords do not match".toUpperCase();
                document.getElementById("passwordspan")!.classList.add("error-message"); 
            }
            else if(usersdetails[i].password == loginedpassword && usersdetails[i].username != loginedusername)
            {
                document.getElementById("usernamespan")!.innerText = "usernames do not match".toUpperCase();
                document.getElementById("usernamespan")!.classList.add("error-message"); 
                document.getElementById("passwordspan")!.classList.remove("error-message");
                document.getElementById("passwordspan")!.innerText = "";               
            }
            else if(usersdetails[i].username == loginedusername && usersdetails[i].password != loginedpassword)
            {
                document.getElementById("passwordspan")!.innerText = "passwords do not match".toUpperCase();
                document.getElementById("passwordspan")!.classList.add("error-message");
                document.getElementById("usernamespan")!.classList.remove("error-message");
                document.getElementById("usernamespan")!.innerText = ""; 
            }
                        
        }       
         
        // console.log(userdetail);        
              
    }    
    
 }

 



// form trigger
document.getElementById('loginform')!.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents form from submittin
    validateLogin(); // call validation
})






