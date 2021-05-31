const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const weatherIcon=document.querySelector('#weatherIconImg')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                messageOne.textContent=data.error
            }else{
                //console.log(data.location)
                //console.log(data.forecast)
                weatherIcon.src=data.weatherIcon
                messageOne.textContent=data.location
                messageTwo.innerHTML=data.forecast
            }
        })
    })
})