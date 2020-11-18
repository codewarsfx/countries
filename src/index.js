


const data= (()=>{

    return {
        getData:  async ()=>{

            const response= await fetch('https://restcountries.eu/rest/v2/all')

            const responseData= await response.json()

            const usableData=  responseData.map(({alpha2Code,flag,name})=>{
                return{
                    alpha2Code,
                    flag,
                    name
                }
            })

            return usableData
        }
    }
})()


const ui =(()=>{
    const domElements={
        result: document.querySelector('.results'),
        input:document.querySelector('.input-element')
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
        const {flag,alpha2Code}=itemObj
        const resultParent= domElements.result
        const resultComponent= `
        <div class="results-img">
            <img src="${flag}" alt="">
            <p class="para">${alpha2Code}</p> 
        </div>
         `
        resultParent.insertAdjacentHTML('beforeend',resultComponent)
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
        readInput
    }

})()






var j

async function get(){


     j= await data.getData()

    ui.renderUI(j)

  
}

get()




document.querySelector('.results').addEventListener('click',(e)=>{

    const pa= parseInt(e.target.closest('.icon').dataset.go,10)

    ui.renderUI(j,5,pa)


})

document.querySelector('.input-element').addEventListener('keyup',(e)=>{

    ui.renderUI(ui.filterSearch(e.target.value,j))
})







