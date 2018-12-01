const Assignment = require("./assignment.js");
const User = require("./user.js");

class Course{

    constructor(name, ownerList){
        this.name = name;
        this.ownerList = ownerList;
        this.assignmentList = [];
        this.studentList = []
    }

    removeAssignment(assignment){
        let assignmentIndex = -1;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
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
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element == owner){
                ownerIndex = index;
            }
        }
        this.ownerList.splice(ownerIndex, 1);
    }

    removeStudent(student){
        let studentIndex = -1;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element == student){
                studentIndex = index;
            }
        }
        this.studentList.splice(studentIndex, 1);
    }

}

module.exports = Course;