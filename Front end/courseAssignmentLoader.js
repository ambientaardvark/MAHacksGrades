// JavaScript Document

class AssLoader{
	
	constructor(){
		
	}
	
	
	
	getCourseAssignmentHtml(assignmentName, grade, possibleGrade, quarter, lastColor){
		$(".container").append("<div class='row course courseRow'></div>");
		var course = $(".course");
		$(".course").append("<div class='col-md-4 appendTarget courseText'></div>");
		$(".appendTarget").append(assignmentName);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-2 offcol appendTarget courseText'></div>");
		$(".appendTarget").append(grade);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-2 appendTarget courseText'></div>");
		$(".appendTarget").append(possibleGrade);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-2 offcol appendTarget courseText'></div>");
		$(".appendTarget").append(quarter);
		$(".appendTarget").removeClass("appendTarget");
		var color = lastColor + 1;
		if(color == 4){color = 1}
		if(color == 1){
			$(".course").addClass("course1");
			$(".offcol").addClass("dark-col-1")
		}
		if(color == 2){
			$(".course").addClass("course2");
			$(".offcol").addClass("dark-col-2")
		}
		if(color == 3){
			$(".course").addClass("course3");
			$(".offcol").addClass("dark-col-3")
		}
		$(".offcol").removeClass("offcol");
		$(".course").removeClass("course");
	}
}