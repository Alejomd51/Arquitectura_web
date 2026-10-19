const questions = [
    {
        question: "¿Qué describe mejor una arquitectura monolítica?",
        options: [
            "Una aplicación que se organiza y despliega como una sola unidad",
            "Un sistema compuesto exclusivamente por servicios en la nube",
            "Una aplicación sin módulos ni separación de responsabilidades",
            "Una base de datos que contiene todo el código del sistema"
        ],
        answer: 0,
        explanation: "Un monolito se entrega habitualmente como una unidad, aunque su código puede estar bien separado en módulos."
    },
    {
        question: "¿Qué ocurre normalmente cuando llega una solicitud a una aplicación monolítica?",
        options: [
            "Cada módulo se despliega en un servidor diferente antes de responder",
            "La aplicación recibe la solicitud, ejecuta la lógica necesaria y devuelve una respuesta",
            "La base de datos decide por sí sola cómo responder al usuario",
            "La solicitud debe salir a internet y volver desde otro servicio"
        ],
        answer: 1,
        explanation: "La aplicación procesa la petición y coordina la lógica y el acceso a datos necesarios para producir una respuesta."
    },
    {
        question: "¿Cuál es una característica habitual de una aplicación monolítica?",
        options: [
            "Cada módulo tiene un ciclo de despliegue obligatorio e independiente",
            "No puede organizarse en módulos",
            "Sus componentes forman parte de una aplicación integrada",
            "Todos sus módulos deben estar escritos en lenguajes distintos"
        ],
        answer: 2,
        explanation: "Los módulos integrados pertenecen a la misma aplicación y suelen compartir su proceso de construcción y despliegue."
    },
    {
        question: "¿Qué ventaja puede ofrecer un monolito en un proyecto pequeño?",
        options: [
            "Escalar cada componente por separado sin configuración adicional",
            "Eliminar la necesidad de pruebas",
            "Garantizar que nunca habrá fallos",
            "Facilitar el inicio y la depuración al tener una operación más sencilla"
        ],
        answer: 3,
        explanation: "Un sistema pequeño puede ser más fácil de construir, ejecutar y depurar al comenzar con una sola aplicación."
    },
    {
        question: "¿Qué desafío puede aparecer cuando un monolito crece mucho?",
        options: [
            "Puede aumentar el acoplamiento y la dificultad de mantenerlo",
            "Deja de poder almacenar datos",
            "Sus módulos se convierten automáticamente en microservicios",
            "Ya no es posible ejecutar pruebas"
        ],
        answer: 0,
        explanation: "Si los límites entre módulos no se mantienen, sus dependencias pueden crecer y complicar cambios y mantenimiento."
    },
    {
        question: "¿Cómo se publica habitualmente una aplicación monolítica?",
        options: [
            "Cada función se publica necesariamente como un servicio independiente",
            "Como una unidad que contiene los módulos de la aplicación",
            "Solo mediante una tienda de aplicaciones móviles",
            "No se despliega; únicamente se ejecuta en el equipo del desarrollador"
        ],
        answer: 1,
        explanation: "El despliegue suele realizarse para la aplicación completa como un único artefacto."
    },
    {
        question: "¿Qué limitación de escalabilidad puede tener un monolito?",
        options: [
            "No se puede aumentar la capacidad de sus servidores",
            "Solo puede ejecutarse una vez",
            "Puede ser necesario escalar la aplicación completa aunque una sola parte necesite más recursos",
            "Escalar siempre exige dividirlo en SOA"
        ],
        answer: 2,
        explanation: "Aunque se pueda escalar el sistema, normalmente no se escala cada módulo interno de manera independiente."
    },
    {
        question: "¿Qué significa que los módulos tengan alto acoplamiento?",
        options: [
            "Que se pueden reemplazar sin conocer sus dependencias",
            "Que todos ejecutan pruebas automáticamente",
            "Que cada módulo tiene un despliegue separado",
            "Que dependen mucho unos de otros, por lo que un cambio puede afectar a varias partes"
        ],
        answer: 3,
        explanation: "El alto acoplamiento hace más difícil modificar un módulo de forma aislada y aumenta el riesgo de efectos colaterales."
    },
    {
        question: "En la tienda virtual del ejemplo, ¿cómo se representan usuarios, productos, carrito y pagos en un monolito?",
        options: [
            "Como módulos que forman parte de una sola aplicación",
            "Como seis bases de datos públicas y desconectadas",
            "Como páginas sin lógica de negocio",
            "Como servicios que deben ejecutarse en empresas distintas"
        ],
        answer: 0,
        explanation: "Cada función puede organizarse en su propio módulo mientras permanece integrada en el mismo sistema desplegable."
    },
    {
        question: "¿Cuál es una diferencia común entre monolito y microservicios?",
        options: [
            "Los monolitos siempre son más rápidos",
            "Los microservicios permiten desplegar servicios de forma independiente, con mayor complejidad operativa",
            "Los microservicios no tienen módulos",
            "Un monolito no puede usar una red"
        ],
        answer: 1,
        explanation: "Los microservicios pueden desplegarse y escalarse por separado, pero requieren gestionar comunicación y operación distribuida."
    }
];

let currentQuestion = 0;
const selectedAnswers = Array(questions.length).fill(null);

const quizContent = document.querySelector("#quiz-content");
const quizResults = document.querySelector("#quiz-results");
const questionCounter = document.querySelector("#question-counter");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".quiz-progress");
const questionText = document.querySelector("#question-text");
const answerOptions = document.querySelector("#answer-options");
const quizMessage = document.querySelector("#quiz-message");
const previousButton = document.querySelector("#previous-question");
const nextButton = document.querySelector("#next-question");
const finishButton = document.querySelector("#finish-quiz");
const repeatButton = document.querySelector("#repeat-quiz");

function renderQuestion() {
    const item = questions[currentQuestion];
    const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

    questionCounter.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
    progressLabel.textContent = `${progress}% completado`;
    progressBar.style.width = `${progress}%`;
    progressTrack.setAttribute("aria-valuenow", String(progress));
    questionText.textContent = item.question;
    answerOptions.replaceChildren();
    quizMessage.replaceChildren();
    previousButton.disabled = currentQuestion === 0;
    nextButton.hidden = currentQuestion === questions.length - 1;
    finishButton.hidden = currentQuestion !== questions.length - 1;

    item.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "answer-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = String(index);
        input.checked = selectedAnswers[currentQuestion] === index;
        input.addEventListener("change", () => {
            selectedAnswers[currentQuestion] = index;
            quizMessage.replaceChildren();
        });
        const text = document.createElement("span");
        text.textContent = option;
        label.append(input, text);
        answerOptions.append(label);
    });
}

function showMissingAnswers() {
    const missing = selectedAnswers
        .map((answer, index) => answer === null ? index : -1)
        .filter(index => index !== -1);

    const message = document.createElement("p");
    message.className = "mb-1";
    message.textContent = `Responde todas las preguntas antes de finalizar. Faltan ${missing.length}:`;
    const list = document.createElement("div");
    list.className = "missing-list";

    missing.forEach(index => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn missing-question";
        button.textContent = `Pregunta ${index + 1}`;
        button.addEventListener("click", () => {
            currentQuestion = index;
            renderQuestion();
            questionText.focus?.();
        });
        list.append(button);
    });

    quizMessage.replaceChildren(message, list);
    quizMessage.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function getResultLabel(score) {
    if (score >= 9) return "Dominio excelente";
    if (score >= 7) return "Buen dominio";
    if (score >= 5) return "Conocimiento básico";
    return "Se recomienda repasar el contenido";
}

function finishQuiz() {
    if (selectedAnswers.some(answer => answer === null)) {
        showMissingAnswers();
        return;
    }

    const score = questions.reduce((total, item, index) => (
        total + (selectedAnswers[index] === item.answer ? 1 : 0)
    ), 0);
    const percentage = Math.round((score / questions.length) * 100);

    const summary = document.createElement("div");
    summary.className = "result-summary";
    const scoreText = document.createElement("span");
    scoreText.className = "score";
    scoreText.textContent = `${score} / ${questions.length}`;
    const resultText = document.createElement("strong");
    resultText.textContent = getResultLabel(score);
    const percentageText = document.createElement("p");
    percentageText.textContent = `${percentage}% de aciertos`;
    summary.append(scoreText, resultText, percentageText);

    const heading = document.createElement("h3");
    heading.className = "h5 mt-4";
    heading.textContent = "Revisión de tus respuestas";
    const reviewList = document.createElement("ol");
    reviewList.className = "review-list";

    questions.forEach((item, index) => {
        const isCorrect = selectedAnswers[index] === item.answer;
        const review = document.createElement("li");
        review.className = `review-item${isCorrect ? " correct" : ""}`;
        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${item.question}`;
        const userAnswer = document.createElement("p");
        userAnswer.textContent = `Tu respuesta: ${item.options[selectedAnswers[index]]}`;
        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = `Respuesta correcta: ${item.options[item.answer]}`;
        const explanation = document.createElement("p");
        explanation.textContent = item.explanation;
        review.append(title, userAnswer, correctAnswer, explanation);
        reviewList.append(review);
    });

    const actions = document.createElement("div");
    actions.className = "result-actions";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "btn btn-primary";
    retry.innerHTML = '<i class="bi bi-arrow-repeat me-2" aria-hidden="true"></i>Intentar nuevamente';
    retry.addEventListener("click", resetQuiz);
    const backToContent = document.createElement("a");
    backToContent.className = "btn btn-outline-primary";
    backToContent.href = "#concepto";
    backToContent.textContent = "Repasar el contenido";
    actions.append(retry, backToContent);

    quizResults.replaceChildren(summary, heading, reviewList, actions);
    quizContent.hidden = true;
    quizResults.hidden = false;
    quizResults.focus?.();
}

function resetQuiz() {
    currentQuestion = 0;
    selectedAnswers.fill(null);
    quizResults.replaceChildren();
    quizResults.hidden = true;
    quizContent.hidden = false;
    renderQuestion();
    document.querySelector("#evaluacion").scrollIntoView({ behavior: "smooth" });
}

previousButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion -= 1;
        renderQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        renderQuestion();
    }
});

finishButton.addEventListener("click", finishQuiz);
repeatButton.addEventListener("click", resetQuiz);

document.querySelectorAll("#mainNavigation a").forEach(link => {
    link.addEventListener("click", () => {
        const navigation = document.querySelector("#mainNavigation");
        if (navigation.classList.contains("show") && window.bootstrap) {
            window.bootstrap.Collapse.getOrCreateInstance(navigation).hide();
        }
    });
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderQuestion();
