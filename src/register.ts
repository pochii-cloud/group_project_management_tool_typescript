interface iUsers {
    username: string,
    password: string,
    id: number
}



async function saveCredentials()
{
    // const registeredemail = (document.getElementById("registeremail")! as HTMLInputElement).value;
    const registeredname = (document.getElementById("registerusername")! as HTMLInputElement).value;
    const registeredpassword = (document.getElementById("registerpassword")! as HTMLInputElement).value;
    const confirmedpassword = (document.getElementById("confirmpassword")! as HTMLInputElement).value;
    const usednamespan = document.getElementById("usednamespan") as HTMLSpanElement;
    const usedpasswordspan = document.getElementById("usedpasswordspan") as HTMLSpanElement;
    const repeatedpasswordspan = document.getElementById("repeatedpasswordspan") as HTMLSpanElement;
    
     
    if(registeredpassword !== confirmedpassword)
    {
        repeatedpasswordspan.innerText = "passwords do not match".toUpperCase();
        repeatedpasswordspan.classList.add("error-message");
        usedpasswordspan.innerText = "passwords do not match".toUpperCase();
        usedpasswordspan.classList.add("error-message"); 
        // alert("passwords don't match");  
         
    } 

    
    const response = await fetch('http://localhost:3000/users')
    const usersdetails = await response.json() as iUsers[]
    // console.log(usersdetails)    
    const checked = usersdetails.find(userdt => {
        if(userdt.username == registeredname)
        {
            return true;
        }
        return false;        
    });
    
    // check if name already exists       
    if(checked){
        usednamespan.innerText = "this user already exists..pick another name".toUpperCase();
        usednamespan.classList.add("error-message");
        // alert("pick another username")
      
    }
    else if(!checked)
    {
        // check if passwords are same
        if(registeredpassword === confirmedpassword){
            // print passwords match
            // alert("passwords match");
            // object to hold credentials
            const credentials = {
                // email: registeredemail,
                username: registeredname,
                password: registeredpassword
            };
            // console.log(credentials)
            // localStorage.setItem("credentials", JSON.stringify(credentials));
            postUserDetails(credentials);             
        }
        if(registeredname == 'admin')
        {
            
            window.location.href = "/index.html";
        }
        else {
            window.location.href = "/user.html";
        }
        localStorage.setItem("auth",'1'); 
    }       

}


async function postUserDetails(obj:{})
{
    await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body:JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    });
}



document.getElementById("registerform")!.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCredentials();
});