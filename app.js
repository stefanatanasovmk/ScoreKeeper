let addPlayer = document.querySelector("#addPlayer")
let container = document.querySelector(".container")
let resetBtn = document.querySelector("#reset")
let playerCards = document.getElementsByClassName("playerCard")

let RGBnumbers = function () {
     let res = `${Math.floor(Math.random() * (255 - 120)) + 120
          }`
     return res
}
let randomColor = function () {
     return `rgb(${RGBnumbers()},${RGBnumbers()},${RGBnumbers()})`
}

let divNum = 0

function addPlayerCard(e) {
     divNum++

     let newPlayerCard = document.createElement("div")
     document.querySelector(".container").appendChild(newPlayerCard)
     newPlayerCard.classList.add(`player${divNum}`, "playerCard")
     newPlayerCard.style.background = randomColor()

     let plusBtn = document.createElement("button")
     plusBtn.setAttribute("id", `plusBtn${divNum}`)
     plusBtn.setAttribute("class", "plussbutton")
     document.querySelector(`.player${divNum}`).appendChild(plusBtn)

     let playerNameInput = document.createElement("input")
     playerNameInput.placeholder = "Player Name"
     playerNameInput.classList.add(`playerNameClass${divNum}`, "playerNameInput")
     document.querySelector(`.player${divNum}`).appendChild(playerNameInput)

     let minusBtn = document.createElement("button")
     minusBtn.setAttribute("id", `minusBtn${divNum}`)
     minusBtn.setAttribute("class", "minusbutton")
     document.querySelector(`.player${divNum}`).appendChild(minusBtn)

     let scoreText = document.createElement("span")
     scoreText.innerHTML = 0
     scoreText.setAttribute("id", `scoretxt${divNum}`)
     scoreText.setAttribute("class", "scoreText")
     document.querySelector(`.player${divNum}`).appendChild(scoreText)


     let deleteBtn = document.createElement("button")
     deleteBtn.setAttribute("class", "deletebutton")
     document.querySelector(`.player${divNum}`).appendChild(deleteBtn)

     let addMoreBtn = document.createElement("input")
     document.querySelector(`.player${divNum}`).appendChild(addMoreBtn)
     addMoreBtn.classList.add(`.addMoreBtn${divNum}`, "moreLessPointsBtn")
     addMoreBtn.placeholder = "Plus More Points"
     addMoreBtn.setAttribute("type", "number")
     addMoreBtn.setAttribute("min", "1")
     addMoreBtn.setAttribute("max", "999")
     addMoreBtn.onblur = whenNotClicked
     addMoreBtn.onfocus = whenClicked

     let addLessBtn = document.createElement("input")
     document.querySelector(`.player${divNum}`).appendChild(addLessBtn)
     addLessBtn.classList.add(`.addLessBtn${divNum}`, "moreLessPointsBtn")
     addLessBtn.placeholder = "Minus More Points"
     addLessBtn.setAttribute("type", "number")
     addLessBtn.setAttribute("min", "1")
     addLessBtn.setAttribute("max", "999")
     addLessBtn.onblur = whenNotClicked
     addLessBtn.onfocus = whenClicked

     playerNameInput.addEventListener("keyup", function (e) {
          let playerName = playerNameInput.value
          if (e.key === "Enter" && playerName.length > 0) {
               let textAreaCreate = document.createElement("span")
               textAreaCreate.innerHTML = playerName
               textAreaCreate.classList.add("nameSpan", `nameNum${divNum}`)
               plusBtn.after(textAreaCreate)
               playerNameInput.remove()
               if (playerName.length > 0) {
                    plusBtn.onclick = whenClickPlus
                    minusBtn.onclick = whenClickMinus
                    addMoreBtn.onkeyup = whenInputPlus
                    addLessBtn.onkeyup = whenInputMinus
               }
          } else if (e.key === "Enter" && playerName.length === 0) {
               playerNameInput.placeholder = "Please enter valid name"
          }

     });

     function whenClickPlus(e) {
          let cardNum = e.target.parentElement.classList[0].slice(6, 10)
          let textArea = document.querySelector(`#scoretxt${cardNum}`)
          let scoreNum = parseInt(textArea.innerHTML)
          textArea.innerHTML = scoreNum + 1
     }


     function whenClickMinus(e) {
          let cardNum = e.target.parentElement.classList[0].slice(6, 10)
          let textArea = document.querySelector(`#scoretxt${cardNum}`)
          let scoreNum = parseInt(textArea.innerHTML)
          textArea.innerHTML = scoreNum - 1
     }

     deleteBtn.onclick = whenClickDelete
     function whenClickDelete(e) {
          let cardNumber = e.target.parentElement.classList[0].slice(6, 10)
          let card = document.querySelector(`.player${cardNumber}`)
          card.remove()
     }

     let whenInputPlus = function (e) {
          e.preventDefault()
          let addedPoints = addMoreBtn.value
          let cardNum = e.target.parentElement.classList[0].slice(6, 10)
          if (e.key === "Enter" && addedPoints < 1000 && addedPoints > 0) {
               let textArea = document.querySelector(`#scoretxt${cardNum}`)
               let scoreNum = parseInt(textArea.innerHTML)
               textArea.innerHTML = scoreNum + parseInt(addedPoints)
               addMoreBtn.value = ""
          } else if (e.key === "Enter" && addedPoints >= 1000 || addedPoints < 0) {
               addMoreBtn.value = ""
               addMoreBtn.setAttribute("placeholder", "Max 999")
          }
     }

     let whenInputMinus = function (e) {
          let minusedPoints = addLessBtn.value
          let cardNum = e.target.parentElement.classList[0].slice(6, 10)
          if (e.key === "Enter" && minusedPoints < 1000 && minusedPoints > 0) {
               let textArea = document.querySelector(`#scoretxt${cardNum}`)
               let scoreNum = parseInt(textArea.innerHTML)
               textArea.innerHTML = scoreNum - parseInt(minusedPoints)
               addLessBtn.value = ""
          } else if (e.key === "Enter" && minusedPoints >= 1000) {
               addLessBtn.value = ""
               addLessBtn.setAttribute("placeholder", "Max 999")
          }
     }


     function whenClicked() {
          this.style.outline = `solid 3px ${randomColor()}`
     }

     function whenNotClicked() {
          this.style.outline = "none"
     }

}


function onStart() {
     return new Promise((resolved) => {
          setTimeout(() => {
               addPlayerCard()
               resolved()
          }, 150);
     })
}

function opacity() {
     return new Promise((resolved) => {
          setTimeout(() => {
               for (let i of playerCards) {
                    i.classList.add("opacityClass")
               }
          }, 20)
          resolved()
     })
}

async function whenOpenPage() {
     try {
          await onStart()
          await opacity()
          await onStart()
          await opacity()
          await onStart()
          await opacity()
     }
     catch (e) {
          console.log(e)
     }
}

whenOpenPage()

async function whenClickAdd() {
     try {
          await onStart()
          await opacity()
     }
     catch (e) {
          console.log(e)
     }
}

addPlayer.onclick = whenClickAdd


function removeElements() {
     return new Promise((resolved) => {
          let playerCards = document.querySelectorAll(".playerCard")
          for (let i of playerCards) {
               i.remove()
          }
          resolved()
     })

}

async function whenClickReset() {
     try {
          await removeElements()
          await whenOpenPage()
     }
     catch (e) {
          console.log(e)
     }

}

resetBtn.onclick = whenClickReset
