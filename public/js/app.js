const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address=search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=''
            messageTwo.textContent='Desciption: '+data.description+' Temprature: '+data.temprature+' Feelslike '+data.feelslike
        }

    })
})

})