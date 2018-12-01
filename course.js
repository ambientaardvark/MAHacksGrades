const Assignment = require("./assignment.js");
const User = require("./user.js");

class Course{

    constructor(name, ownerList, id){
        this.name = name;
        this.ownerList = ownerList;
        this.assignmentList = [];
        this.studentList = []
        this.id = id;
    }
    
    addAssignment(assignment){
        this.assignmentList.push(assignment);
    }

    addOwner(owner){
        this.ownerList.push(owner);
    }

    addStudent(student){
        this.studentList.push(student);
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
        if(this.ownerList.length = 1){
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

}

module.exports = Course;