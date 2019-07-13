
 var sBGame={
    yogurt:{
        name:"Yogurt",
        health:0,
        attack:0,
        counter:0
    },
    loneStar:{
        name:"Lone Starr",
       health:0,
       attack:0,
       counter:0
   },
   darkHelmet:{
       name:"Dark Helmet",
       health:0,
       attack:0,
       counter:0
   },
   asshole:{
       name:"Major Asshole",
       health:0,
       attack:0,
       counter:0
   },
   winCount:0,
   attack:function(player,opponent){
       this[player].health-=this[opponent].counter;
       this[opponent].health-=this[player].attack;
       
       $("#status").html(this[player].name + " attacked " + this[opponent].name + " with " + this[player].attack + 
       " attack power. <br/>" + this[opponent].name + " countered with " + this[opponent].counter + ".");
        
        $("#status").show();

        if(this[player].health<=0){
            $("#status").append("<br/>" + this[player].name +" lost. Reset the game to play again.");
            $("#reset").show();
            $("#fireAsshole").hide();

        }
        else if(this[player].health>0&&this[opponent].health<=0){
            this.winCount++;
            if(this.winCount===3){
                $("#reset").show();
                $("#fireAsshole").hide();
                $("#status").append("<br/>You won the game! Press reset to start again.");
                $("#badGuy").hide();
            }
            else{
            $("#status").append("<br/>" + this[player].name +" won! Select another opponent.");
            $("#availableBadGuys").show();
           $("#availablePlayers").append($("#badGuy .character").detach());
           $("#availablePlayers").hide()
           $("#badGuy").hide();
           $("#fireAsshole").hide();
            };
        };

        this[player].attack+=this[player].attack;
        $("#currentPlayer .health").text(this[player].health);
        $("#badGuy .health").text(this[opponent].health);
       
   },
   randomize: function(character){
       this[character].health=Math.floor(Math.random()*101)+100;
       this[character].attack=Math.floor(Math.random()*20)+11;
       this[character].counter=Math.floor(Math.random()*20)+21;
   },
   newgame: function(){
       this.randomize("yogurt");
       this.randomize("loneStar");
       this.randomize("darkHelmet");
       this.randomize("asshole");
       this.winCount=0;
       $("#yogurt .health").text(this.yogurt.health);
       $("#loneStar .health").text(this.loneStar.health);
       $("#darkHelmet .health").text(this.darkHelmet.health);
       $("#asshole .health").text(this.asshole.health);
       $("#status").html("");
       $("#currentPlayer").hide();
       $("#availableBadGuys").hide();
       $("#badGuy").hide();
       $("#fireAsshole").hide();
       $("#reset").hide();
       $("#status").hide();
     }

};


$(document).ready(function() {

    sBGame.newgame();

    $("#availablePlayers").on("click", ".character", function (){
    $("#currentPlayer").append($(this).detach());
    $("#currentPlayer").show();
    $("#availableBadGuys").append($("#availablePlayers .character").detach());
    $("#availableBadGuys").show();


    });


    $("#availableBadGuys").on("click", ".character", function (){
        $("#badGuy").append($(this).detach());
        $("#badGuy").show();
        $("#availableBadGuys").hide();
        $("#fireAsshole").show();
    
    
        });

    $("#reset").on("click","button",function(){
        $("#availablePlayers").append($(".character").detach());
        sBGame.newgame();
        $("#availablePlayers").show();
    });

    $("#fireAsshole").on("click", "button", function(){
       sBGame.attack($("#currentPlayer .character").attr("character"),$("#badGuy .character").attr("character"));
        


    })






});
