const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1366
canvas.height = 808
c.fillRect(0,0, canvas.width,canvas.height);

const gravity = 0.7
const background = new Sprite({ 
    position: {
        x:0,
        y:0
    },
    imageSrc: './Texture/chercz2.jpg'
   
})


const tree2 = new Sprite({ 
    position: {
        x:-190,
        y:-340

    },
    imageSrc: './Texture/8.png'
})



const player = new Knights ({
    position: {
    x: 140, 
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0 ,
        y: 0
    },
    imageSrc: './Kgt/_Idle.png',
    framesMax: 10,
    scale:4,
    offset:{
        x:180,
        y:164
    },
    sprites:{
        idle:{
            imageSrc: './Kgt/_Idle.png',
            framesMax: 10,
        },
        sprint:{
            imageSrc: './Kgt/_Run.png',
            framesMax: 10,
            
        },
        jump:{
            imageSrc: './Kgt/_Jump.png',
            framesMax: 3,
            
        },
        fall:{
            imageSrc: './Kgt/_Fall.png',
            framesMax: 3,
            
        },
        hit:{
            imageSrc: './Kgt/_Hit.png',
            framesMax: 6,
            
        },
        takeHit:{
            imageSrc: './Kgt/Takewing.png',
            framesMax: 4,
            
        },
        death:{
            imageSrc: './Kgt/_Death.png',
            framesMax: 10,
            
        }
    },
    attackBox: {
        offset: {
            x: 60,
            y: 10
        },
        width: 190,
        height: 50
    }
})


const enemy = new Knights ({
    position: {
    x: 1080, 
    y: 210
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './Kgt2/Idle.png',
    framesMax: 4,
    scale:3,
    offset:{
        x:170,
        y:150
    },
    sprites:{
        idle:{
            imageSrc: './Kgt2/Idle.png',
            framesMax: 4,
        },
        sprint:{
            imageSrc: './Kgt2/Walk.png',
            framesMax: 4,
            
        },
        jump:{
            imageSrc: './Kgt2/Walk.png',
            framesMax: 4,
            
        },
        fall:{
            imageSrc: './Kgt2/Walk.png',
            framesMax: 4,
            
        },
        hit:{
            imageSrc: './Kgt2/Attack1.png',
            framesMax: 8,
            
        },
        takeHit:{
            imageSrc: './Kgt2/takeHit.png',
            framesMax: 4,
            
        },
        death:{
            imageSrc: './Kgt2/Death.png',
            framesMax: 4,
            
        }
    },
    attackBox: {
        offset: {
            x: -160,
            y: 20
        },
        width: 190,
        height: 50
    }
    
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }

} 


decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    tree2.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
   

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('sprint')
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('sprint')
    } else {
        player.switchSprite('idle')
    }
    //jumping 
    if (player.velocity.y < 0 ){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0 ){
        player.switchSprite('fall')
    }

    //enemy movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('sprint')
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
       enemy.switchSprite('sprint')
    }else {
        enemy.switchSprite('idle')}

         //jumping 
    if (enemy.velocity.y < 0 ){
        enemy.switchSprite('jump')
    }else if (enemy.velocity.y > 0 ){
        enemy.switchSprite('fall')
    }


    //detect for collision 
    if (rectangularCollision({
        rectangle1:player,
        rectangle2:enemy
    }) &&
        player.isAttacking && player.framesCurrent === 2
    ){
        enemy.takeHit()
        player.isAttacking = false
        document.querySelector("#enemyHealth").style.width = enemy.health + '%'
    }
    // miss one for enemy
    if (player.isAttacking && player.framesCurrent === 2) {
        player.isAttacking = false}

        
    if ( rectangularCollision({
        rectangle1:enemy,
        rectangle2:player
    }) &&
        enemy.isAttacking && enemy.framesCurrent === 1
    ){
        player.takeHit()
        enemy.isAttacking = false
        document.querySelector("#playerHealth").style.width = player.health + '%'
    }
    if (enemy.isAttacking && enemy.framesCurrent === 1) {
        enemy.isAttacking = false }
    
    // end game based on health
    if (enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player,enemy,timerId})
    }

} 

animate()

window.addEventListener('keydown', (event) => { console.log(event.key)
    if(!player.dead) {
    switch (event.key){
        case 'd':
         keys.d.pressed = true
         player.lastKey = 'd'
         break
        case 'a':
         keys.a.pressed = true
         player.lastKey = 'a'
         break
        case 'w':
         player.velocity.y = -23
         break
        case ' ':
         player.attack()
         break
     }
    }
   //enenmy movements
    if(!enemy.dead) {
    switch (event.key) {
        case 'ArrowRight':
         keys.ArrowRight.pressed = true
         enemy.lastKey = 'ArrowRight'
         break
        case 'ArrowLeft':
         keys.ArrowLeft.pressed = true
         enemy.lastKey = 'ArrowLeft'
         break
        case 'ArrowUp':
         enemy.velocity.y = -20
         break
        case 'ArrowDown':
         enemy.attack()
         break
        } 
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
         keys.d.pressed = false
         break
        case 'a':
         keys.a.pressed = false
         break
    }    
    
    
    switch (event.key){
        case 'ArrowRight':
         keys.ArrowRight.pressed = false
         break
        case 'ArrowLeft':
         keys.ArrowLeft.pressed = false
         break
    }
    
    
})

