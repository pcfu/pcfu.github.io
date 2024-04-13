const currDisplay = document.querySelector('.current-value')
const tmpDisplay = document.querySelector('.tmp-value')
let operator = null
let tmp = 0

function clearAll() {
  currDisplay.innerText = '0'
  tmpDisplay.innerText = ''
  operator = null
  tmp = 0
}

function removeLastDigit() {
  let result = currDisplay.innerText
  result = result.slice(0, Math.max(0, result.length - 1))
  if (result === '') {
    result = '0'
  }
  currDisplay.innerText = result
}

function addDigit(digit) {
  const text = currDisplay.innerText.toLowerCase()
  if (['0', 'infinity', 'nan'].includes(text)) {
    currDisplay.innerText = digit
    return
  }

  currDisplay.innerText += digit
}

function setOperator(opr) {
  if (operator !== null) return

  operator = opr
  tmp = parseInt(currDisplay.innerText)
  tmpDisplay.innerText = `${tmp} ${operator}`
  currDisplay.innerText = 0;

}

function calc() {
  if (operator === null) return

  let result
  const operand = parseInt(currDisplay.innerText)
  switch(operator.charCodeAt(0)) {
    // add
    case 43:
      result = tmp + operand
      break
    // subtract
    case 8722:
      result = tmp - operand
      break
    // multiply
    case 215:
      result = tmp * operand
      break
    // divide
    case 247:
      result = tmp / operand
      break
    default:
      return
  }

  currDisplay.innerText = result
  tmpDisplay.innerText = ''
  operator = null
  tmp = 0
}

function init() {
  const btnContainer = document.querySelector('.calc-buttons')
  btnContainer.addEventListener('click', event => {
    if (event.target === btnContainer) return

    const classes = Array.from(event.target.classList)
    if (classes.includes('cancel')) {
      clearAll()
    } else if (classes.includes('delete')) {
      removeLastDigit()
    } else if (classes.includes('equal')) {
      calc()
    } else if (classes.includes('number-button')) {
      addDigit(event.target.innerText)
    } else if (classes.includes('fn-button')) {
      setOperator(event.target.innerText)
    }
  })
}

init()
