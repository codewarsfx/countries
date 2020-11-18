



const data= (()=>{

    return {
        getData:  async ()=>{

            const response= await fetch('https://restcountries.eu/rest/v2/all')

            const responseData= await response.json()

            const usableData=  responseData.map(({alpha2Code,flag,name,capital,population,timezones,currencies,languages})=>{
                return{
                    alpha2Code,
                    flag,
                    name,
                    capital,
                    population,
                    timezones,
                    currencies,
                    languages
                }
            })

            return usableData
        }
    }
})()


const ui =(()=>{
    const domElements={
        result: document.querySelector('.results'),
        input:document.querySelector('.input-element'),
        details:document.querySelector('.details')
    }

    const button =(where,page)=>{
        return `<span class="icon icon-${where==='next'?'right':'left'}" data-go="${where==='next'?page+1 : page-1}"><i class="fas fa-chevron-${where==='next'?'right':'left'}"></i></span>`
    }

    const readInput = (node)=>node.value.trim();


    const renderButton= (data,page,numberPerPage)=>{
        const pages= Math.ceil(data.length/numberPerPage)
        var but
        if(page===1 && pages>1){
            but = button('next',page)
        }
        else if(page> 1 && page < pages ){
            but= `${button('next',page)} ${button('prev',page)}`
        }
        else if(page===pages && pages > 1){
            but=  button('prev',page)
        }
        domElements.result.insertAdjacentHTML('beforeend',but)
    }


    const printUi= (itemObj)=>{
        const {flag,alpha2Code,name}=itemObj
        const resultParent= domElements.result
        const resultComponent= `
        <div class="results-img" id="${name}">
            <img src="${flag}" alt="">
            <p class="para">${alpha2Code}</p> 
        </div>
         `
        resultParent.insertAdjacentHTML('beforeend',resultComponent)
    }

    const renderDetails =(item)=>{
        const {flag,name,capital,population,timezones,currencies,languages}= item
        domElements.details.innerHTML=''
        const detailsUi=`
          <div class="top-container-img">
                <img src="${flag}" alt="">
            </div>
            <div class="top-container--desciption">
                <div class="top-heading">
                    <h1>${name}</h1>
                    <h3>${capital}</h3>
                </div>
                <div class="top-details">
                    <div class="top-details-row">
                        <div class="top-details-col">
                            <div class="top-details-col-icon">
                                 <i class="fas fa-users"></i>
                            </div>
                            <div class="top-details-des">
                                <p>Population</p>
                                <h3>${population}</h3>
                            </div>

                        </div>
                        <div class="top-details-col">
                            <div class="top-details-col-icon">
                             <i class="fas fa-language"></i>
                            </div>
                            <div class="top-details-des">
                                <p>Language</p>
                                <h3>${languages[0].name}</h3>
                            </div>

                        </div>

                    </div>
                     <div class="top-details-row">
                        <div class="top-details-col">
                            <div class="top-details-col-icon">
                               <i class="far fa-money-bill-alt"></i>
                            </div>
                            <div class="top-details-des">
                                <p>Currency</p>
                                <h3>${currencies[0].name}</h3>
                            </div>

                        </div>
                        <div class="top-details-col">
                            <div class="top-details-col-icon">
                                <i class="fas fa-hourglass-half"></i>
                            </div>
                            <div class="top-details-des">
                                <p>Time-zone</p>
                                <h3>${timezones[0]}</h3>
                            </div>

                        </div>
                    </div> 
                </div>
            </div>
        `
        domElements.details.insertAdjacentHTML('afterbegin',detailsUi)
    }


    return {
        renderUI:(data,numPerPage=5,page=1)=>{
            domElements.result.innerHTML=''
            const start= (page-1)* numPerPage
            const end= page*numPerPage

            if(data.length <= numPerPage){
                data.forEach(printUi)
            }
            else{
                data.slice(start,end).forEach(printUi)
                       renderButton(data,page,numPerPage)
            }

     
        },
        filterSearch :(value, data)=>{
          
            const filteredData= data.filter(({name})=>name.toLowerCase().includes(value.toLowerCase()))
            return filteredData
        },
        readInput,

        renderDetails:(name,data)=>{
              console.log(name)
            const objWithName= data.find(({name:countryName})=>name === countryName )
            renderDetails(objWithName)
        }
    }

})()






var state={

}

async function get(){

    state.data= await data.getData()

    ui.renderUI(state.data)
  
}
get()

document.querySelector('.results').addEventListener('click',(e)=>{

    if(e.target.closest('.icon')){

    ui.renderUI(state.data,5,parseInt(e.target.closest('.icon').dataset.go,10))
    }


    if(e.target.closest('.results-img')){

        

        ui.renderDetails(e.target.closest('.results-img').id,state.data)
    }
})

document.querySelector('.input-element').addEventListener('keyup',(e)=>{

    ui.renderUI(ui.filterSearch(e.target.value,state.data))
})







