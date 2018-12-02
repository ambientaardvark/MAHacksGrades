const User = require("./user.js");
class School
{
    constructor(name, location, principal, principalEmail, supportEmail)
    {
        this.name = name;
        this.location = location;
        this.principal = principal;
        this.principalEmail = principalEmail;
        this.supportEmail = supportEmail;
        this.userList = [];
        this.courseList = [];
    }

    removeUser(user){
        let userIndex = -1;
        for (let index = 0; index < userList.length; index++) {
            const element = userList[index];
            if(element == user){
                userIndex = index;
            }
        }
        if(userIndex > -1){
            this.userList.splice(userIndex, 1);
        }
    }

    removeCourse(id){
        let courseIndex = -1;
        for (let index = 0; index < this.courseList.length; index++) {
            const element = this.courseList[index];
            if(element.id == id){
                courseIndex = index;
            }
        }
        if(courseIndex>-1){
            for (let index = 0; index < this.userList.length; index++) {
                const element = this.userList[index];
                element.removeCourse(id);
            }
            this.courseList.splice(courseIndex, 1);
        }
    }
    createUser(username, password, firstname, lastname)
    {
        var id = this.getNewUserId();
        let user = new User(firstname, lastname, username, password, id, this);
        this.userList.push(user);
        return user;
    }

    getNewUserId()
    {
        return Math.floor(Math.random() * 1000000);
    }
    getUser(id)
    {
        for(var i = 0; i < this.userList.length; i++)
        {
            var user = this.userList[i];
            if(user.id == id)
            {
                return user;
            }
        }
        return null;
    }
    getCourse(id)
    {
        for(var i = 0; i < this.courseList.length; i++)
        {
            var course = this.courseList[i];
            if(course.id == id)
            {
                return course;
            }
        }
        return null;
    }
    getData(user)
    {
        var data = {
            name: this.name,
            location: this.location,
            principal: this.principal,
            principalEmail: this.principalEmail,
            supportEmail: this.supportEmail,
            courseList: [],
            userList: []
        };
        for(var i = 0; i < this.courseList.length; i++)
        {
            data.courseList.push(this.courseList[i].getData(user));
        }
        if(user.permissionLevel > 0)
        {
            for(var i = 0; i < this.userList.length; i++)
            {
                data.userList.push(this.userList[i].getData());
            }
        }
        return data;
    }
}
module.exports = School;