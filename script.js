const tableHead =  `<tr><th>Marca</th><th>Modelo</th><th>Ano</th><th>Preço</th></tr>` 

function createRow(obj){
  let td1 = document.createElement("td")
  let td2 = document.createElement("td")
  let td3 = document.createElement("td")
  let td4 = document.createElement("td")

  td1.innerText = obj.marca
  td2.innerText = obj.modelo
  td3.innerText = obj.ano
  td4.innerText = `R$${obj.preco},00`

  let tr = document.createElement("tr")
  tr.append(td1,td2,td3,td4)

  return tr
}

function renderRows(list){
  let table = document.querySelector(".table")
  table.innerHTML = ""
  table.insertAdjacentElement("beforeend", tableHead)

  for (let i = 0; i < list.length; i++) {
    let obj = list[i]
    let element = createRow(obj)

    table.appendChild(element) 
  }
}

renderRows(tabela)

document.querySelector("#btn-search").addEventListener("click" , function(e){
  e.preventDefault()

  let searchInput = querySelector("#input-search")
  let searchText = searchInput.value

  let filteredList = filterList(tabela , searchText)

  renderRows(filteredList)
})

function filterList(list, text){
  let localList = []
  text = text.toLowerCase()
  
  if(text.includes("marca: ")){
    text = text.substring(6)
    for(let i = 0; i< list.length; i++){
        let obj = list[i]
        if(obj.marca.toLowerCase().includes(text)){
          localList.push(obj)
        }
    }
  }else if(text.includes("modelo: ")){
    text = text.substring(7)
    for(let i = 0; i< list.length; i++){
        let obj = list[i]
        if(obj.marca.toLowerCase().includes(text)){
          localList.push(obj)
        }
    }
  }else{
      for(let i = 0; i< list.length; i++){
      let obj = list[i]
      if( obj.marca.toLowerCase().includes(text) || 
          obj.modelo.toLowerCase().includes(text) || 
          obj.ano.toString().includes(text) || 
          obj.preco.toString().includes(text) 
        ){
        localList.push(obj)
      }
    }
  }
  
  return localList
}

function sortData(e, type){
  e.preventDefault()

  let newList = [...tabela]

  newList.sort(function(a,b){
    if(a.marca < b.marca){
      return -1
    }else if(a.marca > b.marca){
      return 1
    }else{
      return 0
    }
  })

  renderRows(newList)
}