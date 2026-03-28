let chart;

// ✅ CALCULATE (Backend connect)
async function calculate() {

    let income = Number(document.getElementById("income").value);
    let expenses = Number(document.getElementById("expenses").value);

    if (!income || !expenses) {
        alert("Enter values!");
        return;
    }

    try {
        let response = await fetch("/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ income, expenses })
        });

        let data = await response.json();

        document.getElementById("savings").innerText = "₹" + data.savings;
        document.getElementById("sip").innerText = "₹" + data.sip;
        document.getElementById("emergency").innerText = "₹" + data.emergency;

        let percent = (data.savings / income) * 100;
        document.getElementById("bar").style.width = percent + "%";

        let advice = "";
        if (data.savings <= 0) {
            advice = "⚠️ Reduce expenses!";
        } else if (data.savings < 5000) {
            advice = "👍 Good, increase savings.";
        } else {
            advice = "🔥 Excellent! You're on track!";
        }

        document.getElementById("advice").innerText = advice;

        drawChart(data.savings);

    } catch (error) {
        console.error(error);
        alert("Backend error!");
    }
}

// ✅ CHART (FIXED)
function drawChart(savings) {

    document.getElementById("chart").style.display = "block";
    document.getElementById("chartTitle").style.display = "block";

    let data = [];

    for (let i = 1; i <= 12; i++) {
        data.push(savings * i);
    }

    let canvas = document.getElementById("chart");

    if (!canvas) return; // safety

    let ctx = canvas.getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["1M","2M","3M","4M","5M","6M","7M","8M","9M","10M","11M","12M"],
            datasets: [{
                label: "Savings Growth",
                data: data,
                borderWidth: 2
            }]
        }
    });
}

// ✅ GOAL
function calculateGoal() {
    let goal = Number(document.getElementById("goalAmount").value);
    let years = Number(document.getElementById("years").value);

    if (!goal || !years) {
        alert("Enter goal details!");
        return;
    }

    let monthly = Math.round(goal / (years * 12));

    document.getElementById("goalResult").innerText =
        "💡 Invest ₹" + monthly + "/month";
}

// ✅ AI (SMART VERSION)
function askAI() {

    let income = Number(document.getElementById("income").value);
    let expenses = Number(document.getElementById("expenses").value);
    let q = document.getElementById("question").value.toLowerCase();

    let savings = income - expenses;
    let res = "";

    if (q.includes("save")) {
        if (savings < 0) {
            res = "❌ You're overspending. Cut expenses immediately.";
        } else {
            res = "💰 You can save ₹" + savings + ". Try investing 30% in SIP.";
        }
    } 
    else if (q.includes("invest")) {
        res = "📈 Based on your income, start SIP of ₹" + Math.round(savings * 0.3);
    } 
    else if (q.includes("debt")) {
        res = "⚠️ Pay high-interest debt first before investing.";
    } 
    else {
        res = "🤖 Ask about savings, investing, or debt.";
    }

    document.getElementById("chat").innerText = res;
}

// ✅ MONEY HEALTH SCORE (YOUR CODE – WORKING)
function calculateScore() {

    let income = Number(document.getElementById("income").value);
    let expenses = Number(document.getElementById("expenses").value);
    let age = Number(document.getElementById("age").value);
    let debt = Number(document.getElementById("debt").value);
    let investments = Number(document.getElementById("investments").value);

    if (!income || !expenses || !age) {
        alert("Fill basic details!");
        return;
    }

    let score = 0;

    let savings = income - expenses;
    if (savings > 0) score += 30;
    else score += 5;

    let emergency = expenses * 6;
    if (investments >= emergency) score += 20;
    else score += 10;

    if (debt === 0) score += 20;
    else if (debt < income * 3) score += 10;
    else score += 5;

    if (investments > income * 6) score += 20;
    else score += 10;

    if (age < 30) score += 10;
    else score += 5;

    document.getElementById("score").innerText = "Score: " + score + "/100";

    let advice = "";

    if (score < 40) {
        advice = "⚠️ Poor financial health. Focus on saving & reduce debt.";
    } else if (score < 70) {
        advice = "👍 Average. Improve investments & emergency fund.";
    } else {
        advice = "🔥 Excellent! You are financially strong.";
    }

    document.getElementById("scoreAdvice").innerText = advice;
}