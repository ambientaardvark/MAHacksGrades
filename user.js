class User
{
    constructor(firstName, lastName, userName, password, id, school)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.id = id;
        this.courseList = []; //LIST OF IDS
        this.permissionLevel = 0;
        this.school = school;
        this.schoolName = "";
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
    
    hasCourse(id)
    {
        for(var i = 0; i < this.courseList.length; i++)
        {
            if(this.courseList[i] == id)
            {
                return true;
            }
        }
        return false;
    }
    getData()
    {
        var data = {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            id: this.id,
            courseList: [],
            permissionLevel: this.permissionLevel
        };
        for(var i = 0; i < this.courseList.length; i++)
        {
            data.courseList.push(this.school.getCourse(this.courseList[i]).getData());
        }
        return data;
    }

}
module.exports = User;