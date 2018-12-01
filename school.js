class School
{
    constructor()
    {
        userList = [];
        courseList = [];
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

}
module.exports = School;