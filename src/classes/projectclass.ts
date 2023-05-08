import ProductInterface from "../Interfaces/ProjectInterface";

class Project implements ProductInterface{
       id: number;
       projectname: string;
       projectdescription: string;
       assigneduser: string;
       status: string;

      constructor(id:number,projectname:string, projectdescription: string, assigneduser:string,status: string)
        {   
            this.id=id
            this.projectname=projectname
            this.projectdescription=projectdescription
            this.assigneduser=assigneduser
            this.status=status
        }
}
export default Project