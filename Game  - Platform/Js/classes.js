class Sprite {
    constructor({position, imageSrc, scale =1, framesMax =1, offset = {x:0, y:0} }){
        this.position = position
        this.width = 50
        this.height = 140
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.offset = offset
          
        //this.scale = scale
    
    }

    draw(){
      //c.fillRect(this.position.x,this.position.y,this.width,this.height)
      c.drawImage(
         this.image,
         this.framesCurrent * (this.image.width / this.framesMax),
         0,
         this.image.width / this.framesMax,
         this.image.height,
         this.position.x - this.offset.x,
         this.position.y - this.offset.y,
         (this.image.width / this.framesMax) * this.scale,
         this.image.height * this.scale
        )
            
    }

    animateFrame(){
        this.framesElapsed++
          if(this.framesElapsed % this.framesHold === 0){
           if (this. framesCurrent < this.framesMax -1) {
               this.framesCurrent++
            }else {
                this.framesCurrent = 0
            }
       }
    }

    update(){
     this.draw()
     this.animateFrame()
    }

}



class Knights extends Sprite {
    constructor({
        position, 
        velocity ,
        offset = {x:0 , y:0 }, 
        imageSrc, 
        framesMax = 1, 
        scale = 1,  
        sprites,
        attackBox = {offset:{}, width: undefined, height: undefined}  }){
        super({ position, imageSrc, framesMax, offset ,scale })

        
        this.velocity = velocity
        this.width = 80
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false
        
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }

 

    update(){
        this.draw()
        if(!this.dead) this.animateFrame()
        
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
     // gravity function for Knights 
        if (this.position.y +this.height +this.velocity.y >= canvas.height - 180){
            this.velocity.y = 0
            this.position.y = 478 
        } else this. velocity.y += gravity

        

    
        
    }

    attack(){
    this.switchSprite('hit')
    this.isAttacking = true
    }
    
    takeHit(){
     this.health -= 20
     if(this.health <=0){
        this.switchSprite('death')
    }else this.switchSprite('takeHit')
    }     
    switchSprite(sprite) {

        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent = this.sprites.death.framesMax -1) this.dead = true
            return}

        if (this.image === this.sprites.hit.image && 
            this.framesCurrent < this.sprites.hit.framesMax -1 ) return

        if (this.image === this.sprites.takeHit.image && 
            this.framesCurrent < this.sprites.takeHit.framesMax -1 ) return


        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image ){
                 this.image = this.sprites.idle.image
                 this.framesMax = this.sprites.idle.framesMax
                 this.framesCurrent = 0}
                break;
            case 'sprint':
                if(this.image !== this.sprites.sprint.image ){
                 this.image = this.sprites.sprint.image
                 this.framesMax = this.sprites.sprint.framesMax
                 this.framesCurrent = 0}
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image ){
                 this.image = this.sprites.jump.image 
                 this.framesMax = this.sprites.jump.framesMax
                 this.framesCurrent = 0}
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image ){
                 this.image = this.sprites.fall.image 
                 this.framesMax = this.sprites.fall.framesMax
                 this.framesCurrent = 0}
                break;
            case 'hit':
                if(this.image !== this.sprites.hit.image ){
                 this.image = this.sprites.hit.image 
                 this.framesMax = this.sprites.hit.framesMax
                 this.framesCurrent = 0}
                break;
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image ){
                 this.image = this.sprites.takeHit.image 
                 this.framesMax = this.sprites.takeHit.framesMax
                 this.framesCurrent = 0}
                break;
            case 'death':
                if(this.image !== this.sprites.death.image ){
                 this.image = this.sprites.death.image 
                 this.framesMax = this.sprites.death.framesMax
                 this.framesCurrent = 0}
                break;
        }
    }
}