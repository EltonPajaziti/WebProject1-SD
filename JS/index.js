// let slideIndex = 0;
//     showSlides();

//     function showSlides() {
//         let slides = document.getElementsByClassName("slide");
//         let dots = document.getElementsByClassName("dot");
//         for (let i = 0; i < slides.length; i++) {
//             slides[i].style.display = "none";  
//         }
//         slideIndex++;
//         if (slideIndex > slides.length) {slideIndex = 1}    
//         for (let i = 0; i < dots.length; i++) {
//             dots[i].className = dots[i].className.replace(" active", "");
//         }
//         slides[slideIndex-1].style.display = "block";  
//         dots[slideIndex-1].className += " active";
//         setTimeout(showSlides, 3000);
//     }


// document.getElementById("year").textContent = new Date().getFullYear();


var numri = document.getElementById("map_number");
var ikona = document.getElementById("map");

ikona.onmouseover=function(){
    ikona.style.transition="color 5s"
    ikona.style.color = "red";
    
    var rrit=70;

    var interval = setInterval(function() {

        if(rrit>=1000) {
            clearInterval(interval);
        } else {
            rrit++
            numri.innerHTML=rrit;
        }
    }, 10);
}


var numri2 = document.getElementById("map_number2");
var ikona2 = document.getElementById("map2");

ikona2.onmouseover=function(){
    ikona2.style.transition="color 5s"
    ikona2.style.color = "red";
    
    var rrit=70;

    var interval = setInterval(function() {

        if(rrit>=780) {
            clearInterval(interval);
        } else {
            rrit++
            numri2.innerHTML=rrit;
        }
    }, 10);
}

var numri3 = document.getElementById("map_number3");
var ikona3 = document.getElementById("map3");

ikona3.onmouseover=function(){
    ikona3.style.transition="color 5s";
    ikona3.style.color = "red";
    
    var rrit=70;

    var interval = setInterval(function() {

        if(rrit>=3890) {
            clearInterval(interval);
        } else {
            rrit++;
            numri3.innerHTML=rrit;
        }
    }, 3);
}

document.addEventListener("scroll", function() {
    const kryesori = document.querySelector(".kryesori");
    const pozicioni = kryesori.getBoundingClientRect();
    console.log(pozicioni.top); // Verifikoni vlerën e pozicionit

    if (pozicioni.top < window.innerHeight && pozicioni.bottom > 0) {
        kryesori.classList.add("shfaqet");
    }
});

document.getElementById('hamburger-menu').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});