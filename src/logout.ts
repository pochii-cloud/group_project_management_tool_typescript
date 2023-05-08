function authoriseUser() {
    document.querySelector('body')!.style.display = "none";
    const authobj = localStorage.getItem("auth");
    if(authobj != '1'){
        window.location.replace("/");
        //console.log("not authenticated")
    }
    else {
        document.querySelector("body")!.style.display = "block";
        // console.log("authenticated")
    }
    // logout trigger for user
    document.querySelector("#logoutuser")!.addEventListener("click", (e) => {    
        // console.log("logoutuser clicked");
        window.location.href = "/login.html";
    });
    // logout trigger for admin
    document.querySelector("#listlogout")!.addEventListener("click", (e) => {    
        // console.log("logoutuser clicked");
        window.location.href = "/login.html";
    });
      
 }

authoriseUser()

