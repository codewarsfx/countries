


const data= (()=>{

 


    return {
        data:[],
        fet: async ()=>{

            const response= await fetch('https://restcountries.eu/rest/v2/all')

            const responseData= await response.json()

            const usableData=  responseData.map(({alpha2Code,flag})=>{
                return{
                    alpha2Code,
                    flag
                }
            })
        }

       

      

        
    }
})()


const ui =(()=>{
    const domElements={
        result: document.querySelector('.results')
    }

    const printUi= (itemObj)=>{
         const {flag}=itemObj
        const resultParent= domElements.result
        const resultComponent= `
        <div class="results-img">
            <img src="${flag}" alt="">
        </div>
         `
        
        resultParent.insertAdjacentHTML('beforeend',resultComponent)
    }


    return {
        renderUI:(data,numPerPage=5,page=1)=>{
            console.log
            const start= (page-1)* numPerPage
            const end= page*numPerPage

            if(data.length <= numPerPage){
                data.forEach(printUi)
            }
            else{
                data.slice(start,end).forEach(printUi)
            }
        }
    }
})()

data.getData()

