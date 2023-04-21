
var buttonColours = ["red", "blue", "green", "yellow"]; //warna yang ada pada gambar
var gamePattern = []; //rangakaian warna yang dibentuk oleh game
var userClickedPattern = []; //rangakaian warna yang diklik oleh user

var started = false;

var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    //this disini merujuk pada button, kemudian akan sama dengan id yang dikklik oleh user
    userClickedPattern.push(userChosenColour);
    //untuk menambahkan hasil dari userChosenColour ke userClickedPattern
    playSound(userChosenColour);
    //akan memainkan fungsi playsound berdarsarkan warna yang diplih pada userChosenColour
    animatedPress(userChosenColour);
    // untuk memainkan fungsi animatedPress
    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    if(!started){//jika variabel tidak started maka akan menjalankan progam ini
        $("#level-title").text("level"+ level);//akan mengganti tulisan level diatas
        nextSequnce();
        started = true;
    }

})


function nextSequnce () {
    userClickedPattern = [];// setiap function  nextSequence dipanggil maka userClikedPattern akan tereset sehingga game baru siap dimulai
    level++; //level akan bertambah setiap function nextSequence tertrigger
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    //untuk mendapatkan angka random dari 0-3
    var randomChosenColour = buttonColours[randomNumber];
    //untuk mendapatkan warna dari button colours, misal: buttonColours[0] = "red"
    gamePattern.push(randomChosenColour);
    //untuk menambahkan hasil dari randomChosenColour ke Array gamePattern
    playSound(randomChosenColour)
    //akan memainkan fungsi sounds berdasarkan warna acak pada randomChosenColour
    makeFade(randomChosenColour)
}

function playSound(name){//fungsi untuk memainkan sounds
    var audio  = new Audio ("sounds/"+ name + ".mp3");
    audio.play();
    //name disini bergantung pada playsound(name)
}
function makeFade(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
    // untuk membuat efek flash pada tombol yang dipencet
}
function animatedPress(currentColour){
    $("."+currentColour).addClass("pressed");
    //ketika fungsi dipanggil maka akan mengahsilkan efek flash dari css .pressed
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100)
    //jeda 100 ms dari tombol diklik maka efek yang ditambahkan sebelumnya akan hilang
}
function checkAnswer (currentLevel){ //fungsi untuk mencocokkan jawaban gamePattern dengan userClikedPattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succes"); //setiap 
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequnce(); },1000 );

        }}
        else{
            var audio  = new Audio ("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            $("h1").text("Game Over, Press any key to start");
            startOver();

        }

    }
function startOver (){
    level = 0;
    gamePattern = [];
    started = false;
}