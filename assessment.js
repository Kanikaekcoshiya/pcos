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
   INPUT REFERENCES
======================= */

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiValue = document.getElementById("bmiValue");

const fshInput = document.getElementById("FSH");
const lhInput = document.getElementById("LH");
const ratioInput = document.getElementById("FSHLH");

const follicleL = document.getElementById("Follicle_No_L");
const follicleR = document.getElementById("Follicle_No_R");
const follicleTotal = document.getElementById("follicleTotal");

const WHRvalue = document.getElementById("WHRvalue");
const waist = document.getElementById("waist");
const hip = document.getElementById("hip");


/* ======================
   NUMERIC VALIDATION
======================= */
function allowOnlyNumbers(input) {
    input?.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9.]/g, "");
    });
}

allowOnlyNumbers(weightInput);
allowOnlyNumbers(heightInput);
allowOnlyNumbers(fshInput);
allowOnlyNumbers(lhInput);
allowOnlyNumbers(follicleL);
allowOnlyNumbers(follicleR);


/* ======================
   AUTO CALC BMI
======================= */
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
   AUTO CALC FSH / LH RATIO
======================= */
function calculateRatio() {
    let fsh = parseFloat(fshInput.value);
    let lh = parseFloat(lhInput.value);

    if (fsh > 0 && lh > 0) {
        ratioInput.value = (fsh / lh).toFixed(2);
    }
}

fshInput.addEventListener("input", calculateRatio);
lhInput.addEventListener("input", calculateRatio);


/* ======================
   AUTO CALC FOLLICLE COUNT
======================= */
function calculateFollicle() {
    let L = parseInt(follicleL.value) || 0;
    let R = parseInt(follicleR.value) || 0;
    follicleTotal.textContent = L + R;
}

follicleL.addEventListener("input", calculateFollicle);
follicleR.addEventListener("input", calculateFollicle);


/* ======================
   EXTRA FIELD DISPLAY
======================= */
document.querySelectorAll("input[name='cycle']").forEach(radio => {
    radio.addEventListener("change", () => {
        extraFields.classList.toggle("hidden", radio.value !== "Irregular");
    });
});


/* ======================
   SUBMIT + SAVE DATA
======================= */
document.querySelector(".submit-btn").addEventListener("click", () => {

    const hairLossText = document.getElementById("hairLossInput").value.trim().toLowerCase();
    const fastFoodText = document.getElementById("fastFoodInput").value.trim().toLowerCase();

    if (hairLossText !== "yes" && hairLossText !== "no") {
        alert("Please enter Yes or No for Hair Loss");
        return;
    }
    if (fastFoodText !== "yes" && fastFoodText !== "no") {
        alert("Please enter Yes or No for Fast Food Consumption");
        return;
    }

    const hairLossValue = (hairLossText === "yes") ? 1 : 0;
    const fastFoodValue = (fastFoodText === "yes") ? 1 : 0;

    const data = {
        age: age.value,
        weight: weight.value,
        height: height.value,
        BMI: bmiValue.textContent,

        AMH: AMH.value,
        FSH: FSH.value,
        LH: LH.value,
        FSH_LH_ratio: ratioInput.value,
        TSH: TSH.value,
        PRL: PRL.value,
        VitD3: VitD3.value,
        RBS: RBS.value,

        cycle: document.querySelector("input[name='cycle']:checked")?.value,
        cycle_length: cycle_length.value,
        follicle_left: follicleL.value,
        follicle_right: follicleR.value,
        follicle_total: follicleTotal.textContent,

        AvgFsizeL: AvgFsizeL.value,
        AvgFsizeR: AvgFsizeR.value,

        hair_growth: hair_growth.checked ? 1 : 0,
        skin_dark: skin_dark.checked ? 1 : 0,
        pimples: pimples.checked ? 1 : 0,
        exercise: exercise.checked ? 1 : 0,

        hair_loss: hairLossValue,
        fast_food: fastFoodValue
    };

    console.log("Submitting:", data);

    localStorage.setItem("pcosData", JSON.stringify(data));
    window.location.href = "result.html";
});
