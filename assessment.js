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
   BMI
======================= */
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiValue = document.getElementById("bmiValue");

function calculateBMI() {
    let w = parseFloat(weightInput.value);
    let h = parseFloat(heightInput.value) / 100;

    if (w > 0 && h > 0) {
        bmiValue.textContent = (w / (h * h)).toFixed(1);
    }
}

weightInput.addEventListener("input", calculateBMI);
heightInput.addEventListener("input", calculateBMI);


/* ======================
   CYCLE EXTRA FIELD
======================= */
const extraFields = document.getElementById("extraFields");

document.querySelectorAll("input[name='cycle']").forEach(radio => {
    radio.addEventListener("change", () => {
        extraFields.classList.toggle("hidden", radio.value !== "Irregular");
    });
});


/* ======================
   FILE PREVIEW
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
   SUBMIT
======================= */

document.querySelector(".submit-btn").addEventListener("click", () => {
    
    const data = {
        age: age.value,
        weight: weight.value,
        height: height.value,
        BMI: bmiValue.textContent,

        AMH: AMH.value,
        FSH: FSH.value,
        LH: LH.value,
        ratio: FSHLH.value,
        TSH: TSH.value,
        PRL: PRL.value,
        VitD3: VitD3.value,
        RBS: RBS.value,

        cycle: document.querySelector("input[name='cycle']:checked")?.value,
        cycle_length: cycle_length.value,
        Follicle_Left: Follicle_No_L.value,
        Follicle_Right: Follicle_No_R.value,
        size_Left: AvgFsizeL.value,
        size_Right: AvgFsizeR.value,

        hair_growth: hair_growth.checked,
        skin_dark: skin_dark.checked,
        hair_loss: hair_loss.checked,
        pimples: pimples.checked,
        fast_food: fast_food.checked,
        exercise: exercise.checked
    };

    localStorage.setItem("pcosData", JSON.stringify(data));
    window.location.href = "result.html";
});
