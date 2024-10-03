
document.addEventListener('DOMContentLoaded', () => {
    //! Retrieve data from localStorage
    const oneuser = JSON.parse(localStorage.getItem('oneuser'));
    
    if (!oneuser) {
        alert('No quiz data found. Please complete the quiz.');
        window.location.href = './QuizLogin.html';
        return;
    }

    //! Retrieve user's name and quiz data
    const userName = `${oneuser.first} ${oneuser.last}`;
    const quizData = oneuser.quiz || [];
    const totalQuestions = quizData.length;
    let correctAnswers = 0;

    //! Calculate the score
    quizData.forEach(question => {
        if (question.userAnswer === question.correctAnswer) {
            correctAnswers++;
        }
    });

    //! Update the DOM
    document.getElementById('user-name').textContent = `Congratulations, ${userName}!`;
    document.getElementById('user-score').textContent = `${correctAnswers} out of ${totalQuestions}`;
});
