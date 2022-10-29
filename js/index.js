// let userName = document.getElementById("userName")
// let userEmail = document.getElementById("userEmail")
// let userPhone = document.getElementById("userPhone")
// let userAge = document.getElementById("userAge")
// let userPassword = document.getElementById("userPassword")
// let userRepassword = document.getElementById("userRepassword")
// let alertName = document.getElementById("alertName")
// let alertEmail = document.getElementById("alertEmail")
// let alertPhone = document.getElementById("alertPhone")
// let alertAge = document.getElementById("alertAge")
// let alertPassword = document.getElementById("alertPassword")
// let alertRepassword = document.getElementById("alertRepassword")
// let array=[];
// let data = document.getElementById("Data");


let navWidth = $("#nav").outerWidth();
$(".x-mark").click(function () {
    if ($("#nav").css("left") == "0px") {
        $("#nav").css("left", -navWidth)
        $(".logo").css("left", "0px")
        document.querySelector("#xmark").classList.replace("fa-xmark", "fa-bars")
        $(".item1").animate({
            opacity: "0",
            paddingTop: "50px"
        }, 100)
        $(".item2").animate({
            opacity: "0",
            paddingTop: "50px"
        }, 200)
        $(".item3").animate({
            opacity: "0",
            paddingTop: "50px"
        }, 300)
        $(".item4").animate({
            opacity: "0",
            paddingTop: "50px"
        }, 400)
        $(".item5").animate({
            opacity: "0",
            paddingTop: "50px"
        }, 500)
    } else {
        $("#nav").css("left", "0px")
        $(".logo").css("left", navWidth)
        document.querySelector("#xmark").classList.replace("fa-bars", "fa-xmark")
        $("#nav li").animate({
            opacity: "1",
            paddingTop: "0px"
        }, 300)
    }
})

async function searchName(n) {
    $(".loading").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${n}`)
    meals = await meals.json()
    console.log(meals)
    displayMeals(meals.meals)
    $(".loading").fadeOut(300)
    return meals
}
searchName('')

async function searchByLetter(l) {
    if (l) {
        $(".loading").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loading").fadeOut(300)
    }
}

async function getMeal(id) {
    $(".loading").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    meal = await meal.json()
    console.log(meal)
    displayMeal(meal.meals[0])
    $(".loading").fadeOut(300)
}
// getMeal(52774)

function displayMeal(meal) {
    let recipes = ""
    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 alert alert-danger rounded">${tags[i]}</li>`
    }
    let data = `
            <div class="col-md-4 text-white">
                        <img class="w-100 mb-2 mt-2" src="${meal.strMealThumb}" alt="">
                        <h1 class="text-center">${meal.strMeal}</h1>
            </div>
            <div class="col-md-8 text-white text-left">
                        <h2>Instructions</h2>
                        <p>${meal.strInstructions}</p>
                        <p><b class="fw-bolder me-3">Area :</b>${meal.strArea}</p>
                        <p><b class="fw-bolder me-3">Category :</b>${meal.strCategory}</p>
                        <h3 class="me-3">Recipes :</h3>
                        <ul class="d-flex list-unstyled flex-wrap" id="recipes">
                        </ul>
                        <h3 class="my-2 mx-1 p-1">Tags :</h3>
                        <ul class="d-flex list-unstyled" id="tags">
                        </ul>
                        <a class="btn btn-success text-white me-2" target="_blank" href="${meal.strSource}">Source</a>
                        <a class="btn btn-danger youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
            </div>
    `
    document.getElementById("rowData").innerHTML = data
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
}

function displayMeals(array) {
    let meals = ""
    for (let i = 0; i < array.length; i++) {
        meals += `
                    <div class="col-md-3 my-3  shadow">
                        <div onclick="getMeal('${array[i].idMeal}')" class="image overflow-hidden shadow rounded position-relative">
                            <img src='${array[i].strMealThumb}' class="w-100 rounded" />
                            <div class="layer d-flex align-items-center justify-content-center">
                                <div class="info p-2 text-center">
                                    <h2>${array[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
        
        `
    }
    document.getElementById("rowData").innerHTML = meals

}

function displayCategories() {
    let c = ""
    for (let i = 0; i < array.length; i++)
        c += `
    <div class="col-md-3 my-3 shadow">
        <div class="image overflow-hidden shadow rounded position-relative">
            <div onclick="filterByCategory('${array[i].strCategory}')">
                <img src='${array[i].strCategoryThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2 text-center">
                            <h4>${array[i].strCategory}</h4>
                            <p>${array[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  `
    document.getElementById("rowData").innerHTML = c
}

async function getCategories(catBy) {
    $(".loading").fadeIn(100)
    cat = await fetch(`https://www.themealdb.com/api/json/v1/1/${catBy}`);
    cat = await cat.json()
    $(".loading").fadeOut(300)
    return cat;
}

async function filterByCategory(cat) {
    $(".loading").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading").fadeOut(300)
}

async function getIngredient(ing) {
    $(".loading").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading").fadeOut(300)
}

function displayIngredients() {
    let ing = ""
    for (let i = 0; i < array.length; i++)
        ing += `
    <div class="col-md-6 col-lg-3 my-3  shadow">
        <div onclick="getIngredient('${array[i].strIngredient}')" class="image shadow rounded position-relative">
            <div class="text-center ">
                <i class="fa-solid fa-bowl-food fa-3x text-success mb-2"></i>
                <h3 class="text-white fw-light">${array[i].strIngredient}</h3>
                <p class="text-white">${array[i].strDescription.split(" ").splice(0,15).join(" ")}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("rowData").innerHTML= ing
}

async function filterByArea(a) {
    $(".loading").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading").fadeOut(300)
}

function displayArea(){
    let a=""
    for(let i=0; i<array.length; i++)
    a += `
    <div class="col-md-3 my-3 shadow">
        <div onclick=(filterByArea('${array[i].strArea}')) class="image shadow rounded position-relative">
            <div class="text-center">
                <i class="fa-solid fa-city text-danger fa-3x mb-2"></i>
                <h3 class="text-white fw-light">${array[i].strArea}</h3>
            </div>
        </div>
    </div>
    `
    document.getElementById("rowData").innerHTML= a
}

$(".nav-list a").click(async(a)=>{
    let link = a.target.getAttribute("data-link")
    document.getElementById("searchData").innerHTML=""
    document.getElementById("rowData").innerHTML=""

    let click = new CustomEvent('click');
    document.querySelector('.x-mark').dispatchEvent(click);

    if(link == "search"){
        document.getElementById("rowData").innerHTML=""
        document.getElementById("searchData").innerHTML =`
        <div class="row">
                    <div class="col-md-6"><input id="searchInput" class="form-control mb-2 bg-black text-muted border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none" placeholder="Search By Name...">
                    </div>
                    <div class="col-md-6">
                        <input  class="form-control bg-black text-muted border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none" type="text" maxlength="1" id="letter" placeholder="Search By First Letter...">
                    </div>
                </div>
        `

        $("#searchInput").keyup((a) => {
            searchName(a.target.value)
        })
        $("#letter").keyup((a) => {
            searchByLetter(a.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }

    if(link =="categories"){
       let c = await getCategories( "categories.php")
        array = c.categories.splice(0, 20);
        displayCategories()
    }

    if(link == "area"){
        let a = await getCategories("list.php?a=list")
        array = a.meals.splice(0 , 20)
        displayArea()
    }

    if(link == "ingredient"){
        let i = await getCategories("list.php?i=list")
        array = i.meals.splice(0 , 20)
        displayIngredients()
    }

    if(link == "contact"){
        document.getElementById("rowData").innerHTML = `
        
        <h2 class="text-center text-white mb-5 fw-light">Contact Us...</h2>
        <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="text" id="userName"  placeholder="Enter Your Name">
            <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-25 d-none" id="alretName">
                <p class="mb-0">Special Characters and Numbers not allowed</p>
            </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="email" id="userEmail" placeholder="Enter Email">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" id="alertEmail">
            <p class="mb-0">Enter valid email. *Ex: xxx@yyy.zzz</p>
        </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1 " type="tel" id="userPhone" placeholder="Enter Phone">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" id="alertPhone">
            <p class="mb-0">Enter valid Phone Number</p>
        </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1"  id="userAge" placeholder="Enter Age">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" id="alertAge">
            <p class="mb-0">Enter valid Age</p>
        </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="password" id="userPassword" placeholder="Enter Password">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" id="alertPassword">
            <p class="mb-0">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>
        </div>
    </div>
   

    <div class="col-md-6 mb-5">
        <div class="form-group">
        <input onkeyup="validation()" class="form-control bg-black text-white border-end-0 border-start-0 border-top-0 rounded-0 text-center shadow-none mb-1" type="password" id="userRepassword" placeholder="Enter Repassword">
        <div class="alert alert-danger bg-opacity-75 rounded-0 text-opacity-50 d-none" id="alertRepassword" >
            <p class="mb-0">Enter valid Repassword</p>
        </div>
        </div>
    </div>
    <div class="text-center">
    <button class="btn btn-outline-danger " disabled id="submit" >Submit</button>
    </div>
</div>

        `

        let userName = document.getElementById("userName")
        let userEmail = document.getElementById("userEmail")
        let userPhone = document.getElementById("userPhone")
        let userAge = document.getElementById("userAge")
        let userPassword = document.getElementById("userPassword")
        let userRepassword = document.getElementById("userRepassword")
        // let alertName = document.getElementById("alretName")
        // let alertEmail = document.getElementById("alertEmail")
        // let alertPhone = document.getElementById("alertPhone")
        // let alertAge = document.getElementById("alertAge")
        // let alertPassword = document.getElementById("alertPassword")
        // let alertRepassword = document.getElementById("alertRepassword")
       
        userName.addEventListener("focus", () => {
            nameToached = true
        })
        userEmail.addEventListener("focus", () => {
            emailToached = true
        })
        userPhone.addEventListener("focus", () => {
            phoneToached = true
        })
        userAge.addEventListener("focus", () => {
            ageToached = true
        })
        userPassword.addEventListener("focus", () => {
            passwordToached = true
        })
        userRepassword.addEventListener("focus", () => {
            repasswordToached = true
        })

    }





})



let nameToached = false,
emailToached = false,
phoneToached = false,
ageToached = false,
passwordToached = false,
repasswordToached = false;

function validation() {

    

    // let userName = document.getElementById("userName")
    //     let userEmail = document.getElementById("userEmail")
    //     let userPhone = document.getElementById("userPhone")
    //     let userAge = document.getElementById("userAge")
    //     let userPassword = document.getElementById("userPassword")
    //     let userRepassword = document.getElementById("userRepassword")
        // let alertName = document.getElementById("alertName")
        // let alertEmail = document.getElementById("alertEmail")
        // let alertPhone = document.getElementById("alertPhone")
        // let alertAge = document.getElementById("alertAge")
        // let alertPassword = document.getElementById("alertPassword")
        // let alertRepassword = document.getElementById("alertRepassword")

       

        if (nameToached) {
            if (validateName()) {
                userName.classList.remove("is-invalid")
                userName.classList.add("is-valid")
                // alertName.classList.replace("d-block", "d-none")
    
            } else {
                userName.classList.replace("is-valid", "is-invalid")
                // alertName.classList.replace("d-none", "d-block")
            }
        }
    
        if (emailToached) {
            if (ValidateEmail()) {
                userEmail.classList.remove("is-invalid")
                userEmail.classList.add("is-valid")
                alertEmail.classList.replace("d-block", "d-none")
            } else {
                userEmail.classList.replace("is-valid", "is-invalid")
                alertEmail.classList.replace("d-none", "d-block")
            }
        }
    
        if (phoneToached) {
            if (validatePhone()) {
                userPhone.classList.remove("is-invalid")
                userPhone.classList.add("is-valid")
                alertPhone.classList.replace("d-block", "d-none")
            } else {
                userPhone.classList.replace("is-valid", "is-invalid")
                alertPhone.classList.replace("d-none", "d-block")
            }
        }
    
        if (ageToached) {
            if (ValidataAge()) {
                userAge.classList.remove("is-invalid")
                userAge.classList.add("is-valid")
                alertAge.classList.replace("d-block", "d-none")
            } else {
                userAge.classList.replace("is-valid", "is-invalid")
                alertAge.classList.replace("d-none", "d-block")
            }
        }
    
        if (passwordToached) {
            if (ValidatePassword()) {
                userPassword.classList.remove("is-invalid")
                userPassword.classList.add("is-valid")
                alertPassword.classList.replace("d-block", "d-none")
            } else {
                userPassword.classList.replace("is-valid", "is-invalid")
                alertPassword.classList.replace("d-none", "d-block")
            }
        }
    
        if (repasswordToached) {
            if (ValidateRepassword()) {
                userRepassword.classList.remove("is-invalid")
                userRepassword.classList.add("is-valid")
                alertRepassword.classList.replace("d-block", "d-none")
            } else {
                userRepassword.classList.replace("is-valid", "is-invalid")
                alertRepassword.classList.replace("d-none", "d-block")
            }
        }


    if (validateName() && ValidateEmail() && validatePhone() && ValidataAge() && ValidatePassword() && ValidateRepassword()) {
        document.getElementById("submit").removeAttribute("disabled")
    } else {
        document.getElementById("submit").setAttribute("disabled", "true")
    }

}


function validateName() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}

function ValidateEmail() {
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(userEmail.value)
}

function validatePhone() {
    return /^(0020|01)[0125][0-9]{8}$/.test(userPhone.value)
}

function ValidataAge() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function ValidatePassword() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function ValidateRepassword() {
    return userPassword.value == userRepassword.value
}
