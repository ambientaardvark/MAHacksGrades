const Assignment = require("./assignment.js");
class Course{

    constructor(name, ownerList, id, school){
        this.name = name;
        this.ownerList = ownerList; //LIST OF IDS
        this.assignmentList = [];
        this.studentList = [] //LIST OF IDS
        this.id = id;
        this.school = school;
    }
    loadCourse(dataobj)
    {
        this.name = dataobj.name;
        this.ownerList = dataobj.ownerList;
        this.assignmentList = [];
        for(var i = 0; i < dataobj.assignmentList.length; i++)
        {
            this.assignmentList.push((new Assignment()).loadAssignment(dataobj.assignmentList[i]));
        }
        this.studentList = [];
        
    }
    addUser(user)
    {
        user.courseList.push(this);
        this.studentList.push(user.id);
    }

    createAssignment(name, maximumGrade, quarter){
        let assignment = new Assignment(name, maximumGrade, quarter, this.name);
        this.assignmentList.push(assignment);
        return assignment;
    }

    removeAssignment(assignment){
        let assignmentIndex = -1;
        for (let index = 0; index < this.assignmentList.length; index++) {
            const element = this.assignmentList[index];
            if(element == assignment){
                assignmentIndex = index;
            }
        }
        this.assignmentList.splice(assignmentIndex, 1);
    }

    removeOwner(owner){
        if(this.ownerList.length == 1){
            return;
        }
        let ownerIndex = -1;
        for (let index = 0; index < this.ownerList.length; index++) {
            const element = this.ownerList[index];
            if(element == owner){
                ownerIndex = index;
            }
        }
        if(ownerIndex>-1){
            this.ownerList.splice(ownerIndex, 1);
        }
    }

    removeStudent(student){
        let studentIndex = -1;
        for (let index = 0; index < this.studentList.length; index++) {
            const element = this.studentList[index];
            if(element == student){
                studentIndex = index;
            }
        }
        if(studentIndex>-1){
            this.studentList.splice(studentIndex, 1);
        }
    }
    
    getData(user) //getting data with permissions from the given user
    {
        var data = {
            name: this.name,
            ownerList: [],
            assignmentList: [],
            studentList: [],
            id: this.id
        };
        if(typeof user === "undefined")
        {
            user = {permissionLevel:2, id:-1};
        }
        if(user.permissionLevel > 0 || user.hasCourse(this.id))
        {
            for(var i = 0; i < this.studentList.length; i++)
            {
                data.studentList.push(this.school.getUser(this.studentList[i]));
            }
            for(var i = 0; i < this.assignmentList.length; i++)
            {
                data.assignmentList.push(this.assignmentList[i].getData(user.id, user.permissionLevel > 1));
            }
        }
        try
        {
        if(typeof this.ownerList != "undefined"){
        for(var i = 0; i < this.ownerList.length; i++)
        {
            data.ownerList.push(this.school.getUser(ownerList[i]));
        }
        }
    }
    catch(e)
    {
        console.log("no");
    }
        return data;
    }

}
module.exports = Course;