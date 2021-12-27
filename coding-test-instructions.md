# Inpel FE Coding Test

This purpose of this exercise is to give you a chance to demonstrate your front-end React skills. You 
will be given a few functional requirements for a student quiz interface and will be expected to implement
a user interface that meets the requirements and is free of bugs related to the business logic.

You have been given a few brand assets along with an exemplar stylesheet. Your implementation should be built in such a way that it is somewhat consistent with our company's established branding practices. Here, we're not expecting perfection, but the interface should look clean. A small amount of effort spent on layout and styling will go a long way
in giving us a positive impression.

## Functional Requirements
As part of setting up this test, we have written a small simulated API library. All the API methods are asynchronous to simulate a data access layer that is on a network, however, there is no back-end and all the data is stored internally in the class in arrays. We ask that you not alter the library in any way without consulting us and that you only access data through the public methods on the class. Please do not extend this class, or attempt to manually access or manipulate the data. If there is a bug in the library, please alert us and we will attempt to correct it.

We are looking for a single page application implementation. There should be three views:

1. A Quiz Listing that shows all the available quizzes and allows the user to select a quiz to take.
2. An Interactive Quiz view that allows the user to take one of the quizzes.
3. A Result view that shows the user their result.

Please note that you do not need to implement any sort of durable data persistance layer. The appliation state should reset with a page reload.


### Quiz Listing Requirments
The quiz listing should accomplish all of the following:
* Available quizzes should be contained with in an unordered list with no bullet points but with styling that delineates each quiz item.
* A quiz should be shown in the interface if, and only if, it has at least one question.
* A quiz should display a button that says "Take Quiz" if the quiz has not been taken, otherwise it should display the previous results as a fraction (num_correct questions / num_questions_in_quiz).
* Quiz titles should be contained in H2 tags.
* Clicking on the "Take Quiz" button should taks the user to the Interactive Quiz view for that quiz.

### Interactive Quiz Reqirements
This is the view where the user actually takes the quiz. The quizzes are short and there is no need to implement pagination. 

There are two types of questions. The first is a standard multiple choice question type with one correct answer. The second is a multiple answer question type where one or more answers can be marked as correct.

Your logic for both types should be generalized. Do not try to write logic that is specific to any particularl quiz in the sample data. Your solution should be extensible and able to handle new quizzes introduced into the quiz API data.

Both types require:
* A standard instruction or tooltip that explains to the user what they need to do.
* Should include validation that ensures an answer has been selected. Students should not be able to submit a quiz with unanswered questions.
* The answers should be displayed in a randomized order. All of available answers should be displayed with the question.
* You may safely assume that all questions have at least one answer.

Standard multiple choice questions:
* Should be implemented using radio buttons.
* Clicking on an answer should select the associated radio button.
* The selected answer should be visually distinct from the other answers.
* Only one answer can be selected at a time.
* No answer should be selected when the quiz first loads.

Multiple Answer questions:
* Should be implemented using checkboxes
* Clicking an answer should select the associated checkbox.
* A selected answer should be visually distinct from the non-selected answers.
* Multiple answers can be selected at the same time.
* No answers should be selected when the quiz first loads.

### Quiz Result Requirements
* The quiz results should be displayed prominently on their own in fraction format. (num_correct questions / num_questions_in_quiz)
* If the user gets all the questions correct, display the message "Good job!" somewhere in the view.
* Below the results, include button or link that takes the user back to the Quiz Listing view.


## Look and Feel
* The official font for Turion is Public Sans, which can be downloaded at: https://public-sans.digital.gov/
* Please use our color pallate. Reference the colors.png file in the design_help directory.
* A PNG of some sample components has been provided for inspiration. You needn't follow it exactly. It is pretty rough.
* Please do not link to any external assets. You may download and return and external components used inyour implementation.
* You may choose to use or not use any of the provided assets in your implementation, though the logo and .ico files are correct.


## Returning the Code Test
* Please return in a .zip or .tar.gz file.
* Include all assets needed to run the implementation
* Provide written instructions indicating how to execute your completed application. (Please don't make us guess.)
* Feel free to email david.cloutman@inpel.io with questions.


## Important Note
While you will probably want to install your own server and modules when you develop your own code, a static server implementation has been included so you can run tests on the quiz-api.js file which contains the simulated API. You can run 
the server with the command:

`node server.js`


This server does not execute any server-side JavaScript, other than what is in server.js or its dependencies.
