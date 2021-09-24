document.getElementById("win").style.display = "none";
document.getElementById("restartBtnContainer").style.display = "none";

function firstLet() {
    return Math.floor(Math.random() * 26);
}

function secondLet() {
    let first = firstLet(), second;
    do {
    second = Math.floor(Math.random() * 26);
    } while (second === first);
    return second;
}

let first, second;

function chooseLet() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (Math.random() < 0.5) {
        return characters.charAt(first);
    }
    return characters.charAt(second);
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
    return numStr;
}

function GetInput() {
    let sum = Total_amount();
    let check = document.getElementById("input").value;
    if (check === "") {
        return 0;
    }
    check = filterInt(check);
    if (check <= 0 || isNaN(check)) {
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

function filterInt(check) {
    if (/^[-+]?(\d+|Infinity)$/.test(check)) {
      return Number(check)
    } else {
      return NaN
    }
}

function MakeBet() {
    let sum = Total_amount();
    first = firstLet(), second = secondLet();
    let input = parseInt(GetInput());
    if (GetInput() > 0) {
        for (let i = 1; i <= 3; ++i) {
            document.getElementById(i.toString()).innerHTML = "";
        }
        for (let i = 1; i <= 3; ++i) {
            Play(i); 
        }
        setTimeout (function (){ 
             if (document.getElementById("1").innerHTML === document.getElementById("2").innerHTML &&
             document.getElementById("2").innerHTML === document.getElementById("3").innerHTML) {
                sum += input * 2;
                document.getElementById("win").style.display = "block";
            }
            else {
                sum -= input;
                document.getElementById("win").style.display = "none";
            }
            document.getElementById("amount").innerHTML = "You have: " + sum.toString() + "$";
            if (sum === 0) {
                EndGame();
            }
        }, 1510);
    }
    return sum;
}

function container_function() {
    GetInput();
    MakeBet();
}

function Play(i) {
        let k = i;
        let symbol = chooseLet();
        document.getElementById("play-btn").disabled = true;
        document.getElementById("crt-msg").style.visibility = "hidden";
        setTimeout(function() {
            document.getElementById(k.toString(10)).classList.add("spin");
            setTimeout(function() {
                document.getElementById(k.toString(10)).innerHTML = symbol;
            }, 500);
        }, (i - 1)* 500);
        document.getElementById(k.toString(10)).classList.remove("spin");
        setTimeout(function() {
            document.getElementById("play-btn").disabled = false;
            document.getElementById("crt-msg").style.visibility = "visible";
        }, 1501);
}

function EndGame() {
   document.getElementById("Btn-container").innerHTML = "<p id = 'game-over'>Game over</p>";
   document.getElementById("crt-msg").style.display = "none";
   document.getElementById("restartBtnContainer").style.display = "flex";
}