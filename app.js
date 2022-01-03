let playerCard = document.querySelector(".player1")
let addPlayer = document.querySelector("#addPlayer")
let container = document.querySelector(".container")
let resetbtn = document.querySelector("#reset")



let randomColor = function () {
     let r = `${Math.floor(Math.random() * (255 - 120)) + 120
          }`
     let g = `${Math.floor(Math.random() * (255 - 120)) + 120
          }`
     let b = `${Math.floor(Math.random() * (255 - 120)) + 120
          }`
     return `rgb(${r},${g},${b})`
}
let randomColorAll = function () {
     let r = `${Math.floor(Math.random() * 255) + 1
          }`
     let g = `${Math.floor(Math.random() * 255) + 1
          }`
     let b = `${Math.floor(Math.random() * 255) + 1
          }`
     return `rgb(${r},${g},${b})`
}

let divNum = 0

for (let i = 0; i < 3; i++) {
     addPlayerCard()
}

addPlayer.onclick = addPlayerCard

function addPlayerCard(e) {
     divNum++

     let cardSection = document.createElement("section")
     document.querySelector(".container").appendChild(cardSection)
     cardSection.classList.add(`cardNum${divNum}`, "cardSection")

     let newPlayerCard = document.createElement("div")
     document.querySelector(`.cardNum${divNum}`).appendChild(newPlayerCard)
     newPlayerCard.classList.add(`player${divNum}`, "forDelete")
     newPlayerCard.style.background = randomColor()

     let addMoreBtn = document.createElement("input")
     document.querySelector(`.cardNum${divNum}`).appendChild(addMoreBtn)
     addMoreBtn.classList.add(`.addMoreBtn${divNum}`, "moreLessPointsBtn")
     addMoreBtn.placeholder = "Add More Points"
     addMoreBtn.style.backgroundColor = randomColor()
     addMoreBtn.maxLength = "3"

     addMoreBtn.addEventListener("keyup", function (e) {
          let addedPoints = addMoreBtn.value
          let cardNum = e.target.parentElement.classList[0].slice(7, 10)
          if (e.key === "Enter" && (isNaN(addedPoints)) || addedPoints.trim() === "") {
               addMoreBtn.value = ""
               addMoreBtn.setAttribute("placeholder", "Enter a number")
          } else if (e.key === "Enter" && !(isNaN(addedPoints))) {
               let updatedText = document.querySelector(`#scoretxt${cardNum}`)
               updatedText.innerHTML = numberTxt += parseInt(addedPoints)
               addMoreBtn.value = ""
               addMoreBtn.setAttribute("placeholder", "Add More Points")

          }

     })

     let addLessBtn = document.createElement("input")
     document.querySelector(`.cardNum${divNum}`).appendChild(addLessBtn)
     addLessBtn.classList.add(`.addLessBtn${divNum}`, "moreLessPointsBtn")
     addLessBtn.placeholder = "Minus More Points"
     addLessBtn.style.backgroundColor = randomColor()
     addLessBtn.maxLength = "3"

     addLessBtn.addEventListener("keyup", function (e) {
          let minusedPoints = addLessBtn.value
          let cardNum = e.target.parentElement.classList[0].slice(7, 10)
          if (e.key === "Enter" && (isNaN(minusedPoints)) || minusedPoints.trim() === "") {
               addLessBtn.value = ""
               addLessBtn.setAttribute("placeholder", "Enter a number")

          } else if (e.key === "Enter" && !(isNaN(minusedPoints))) {
               let updatedText = document.querySelector(`#scoretxt${cardNum}`)
               updatedText.innerHTML = numberTxt -= parseInt(minusedPoints)
               addLessBtn.value = ""
               addLessBtn.setAttribute("placeholder", "Minus More Points")

          }
     })
     addLessBtn.onfocus = whenClicked
     addMoreBtn.onfocus = whenClicked
     function whenClicked() {
          this.style.outline = `solid 3px ${randomColorAll()}`
     }
     addLessBtn.onblur = whenNotClicked
     addMoreBtn.onblur = whenNotClicked
     function whenNotClicked() {
          this.style.outline = "none"
     }

     let plusbtn = document.createElement("button")
     plusbtn.setAttribute("id", `plusbtn${divNum}`)
     plusbtn.setAttribute("class", "plussbutton")
     document.querySelector(`.player${divNum}`).appendChild(plusbtn)

     let playerNameInput = document.createElement("input")
     playerNameInput.placeholder = "Player Name"
     document.querySelector(`.player${divNum}`).appendChild(playerNameInput)

     playerNameInput.addEventListener("keyup", function (e) {
          if (e.key === "Enter") {
               let playerName = playerNameInput.value
               let textAreaCreate = document.createElement("span")
               textAreaCreate.innerHTML = playerName
               textAreaCreate.setAttribute("class", "nameSpan")
               plusbtn.after(textAreaCreate)
               playerNameInput.remove()

          }
     });


     let minusbtn = document.createElement("button")
     minusbtn.setAttribute("id", `minusbtn${divNum}`)
     minusbtn.setAttribute("class", "minusbutton")
     document.querySelector(`.player${divNum}`).appendChild(minusbtn)

     let scoreText = document.createElement("span")
     let numberTxt = 0
     scoreText.innerHTML = numberTxt
     scoreText.setAttribute("id", `scoretxt${divNum}`)
     scoreText.setAttribute("class", "scoreText")
     document.querySelector(`.player${divNum}`).appendChild(scoreText)

     let deletebtn = document.createElement("button")
     deletebtn.setAttribute("class", "deletebutton")
     document.querySelector(`.player${divNum}`).appendChild(deletebtn)


     plusbtn.onclick = whenClickPlus

     function whenClickPlus(e) {
          let cardNumber = e.target.parentElement.classList[0].slice(6, 10)
          let updatedText = document.querySelector(`#scoretxt${cardNumber}`)
          numberTxt++
          if (e.target.id === `plusbtn${cardNumber}`) {
               updatedText.textContent = numberTxt
          }
     }

     deletebtn.onclick = whenClickDelete
     function whenClickDelete(e) {
          let cardNumber = e.target.parentElement.classList[0].slice(6, 10)
          let card = document.querySelector(`.cardNum${cardNumber}`)
          card.remove()
     }

     minusbtn.onclick = whenClickMinus
     function whenClickMinus(e) {
          let cardNumber = e.target.parentElement.classList[0].slice(6, 10)
          let updatedText = document.querySelector(`#scoretxt${cardNumber}`)
          numberTxt--
          if (e.target.id === `minusbtn${cardNumber}`) {
               updatedText.textContent = numberTxt
          }

     }


     let allSection = document.querySelectorAll(".cardSection")
     resetbtn.onclick = whenResetClick
     function whenResetClick() {
          for (let a of allSection) {
               a.remove()
          }

          for (let i = 0; i < 3; i++) {
               addPlayerCard()
          }

     }

}