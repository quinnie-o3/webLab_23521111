// Lặp qua tất cả nút và thêm sự kiện click
let drumButtons = document.querySelectorAll(".drum");

for (let i = 0; i < drumButtons.length; i++) {
  drumButtons[i].addEventListener("click", function() {
    let buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

// Lắng nghe sự kiện nhấn phím
document.addEventListener("keypress", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

// Hàm phát âm thanh (switch-case)
function makeSound(key) {
  switch (key) {
    case "w":
      new Audio("sound/drumW.mp3").play();
      break;

    case "a":
      new Audio("sound/drumA.mp3").play();
      break;

    case "s":
      new Audio("sound/drumS.mp3").play();
      break;

    case "d":
      new Audio("sound/drumD.mp3").play();
      break;

    case "j":
      new Audio("sound/drumJ.mp3").play();
      break;

    case "k":
      new Audio("sound/drumK.mp3").play();
      break;

    case "l":
        new Audio("sound/drumL.mp3").play();
      break;

    default:
      console.log(key);
  }
}

// Hiệu ứng animation cho nút
function buttonAnimation(currentKey) {
  let activeButton = document.querySelector("." + currentKey);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}
