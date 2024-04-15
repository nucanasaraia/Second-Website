document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLinks = document.querySelector('.menu-links');

    hamburgerMenu.addEventListener('click', function() {
        menuLinks.classList.toggle('active');
    });
});




const carousel = document.querySelector('.caro');
const carouselContent = document.querySelector('.caroLitt');
const carouselItems = document.querySelectorAll('.caroItem');

let currentIndex = 0;

function moveCarousel(index) {
  currentIndex = index;
  const offset = -currentIndex * carousel.offsetWidth;
  carouselContent.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  if (currentIndex < carouselItems.length - 1) {
    moveCarousel(currentIndex + 1);
  } else {
    moveCarousel(0);
  }
}

setInterval(nextSlide, 3000);

const questions = [
    {
      question: "1. What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      correctAnswerIndex: 1
    },
    {
      question: "2. Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      correctAnswerIndex: 1
    },
    {
      question: "3. Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picaso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswerIndex: 2
    },
    {
        question: "4. What is the chemical symbol for water?",
        options: ["Wa", "Hy", "H2O", "Hw"],
        correctAnswerIndex: 2
      },
      {
        question: "4. What is the value of π (pi) rounded to two decimal places?",
        options: ["3.12", "3.18", "3.16", " 3.14"],
        correctAnswerIndex: 3
      }
  ];

  let currentQuestionIndex = 0;

  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = ""; 

    questions[currentQuestionIndex].options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.textContent = option;
      optionElement.classList.add("option");
      optionElement.setAttribute("data-index", index);
      optionElement.onclick = selectOption;
      optionsElement.appendChild(optionElement);
    });
  }

  function selectOption(event) {
    const selectedIndex = parseInt(event.target.getAttribute("data-index"));
    const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;

    if (selectedIndex === correctAnswerIndex) {
      event.target.classList.add("correct");
    } else {
      event.target.classList.add("incorrect");
      document.querySelector(`.option[data-index="${correctAnswerIndex}"]`).classList.add("correct");
    }

  
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
      option.onclick = null;
    });
  }

  function checkAnswer() {
    const options = document.querySelectorAll(".option");
    let answered = false;

    options.forEach(option => {
      if (option.classList.contains("correct")) {
        answered = true;
        return;
      }
    });

    if (answered) {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        alert("You Did It Successfully");
        window.location.href = "index.html"; 
      }
    } else {
      alert("Please select an option!");
    }
  }

  displayQuestion();


  