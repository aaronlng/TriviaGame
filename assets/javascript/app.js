var triviaQuestions = [{
	question: "In the first ever episode, Michael plays a prank on one of his staff when he pretends to fire them. Who is this?",
	answerList: ["Meredith", "Stanley", "Pam", "Creed"],
	answer: 2
},{
	question: "What is the receptionist, Pam's, last name?",
	answerList: ["Halpert", "Beesly", "Bratton", "Hudson"],
	answer: 1
},{
	question: "In the episode 'Diversity Day', what was the man's name that came in to talk to Michael about racial discrimination?",
	answerList: ["Mr. Brown", "Mr. Green", "Toby Flenderson", "Jan"],
	answer: 0
},{
	question: "Where did Michael want to take Carol for the holidays?",
	answerList: ["Mexico City, Mexico", "Los Angeles, CA", "Sandals, Jamaica", "New York, NY"],
	answer: 2
},{
	question: "What nickname did Andy give Jim on his first day at the Stamford branch?",
	answerList: ["Guy", "Jimbo", "Lanky", "Big Tuna"],
	answer: 3
},{
	question: "In Season 4, what country is Toby moving to?",
	answerList: ["Spain", "France", "Costa Rica", "Brazil"],
	answer: 2
},{
	question: "In Season 2, Michael injures his foot in what bizarre manner?",
	answerList: ["Stubbing his toe", "Stepping on a George Foreman grill", "Shutting it in his car door", "Getting it stepped on"],
	answer: 1
},{
	question: "Where did Michael and Jan share their first kiss?",
	answerList: ["Michael's place", "The Office", "Outside of Chili's", "Cooper's Seafood"],
	answer: 2
},{
	question: "Where does Michael take everyone for an outing on his birthday?",
	answerList: ["The Mall", "Cooper's Seafood", "Ice Skating", "The Movies"],
	answer: 2
},{
	question: "In Season 5, who starts a fake fire to prove a point to the office staff?",
	answerList: ["Michael", "Ryan", "Creed", "Dwight"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}