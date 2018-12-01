class User
{
    constructor(firstName, lastName, userName, password, id)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.id = id;
        courseList = [];
    }

    dropCourse(id){
        let courseIndex = -1;
        for (let index = 0; index < this.courseList.length; index++) {
            const element = this.courseList[index];
            if(element.id == id){
                courseIndex = index;
            }
        }
        if(courseIndex>-1){
            this.courseList.splice(courseIndex, 1);
        }
    }
    


}
module.exports = User;