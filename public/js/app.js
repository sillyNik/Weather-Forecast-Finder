// for the html doc which we require for showing up the result 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
     message1.textContent = 'Loading ...'
     message2.textContent = ''
     e.preventDefault()
     const location = search.value
     fetch('/weather?address='+location).then((response)=>{
     response.json().then((data)=>{
        if(data.error){
         message1.textContent = data.error
         message2.textContent=''
        }
        else{ 
        message1.textContent = data.location
        message2.textContent = data.forecast
        }
    })
})

})