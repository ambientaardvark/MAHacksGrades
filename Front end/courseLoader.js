// JavaScript Document

class CourseLoader{
	
	constructor(){
		
	}
	
	
	
	getCourseHtml(courseName, q1, q2, q3, q4, final, lastColor){
		$(".container-fluid").append("<div class='row course'></div>");
		var course = $(".course");
		$(".course").append("<div class='col-md-4 appendTarget'></div>");
		$(".appendTarget").append(courseName);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-1 appendTarget offcol'></div>");
		$(".appendTarget").append(q1);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-1 appendTarget'></div>");
		$(".appendTarget").append(q2);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-1 appendTarget offcol'></div>");
		$(".appendTarget").append(q3);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-1 appendTarget'></div>");
		$(".appendTarget").append(q4);
		$(".appendTarget").removeClass("appendTarget");
		$(".course").append("<div class='col-md-1 appendTarget offcol'></div>");
		$(".appendTarget").append(final);
		$(".appendTarget").removeClass("appendTarget");
		var color = lastColor + 1;
		if(color == 4){color = 1}
		if(color == 1){
			$(".course").addClass("course2");
			$(".offcol").addClass("dark-col-2")
		}
		if(color == 2){
			$(".course").addClass("course2");
			$(".offcol").addClass("dark-col-2")
		}
		if(color == 3){
			$(".course").addClass("course3");
			$(".offcol").addClass("dark-col-3")
		}
	}
}