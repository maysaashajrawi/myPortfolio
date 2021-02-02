// check if there color option in localStorage
let mainColor = localStorage.getItem("color-option");
if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color" , mainColor)

    // remove active class from all Items list
    document.querySelectorAll(".colors-list li").forEach(element=>{
        element.classList.remove("active")
    // add active class to this Item
    if(element.dataset.color === mainColor ){
        element.classList.add("active")
    }
    })


}
// Toggle spin class on Icon 
document.querySelector(".toggle-settings .my-gear").onclick=function(){

    // toggle class function for rotation on self 
    this.classList.toggle("fa-spin");
    // Toggle class function Open On main settings box
    document.querySelector(".settings-box").classList.toggle("open")
}


// switch colors 
const colorsList = document.querySelectorAll(".colors-list li");
// loop in list Items
colorsList.forEach(li=>{
    // click on every list Items 
    li.addEventListener("click" , (e)=>{
        const color = e.target.dataset.color;
        // set color in root
        document.documentElement.style.setProperty("--main-color" , color)
        // add color to localStorage to save it 
        localStorage.setItem("color-option" , color)

      handleActive(e)


    })
})


//select skills selector
let ourSkills = document.querySelector(".skills")
window.onscroll = function(){
   //skills offset Top
    let skillOffsetTop = ourSkills.offsetTop;
    // console.log(skillOffsetTop)
    
    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight
    
    // window inner height

    let windowHeight = this.innerHeight;

    // window scroll top
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop > (skillOffsetTop + skillsOuterHeight - windowHeight)){
        // iterate throw all spans
        let allskills = document.querySelectorAll(".skills-box .skill-progress span");
        allskills.forEach(skill=>{
            skill.style.width = skill.dataset.progress
        })
    }
}
//make the smoth scroll
let allLinks=document.querySelectorAll(".links a");
// function scroll to specific section
function scrollToSpecificSection(elements){
    elements.forEach(element=>{
            elements.forEach(element=>{
                element.addEventListener("click" , (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            })
        })
    
    
    })
})
}
scrollToSpecificSection(allLinks)

//handle active class
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active")
    })
    // add active class to the element it self
    ev.target.classList.add("active")

}

// let activeLink = document.querySelector(".links a");
// handleActive(activeLink)

//toggle menu 
let toggleBtn = document.querySelector(".toggle-menu")

let toggleLinks =document.querySelector(".links")
console.log(toggleLinks)


toggleBtn.onclick=function(e){
    // stop propagation for button 
    e.stopPropagation()
    // Toggle class "menu-active" on Button 
    this.classList.toggle("menu-active")
    // Toggle class "open-menu" On links 
    toggleLinks.classList.toggle("open-menu")
}

// click Anywhere outside menu and toggle m 
document.addEventListener("click" , (e)=>{
    if(e.target !== toggleBtn && e.target !== toggleLinks){
        // check if Menu is open 
        if (toggleLinks.classList.contains("open-menu")){
            // Toggle class "menu-active" on Button 
            toggleBtn.classList.toggle("menu-active")
            // Toggle class "open-menu" On links 
            toggleLinks.classList.toggle("open-menu")
        }
    }
})
// stop propagation for menu

toggleLinks.onclick = function(e){
    e.stopPropagation();
}










