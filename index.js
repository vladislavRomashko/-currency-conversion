const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const data = fetch (URL)

const ukrGrn = {
  txt: 'Українська гривня',
  r030: 1,
  rate: 1
}

  const input = document.getElementById('input')
  const outPut = document.getElementById('output')
  const exchangeRates = document.getElementById('exchangeRates')
  const select = document.querySelector('#currency1')
  const select2 = document.querySelector('#currency2')
  const infoInput = document.getElementById('info-input')
  const infoOutput = document.getElementById('info-output')
  

  const sel = select.selectedIndex
  const params = select.options
  const sel2 = select2.selectedIndex
  const params2 = select2.options

function createOption(item, index) {
  const option = document.createElement('option')
  const option2 = document.createElement('option')
  option.setAttribute('value', `${index}`)
  option2.setAttribute('value', `${index}`)
  option.innerText = item
  option2.innerText = item
  if(index === 1){
    option2.setAttribute('selected', 'selected')
  }
  select.append(option)
  select2.append(option2)
}

function getParams() {
  return {
    sel : select.selectedIndex,
    params : select.options,
    sel2 : select2.selectedIndex,
    params2 : select2.options
  }
  }
  

function setValues(){
  
  const{sel,sel2,params,params2,} = getParams()

  if(Number(params2[sel2].value) === 1 ) {
    exchangeRates.innerText = Number(params[sel].value).toFixed(3)
    outPut.value =  Number(input.value  *  params[sel].value).toFixed(2)  
    infoInput.innerText = `1 ${params[sel].innerText} дорівнює`
    infoOutput.innerText = `${Number(params[sel].value).toFixed(3)} ${params2[sel2].innerText}`
  } else if(Number(params[sel].value) === 1 ){
    exchangeRates.innerText = Number(params[sel].value / params2[sel2].value).toFixed(3)
    outPut.value =  Number(input.value  /  params2[sel2].value).toFixed(2) 
    infoInput.innerText = `1 ${params[sel].innerText} дорівнює`
    infoOutput.innerText = `${Number(params[sel].value / params2[sel2].value ).toFixed(3)} ${params2[sel2].innerText}` 
  }else {
    exchangeRates.innerText = Number(params[sel].value / params2[sel2].value  ).toFixed(3)
    outPut.value =  Number(input.value  *  Number(exchangeRates.innerText)).toFixed(2) 
    infoInput.innerText = `1 ${params[sel].innerText} дорівнює`
    infoOutput.innerText = `${ Number(exchangeRates.innerText).toFixed(3)  } ${params2[sel2].innerText}`
  }
}

function getSum(){
  let result
  
  const{sel,sel2,params,params2,} = getParams()
  
  if(Number(params2[sel2].value) === 1) {
    result = Number(outPut.value  / params[sel].value)
    input.value = Number(result).toFixed(2)  
  } else {
    result = Number(outPut.value / exchangeRates.innerText)
    input.value = result.toFixed(2)
  }
  
}

function reversSum(){
  let result

  const{sel,sel2,params,params2,} = getParams()

  if(Number(params2[sel2].value) === 1) {
    result = Number(input.value  *  params[sel].value)
    outPut.value = Number(result).toFixed(2)  
  } else {
    result = Number( input.value * exchangeRates.innerText)
    outPut.value = result.toFixed(2)
  }
  
}



const finalData =  data
.then((data)=>data.json())

 
finalData
.then(data=> {
  data.push(ukrGrn)
  const sortedData = data.sort((a, b) => a.txt > b.txt ? 1 : -1)
  sortedData.forEach((item)=>{
const {txt,rate} = item
createOption(txt,rate)
  })
 
  setValues()
}
  )
.catch(e=>console.log(e))
.finally(()=>{
  document.getElementById('loader').style.display = 'none'
  document.getElementById('app-box').style.display = 'block'
})


select.addEventListener('change', setValues)
select2.addEventListener('change',setValues )


input.addEventListener('input',reversSum )
outPut.addEventListener('input', getSum)


