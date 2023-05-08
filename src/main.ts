import ProjectInterface from "./Interfaces/ProjectInterface";
import Project from "./classes/projectclass";
let projectcards = document.querySelector(".projectcards");
let btn = document.querySelector(".btn");
let assigneduser = document.querySelector("#assigneduser");
let overviewcards = document.querySelector(".cards");
let listusers=document.querySelector(".usersdiv")
let togglenav=document.querySelector(".togglenav")
let nav=document.querySelector(".nav")



togglenav?.addEventListener("click",()=>{
    nav?.classList.add('active');
})
async function renderoverview() {
  let res = await fetch("http://localhost:3000/Users");
  let userslist = await res.json();
  let userscount = userslist.length - 1;

  let response = await fetch("http://localhost:3000/Projects");
  let projects = await response.json();
  let projectscount = projects.length;

  let completedProjects = projects.filter(
    (project: any) => project.status === "completed"
  );

  let pendingProjects = projects.filter(
    (project: any) => project.status === "pending"
  );
 
  let html = `
  <div class="card">
  <div class="logo" style="display: grid;">
      <ion-icon name="person-circle-outline"></ion-icon>
  </div>
  <h4>Total users</h4>
  <h5>${userscount}</h5>
</div>
<div class="card">
  <div class="logo" style="display: grid;">
      <img src="./images/dashborad1.jpg"/>
      <img src="./images/dashborad1.jpg" style="margin-top: 2px; margin-bottom: 8px;"/>
  </div>
  <h4>Total Projects</h4>
  <h5>${projectscount}</h5>
</div>
<div class="card">
  <div class="logo">
      <img src="/images/completed.jpg"/>
  </div>
  <h4 style="color: green;">Completed Projects</h4>
  <h5 style="color:green":>${completedProjects.length}</h5>
</div>
<div class="card">
  <div class="logo">
      <img src="./images/not_completed.jpg"/>
  </div>
  <h4 style="color: red;">Incomplete Projects</h4>
  <h5 style="color: red;">${pendingProjects.length}</h5>
</div> 
  `;
  overviewcards!.innerHTML=html
}



async function renderprojects() {
  let response = await fetch("http://localhost:3000/Projects");
  let projects = await response.json();
  projects.forEach((project: any) => {
    let html = `
        <div class="projectcard">
                   <h5>${project.projectname}</h5>
                   <h5>${project.assigneduser}</h5>
                   ${
                     project.status == "completed"
                       ? '<h5 style="color: green;">completed</h5>'
                       : '<h5 style="color: red;">pending</h5>'
                   }
                   <div class="icons">
                       
                       <div class="dropdown">
                           <ion-icon name="ellipsis-vertical-circle-outline"></ion-icon>
                           
                           <div class="dropdown-options">
                             <a style="cursor:pointer" onClick="updateProject(${
                               project.id
                             })">Update</a>
                             <a style="cursor:pointer" onClick="deleteProject(${
                               project.id
                             })">Delete</a>
                           </div>
                         </div>
                        
                   </div>
                </div>
        
        `;
    projectcards!.innerHTML += html;
  });
}

btn!.addEventListener("click", () => {
  if (btn?.innerHTML === "Add Project") {
    addproject();
  }
});

function readvalues() {
  let projectname = (document.querySelector("#projectname") as HTMLInputElement)
    .value;
  let projectdescription = (
    document.querySelector("#projectdescription") as HTMLInputElement
  ).value;
  let assigneduser = (
    document.querySelector("#assigneduser") as HTMLInputElement
  ).value;

  let formdata = {
    projectname,
    projectdescription,
    assigneduser,
    status: "pending",
  };
  return formdata;
}

async function addproject() {
  let response = await fetch("http://localhost:3000/Projects", {
    method: "POST",
    body: JSON.stringify(readvalues()),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function prePopulate(project: Project) {
  (document.querySelector("#projectname")! as HTMLInputElement).value =
    project.projectname;
  (document.querySelector("#projectdescription")! as HTMLInputElement).value =
    project.projectdescription;
  (document.querySelector("#assigneduser")! as HTMLInputElement).value =
    project.assigneduser;
  (
    document.querySelector(".btn")! as HTMLButtonElement
  ).textContent = `Update Project`;
}




async function updateProject(id: number) {
  const response = await fetch(`http://localhost:3000/Projects/${id}`);
  const project = await response.json();
  console.log(id);
  prePopulate(project);

  const btn = document.querySelector(".btn")! as HTMLButtonElement;

  btn.addEventListener("click", () => {
    const updatedProject = readvalues();
    if (btn.innerHTML === "Update Project") {
      sendUpdate({ ...updatedProject, id });
      console.log("Updating");
    }
  });
}

async function sendUpdate(project: Project) {
  await fetch(`http://localhost:3000/Projects/${project.id}`, {
    method: "PUT",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function deleteProject(id: number) {
  await fetch(`http://localhost:3000/Projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function deleteUser(id: number) {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchusers() {
  const projects = await fetch(" http://localhost:3000/Projects");
  const rprojects = await projects.json();

  const response = await fetch("http://localhost:3000/Users");
  const users = await response.json();

  const unassignedUsers = users.filter((user: any) => {
    // Check if the user's username is not present in the assigneduser property of any project
    return (
      !rprojects.some((project: any) => {
        return project.assigneduser === user.username;
      }) && user.username !== "admin"
    );
  });

  console.log(unassignedUsers); // This will log an array of users that are not assigned to any project

  unassignedUsers.forEach((user: any) => {
    let html = `<option>${user.username}</option>`;
    assigneduser!.innerHTML += html;
  });
}


async function renderusers() {
  let response = await fetch("http://localhost:3000/users");
  let users = await response.json();
  console.log(users)
  const projects = await fetch("http://localhost:3000/Projects");
  const rprojects = await projects.json();

  // Loop through the users array
  users.forEach((user: any) => {
    if (user.username !== "admin") { // Skip user with username "admin"
      console.log(`User: ${user.username}`);

      // Find the project assigned to the current user
      const assignedProject = rprojects.find((project: any) => project.assigneduser === user.username);

      if (assignedProject) {
        console.log(`Assigned project: ${assignedProject.projectname} - ${assignedProject.projectdescription} - ${assignedProject.status}`);
      } else {
        console.log('No assigned project');
      }

      let html = `
        <div class="userscard">
          <ion-icon name="person-circle-outline"></ion-icon>
          <h5>${user.username}</h5>
          ${assignedProject ? `
            <h5>${assignedProject.projectname}</h5>
          ` : '<h5>N/A</h5>'}
          <h5><a onClick=deleteUser(${user.id})><ion-icon name="trash-outline"></ion-icon></a></h5> 
        </div>
      `;
      listusers!.innerHTML += html;
    }
  });
}

renderoverview();
renderprojects();
fetchusers();
renderusers();
