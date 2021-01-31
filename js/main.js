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





//canvas 
class Particle {
    constructor(context, x, y, directionX, directionY, size, color) {
        this.ctx = context
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.originalSize = size
        this.color = color
        this.shrink = Math.random() >= 0.5
    }

    draw () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, Math.PI * 2, false)
        this.ctx.fillStyle = this.color //'#ff006a'
        this.ctx.fill()
    }

    update ({canvas, mouse}) {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY
        }

        //collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy)
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10
                this.y += 10
            }
            if (mouse.x > this.x && this.x > this.size * 10 ){
                this.x -= 10
                this.y -= 10
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10
                this.y -= 10
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10
                this.y -= 10
            }
            this.directionX = -this.directionX
            this.directionY = -this.directionY
        }
        this.x += this.directionX
        this.y += this.directionY
        
        this.shrinkOrGrow()
        this.draw()
    }

    shrinkOrGrow () {
        const step = 0.05
        const minSize = 0.2 * this.originalSize
        const maxSize = 2 * this.originalSize

        if (this.shrink && this.size - step < minSize) {
            this.shrink = false
        }

        if (!this.shrink && this.size >= maxSize) {
            this.shrink = true
        }

        if (this.shrink && this.size - step > minSize) {
            this.size -= step
        } else {
            this.size += step
        }
    }

    // Visitor pattern so we can achieve O(N) collision detection among eachother
    accept (visitor) {
        visitor.visit(this)
    }
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/180) * (canvas.width/180)
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', (event) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight)
    mouse.radius = ((canvas.height / 180) * (canvas.width/180))
    init()
})

window.addEventListener('click', (e) => {
    let size = (Math.random() * 2) + 1
    let x = e.x
    let y = e.y
    let directionX = (Math.random() * 10) / 20
    let directionY = (Math.random() * 10) / 20
    const nodeColor = 'rgba(0,0,0,0.75)'
    particlesArray.push(new Particle(ctx, x, y, directionX, directionY, size, nodeColor))
})

function init () {
    window.particles = particlesArray = []
    let numberOfParticles = (canvas.height * canvas.width) / 7500
    const nodeColor = 'rgba(0,0,0,0.75)'

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        let directionX = (Math.random() * 10) / 20
        let directionY = (Math.random() * 10) / 20
        particlesArray.push(new Particle(ctx, x, y, directionX, directionY, size, nodeColor))
    }
}

function connect () {
    let opacity;
    for (let a = 0; a < particlesArray.length; a+=1) {
        for (let b = a; b < particlesArray.length; b+=1) {
            let distance =
                ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                +((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y))
            
                if (distance < (canvas.width / 10) * (canvas.height/10)) {
                    opacity = 1 - (distance / 50000)
                    ctx.strokeStyle='rgba(0,0,0,'+ opacity +')'
                    ctx.lineWidth = (particlesArray[a].size + particlesArray[b].size) / 8
                    ctx.beginPath()
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                    ctx.stroke()
                }
        }
    }
}

function animate () {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,innerWidth, innerHeight)

    connect()
    for (let i = 0; i < particlesArray.length; i++) {        
        particlesArray[i].update({canvas, mouse})
    }
    
}

init()
animate();

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



