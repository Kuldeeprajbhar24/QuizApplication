let quesCont = document.querySelector("#que");
let optionCont = document.querySelector("#opt");
let btnCont = document.querySelector("#btn");
let prevBtn = document.querySelector("#prev-btn");
let nextBtn = document.querySelector("#next-btn");
let submitBtn = document.querySelector("#submit-btn");

let visited = document.querySelector("#visited");
let notVisited = document.querySelector("#not-visited");
let answered = document.querySelector("#answered");
let notAnswered = document.querySelector("#not-answered");

//! Local Storage:
let data = JSON.parse(localStorage.getItem("data"));
let oneuser = JSON.parse(localStorage.getItem("oneuser"));

function local() {
    if (oneuser) {
        if (!oneuser.quiz) {
            Main();
        } else {
            alert("Test already completed.");
            window.location.href = "./QuizResult.html";  // Fixed the redirection
        }
    } else {
        alert("Please Login First..");
        window.location.href = "./QuizLogin.html";
    }
}

local();

console.log(visited, notAnswered, notVisited, answered);

async function Main() {
    try {
        let dataFromJson = await fetch("./Question.json");
        let storage = await dataFromJson.json();
        console.log(storage);

        let index = 0;

        //! Function to create buttons for each question ID
        function btnCreate() {
            storage.forEach((e) => {
                let btn = document.createElement("button");
                btn.id = e.id;
                btn.innerHTML = e.id;
                btnCont.append(btn);
            });
        }
        btnCreate();

        let allBtn = btnCont.querySelectorAll("button");

        function displayQuesAndOps() {
            quesCont.innerHTML = storage[index].question;
            optionCont.innerHTML = "";

            storage[index].visited = true;

            storage[index].option.forEach((option) => {
                let opt = document.createElement("input");
                let label = document.createElement("label");

                opt.type = "radio";
                opt.name = "option";
                opt.value = option;

                label.innerHTML = option;
                if (opt.value == storage[index].userAnswer) {
                    opt.checked = true;
                }

                optionCont.append(opt);
                optionCont.append(label);
                optionCont.append(document.createElement("br"));
            });
            legends();
        }

        displayQuesAndOps();

        nextBtn.addEventListener("click", () => {
            SaveAnswer();
            index = (index + 1) % storage.length;
            displayQuesAndOps();
        });

        prevBtn.addEventListener("click", () => {
            SaveAnswer();
            index = (index - 1 + storage.length) % storage.length;
            displayQuesAndOps();
        });

        allBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                SaveAnswer();
                index = btn.id - 1;
                displayQuesAndOps();
            });
        });

        function SaveAnswer() {
            let options = optionCont.querySelectorAll("input");

            options.forEach((opt) => {
                if (opt.checked) {
                    storage[index].userAnswer = opt.value;
                    allBtn.forEach((e) => {
                        if (index == e.id - 1) {
                            e.style.background = "green";
                        }
                    });
                }
            });
            console.log(storage[index]);
        }

        function legends() {
            let visitedCount = 0;
            let notVisitedCount = storage.length;
            let answeredCount = 0;
            let notAnsweredCount = storage.length;

            storage.forEach((e) => {
                if (e.visited) {
                    visitedCount++;
                    notVisitedCount--;
                }
                if (e.userAnswer) {
                    answeredCount++;
                    notAnsweredCount--;
                }
            });
            visited.innerHTML = visitedCount;
            notVisited.innerHTML = notVisitedCount;
            answered.innerHTML = answeredCount;
            notAnswered.innerHTML = notAnsweredCount;
        }

        function timer() {
            let time = 2 * 60 * 60;
            let hr = document.querySelector("#hr");
            let min = document.querySelector("#min");
            let sec = document.querySelector("#sec");

            let interval = setInterval(() => {
                time--;
                hr.innerHTML = `${Math.floor(time / 3600)}: `;
                min.innerHTML = `${Math.floor((time % 3600) / 60)}: `;
                sec.innerHTML = `${Math.floor((time % 3600)) % 60}`;
                if (time === 0) {
                    clearInterval(interval);
                    oneuser.quiz = storage;
                    localStorage.setItem("oneuser", JSON.stringify(oneuser));
                    window.location.href = "./QuizResult.html";  // Fixed redirection
                }
            }, 1000);
        }
        timer();

        //! Submit button functionality
        submitBtn.addEventListener("click", () => {
            let confirmation = confirm("Are you sure you want to submit the test?");
            if (confirmation) {
                oneuser.quiz = storage;
                localStorage.setItem("oneuser", JSON.stringify(oneuser));
                window.location.href = "./QuizResult.html";  // Fixed redirection
            }
        });
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}
