let userprofile = document.querySelector(".userprofile");
let projcard=document.querySelector(".projectcards")
let completproj=document.querySelector(".usersdiv")
let overcards=document.querySelector(".cards")



async function fetchusers() {
  let users = await fetch("http://localhost:3000/users/2");
  let fetcheduser = await users.json();
  console.log(fetcheduser)

  let html = `
    <img src="/images/2pac.jpg"/>
    <h4>${fetcheduser.username}</h4>
    `;
  userprofile!.innerHTML = html;
}

async function renderproject() {
    let projectsdb = await fetch("http://localhost:3000/Projects");
    let projects = await projectsdb.json();
  
    let usersdb = await fetch("http://localhost:3000/users/2");
    let user = await usersdb.json();
    
    // Loop through each project and match the assigneduser with the current user's username
    projects.forEach((project:any) => {
      if (project.assigneduser === user.username) {

        let html=`<div class="projectcard">
                   <h5>${project.projectname}</h5>
                   <h5>${project.assigneduser}</h5>
                   ${
                     project.status == "completed"
                       ? '<h5 style="color: green;">completed</h5>'
                       : '<h5 style="color: red;">pending</h5>'
                   }
                   <div class="icons">
                      
                       ${project.status == "pending"?`<button onClick=markcomplete(${project.id})>complete<button>`:''}
                       
                   </div>
                </div>
        `
     projcard!.innerHTML+=html

        console.log(
          `Project ${project.projectname} is assigned to user ${user.username}`
        );
      }
    });
  }
  

async function markcomplete(id: number) {
    let projectdb = await fetch(`http://localhost:3000/Projects/${id}`);
    let project = await projectdb.json();
    // console.log(project);
  
    if (project) {
      project.status = "completed";
      console.log('marked complete');
  
      // Send updated project data back to server
      await fetch(`http://localhost:3000/Projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
    }
  }


  async function markuncomplete(id: number) {
    let projectdb = await fetch(`http://localhost:3000/Projects/${id}`);
    let project = await projectdb.json();
    console.log(project);
  
    if (project) {
      project.status = "pending";
      console.log('marked complete');
  
      // Send updated project data back to server
      await fetch(`http://localhost:3000/Projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
    }
  }
  
  
  async function rendercompletedprojects() {
    const response = await fetch('http://localhost:3000/Projects');
    const projects = await response.json();
  
    const completedProjects = projects.filter((project:any) => project.status === 'completed');

  
    // // Clear previous project list
    // completproj!.innerHTML = '';


    
  
    // Render completed projects to the DOM
    completedProjects.forEach((project:any) => {

        let html=`<div class="projectcard">
        <h5>${project.projectname}</h5>
        <h5>${project.assigneduser}</h5>
        ${
          project.status == "completed"
            ? '<h5 style="color: green;">completed</h5>'
            : '<h5 style="color: red;">pending</h5>'
        }
        <div class="icons">
            ${project.status == "pending"?`<button onClick=markcomplete(${project.id})>complete<button>`:`<button onClick=markuncomplete(${project.id})>pending<button>`}
            
        </div>
     </div>
` 
completproj!.innerHTML+=html


    //   const projectItem = document.createElement('li');

    //   projectItem.innerText = `${project.projectname} (${project.assigneduser})`;
    //   completproj!.appendChild(projectItem);
    });
  }
  
  async function filterProjectsByUser(username:string) {
    const response = await fetch('http://localhost:3000/Projects');
    const projects = await response.json();
  
    const userProjects = projects.filter((project:any) => project.assigneduser === username);
    
    let html=`<div class="card">
    <div class="logo" style="display: grid;">
        <img src="./images/dashborad1.jpg"/>
        <img src="./images/dashborad1.jpg" style="margin-top: 2px; margin-bottom: 8px;"/>
    </div>
    <h4>Total Projects</h4>
    <h5>1</h5>
  </div>
  <div class="card">
    <div class="logo">
        <img src="/images/completed.jpg"/>
    </div>
    <h4 style="color: green;">Completed Projects</h4>
    <h5 style="color:green":>1</h5>
  </div>
  <div class="card">
    <div class="logo">
        <img src="./images/not_completed.jpg"/>
    </div>
    <h4 style="color: red;">Incomplete Projects</h4>
    <h5 style="color: red;">1</h5>
  </div> `
  overcards!.innerHTML =html
  console.log(userProjects)
    return userProjects;
  }
  

fetchusers();
renderproject();
rendercompletedprojects();
// filterProjectsByUser(username:str);

