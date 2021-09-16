document.getElementById("win").style.display = "none";
function chooseLet() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = characters.charAt(Math.floor(Math.random() * 2));
    return result;
}

// Click on Enter key
document.getElementById("input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.getElementById("play-btn").click();
    }
});

function Total_amount() {
    let amount_msg = document.getElementById("amount").innerHTML;
    let numStr = parseInt(amount_msg.replace(/[^0-9]/g,''));
    console.log("initial sum " + numStr);
    return numStr;
}

function GetInput() {
    let sum = Total_amount();
    let check = document.getElementById("input").value;
    if (check === "") {
        return 0;
    }
    check = parseInt(document.getElementById("input").value);
    if (check === 0 || isNaN(check)) {
        document.getElementById("input").value = "";
        document.getElementById("input").placeholder = "Input error!";
        document.getElementById("error").innerHTML = "Input error! Please enter a natural number";
        document.getElementById("error").style.display = "block";
        document.getElementById("error").style.color = "red";
    }
    else if (check > sum) {
        document.getElementById("input").value = "";
        document.getElementById("input").placeholder = "Non-Sufficient Funds";
        document.getElementById("error").innerHTML = "Non-Sufficient Funds";
        document.getElementById("error").style.display = "block";
        document.getElementById("error").style.color = "red";
    }
    else {
        document.getElementById("error").style.display = "none";
    }
    return check;
}

function MakeBet() {
    let sum = Total_amount();
    console.log("inside f " + sum);
    let input = parseInt(GetInput());
    if (GetInput() > 0) {
        Play();
        if (document.getElementById("1").innerHTML === document.getElementById("2").innerHTML &&
        document.getElementById("2").innerHTML === document.getElementById("3").innerHTML) {
            sum += input * 2;
            document.getElementById("win").style.display = "block";
        }
        else {
            sum -= input;
            document.getElementById("win").style.display = "none";
        }
    }
    document.getElementById("amount").innerHTML = "You have: " + sum.toString() + "$";
    if (sum === 0) {
        EndGame();
    }
    console.log("crt sum after bet = " + sum);
    return sum;
}

function func() {
    GetInput();
    MakeBet();
}

function Play() {
    for (let i = 1; i <= 3; ++i) {
        let symbol = chooseLet();
        console.log(symbol);
        document.getElementById(i.toString(10)).innerHTML = symbol;
    }
}

function EndGame() {
   console.log("Game Over");
   document.getElementById("Btn-container").innerHTML = "<p id = 'game-over'>Game over</p>";
   document.getElementById("crt-msg").style.display = "none";
}