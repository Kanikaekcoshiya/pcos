/* ======================
   STEP LOGIC
======================= */

let currentStep = 1;
const totalSteps = 5;

const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function showStep(step) {
    steps.forEach(s => s.classList.remove("active"));
    document.getElementById(`step${step}`).classList.add("active");

    progressBar.style.width = ((step - 1) / (totalSteps - 1)) * 100 + "%";
    progressText.innerText = `Step ${step} of ${totalSteps}`;
}

document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep < totalSteps) currentStep++;
        showStep(currentStep);
    });
});

document.querySelectorAll(".prev-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep > 1) currentStep--;
        showStep(currentStep);
    });
});

showStep(1);


/* ======================
   BMI CALCULATION
======================= */

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiValue = document.getElementById("bmiValue");

function calculateBMI() {
    let w = parseFloat(weightInput.value);
    let h = parseFloat(heightInput.value) / 100;

    if (w > 0 && h > 0) {
        let bmi = (w / (h * h)).toFixed(1);
        bmiValue.textContent = bmi;
    }
}

weightInput.addEventListener("input", calculateBMI);
heightInput.addEventListener("input", calculateBMI);


/* ======================
   MENSTRUAL EXTRA FIELDS
======================= */

const extraFields = document.getElementById("extraFields");

document.querySelectorAll("input[name='cycle']").forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "Irregular") {
            extraFields.classList.remove("hidden");
        } else {
            extraFields.classList.add("hidden");
        }
    });
});


/* ======================
   FILE UPLOAD PREVIEW
======================= */

const uploadBox = document.getElementById("uploadBox");
const uploadInput = document.getElementById("uploadInput");
const previewImg = document.getElementById("previewImg");

uploadBox.addEventListener("click", () => uploadInput.click());

uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (file) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.classList.remove("hidden");
    }
});


/* ======================
   SUBMIT BUTTON
======================= */

document.querySelector(".submit-btn").addEventListener("click", () => {
    alert("Assessment submitted successfully! (UI Demo)");
});
