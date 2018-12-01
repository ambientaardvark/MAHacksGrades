class Assignment
{
    constructor(name, maxGrade)
    {
        this.name = name;
        this.maxGrade = maxGrade;
        this.userGradePairs = [];
    }
    getData(id)
    {
        var data = {
            name: this.name,
            maxGrade: this.maxGrade,
            grade: -1
        };
        for(var i = 0; i < this.userGradePairs.length; i++)
        {
            var pair = this.userGradePairs[i];
            if(pair.id == id)
            {
                data.grade = pair;
            }
        }
        return data;
    }
    setGrade(userid, grade)
    {
        for(var i = 0; i < this.userGradePairs.length; i++)
        {
            var pair = this.userGradePairs[i];
            if(pair.id == userid)
            {
                //we found an existing grade. update it
                pair.grade = grade;
                return;
            }
        }
        this.userGradePairs.push({
            id: userid,
            grade: grade
        });
    }
    
}
module.exports = Assignment;