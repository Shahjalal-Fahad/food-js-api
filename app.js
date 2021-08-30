const searchBtn=()=>{
    const searchInput=document.getElementById('search-input');
    const searchText=searchInput.value;
    searchInput.value='';
     if (searchText==''){
        const messageId=document.getElementById('no-search')
        const div=document.createElement('div');
        div.classList.add('container');
        div.innerHTML=`<h3 class="text-center text-danger">No result Found</h3>`
        messageId.textContent='';  
        messageId.appendChild(div);
      }
      else{

        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(req =>req.json())
        .then(data=>searchResult(data.meals));
        // console.log(meal);
      }
   
}
const searchResult=meals =>{
  const searchResult1=document.getElementById('search-result');
  searchResult1.textContent='';
  if (meals==null){
    const messageId=document.getElementById('no-search')
    const div=document.createElement('div');
    div.classList.add('container');
    div.innerHTML=`<h3 class="text-center text-danger">No result Found</h3>`
    messageId.textContent='';  
    messageId.appendChild(div);
    const detailId=document.getElementById('meal-details');
    detailId.textContent='';
  }
  else{
    meals.forEach(meal=>{
      // no search
      const search=document.getElementById('no-search');
      search.textContent='';
      searchResult1.classList.add('col');
      const serachDiv=document.createElement('div');
      serachDiv.innerHTML=`
      <div class="card" onclick="mealId(${meal.idMeal})">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
          </div>
        </div>
      `;
      searchResult1.appendChild(serachDiv);
  })
  }
}

const mealId=mealId=>{
  const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
  .then(req=>req.json())
  .then(data=>mealDetail(data.meals[0]))
}
const mealDetail=meal=>{
  const searchResult1=document.getElementById('search-result');
  searchResult1.textContent='';
  // console.log(meal)
  const detailId=document.getElementById('meal-details');
  detailId.textContent='';
  const div=document.createElement('div')
  div.classList.add('card');
  div.style.padding='50px';
  div.style.margin='50px';
  div.innerHTML=`  
  <img src="${meal.strMealThumb}" class="card-img-top w-50 mx-auto" alt="...">
  <div class="card-body">
    <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
    <br>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go There</a>
  </div>
`;
detailId.appendChild(div)
  
}