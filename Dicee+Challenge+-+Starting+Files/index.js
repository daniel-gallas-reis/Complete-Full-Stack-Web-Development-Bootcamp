var dice1Number = 0;
var dice2Number = 0;

changeDices();

function changeDices(){
    //Set the number of each dice randomly
    dice1Number = Math.floor((Math.random()*6)+1);
    dice2Number = Math.floor((Math.random()*6)+1);
    
    if (dice1Number > dice2Number) {
        document.querySelector("h1").textContent = "🚩 Player 1 wins";
    }else if (dice2Number > dice1Number){
        document.querySelector("h1").textContent = "Player 2 wins 🚩";
    }else{
        document.querySelector("h1").textContent = "Draw";
    }
    
    switch (dice1Number) {
        case 1:
            document.querySelector(".img1").setAttribute("src", "images/dice1.png");
            break;
        
        case 2:
            document.querySelector(".img1").setAttribute("src", "images/dice2.png");
            break;

        case 3:
            document.querySelector(".img1").setAttribute("src", "images/dice3.png");
            break;

        case 4:
            document.querySelector(".img1").setAttribute("src", "images/dice4.png");
            break;

        case 5:
            document.querySelector(".img1").setAttribute("src", "images/dice5.png");
            break;
            
        case 6:
            document.querySelector(".img1").setAttribute("src", "images/dice6.png");
            break;    
    
        default:
            break;
    }
    switch (dice2Number) {
        case 1:
            document.querySelector(".img2").setAttribute("src", "images/dice1.png");
            break;
        
        case 2:
            document.querySelector(".img2").setAttribute("src", "images/dice2.png");
            break;

        case 3:
            document.querySelector(".img2").setAttribute("src", "images/dice3.png");
            break;

        case 4:
            document.querySelector(".img2").setAttribute("src", "images/dice4.png");
            break;

        case 5:
            document.querySelector(".img2").setAttribute("src", "images/dice5.png");
            break;
            
        case 6:
            document.querySelector(".img2").setAttribute("src", "images/dice6.png");
            break;    
    
        default:
            break;
    }

}