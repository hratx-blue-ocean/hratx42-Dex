const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.height =55;
canvas.width=42;
let x =10
let y = 10
let dx =1
let dy =1
let readus =1
let pointer =0;
let x1 =10
let y1 = 24
let dx1 =1
let dy1 =1
let pointer1 =0;
let x2 =10
let y2 = 43
let dx2 =1
let dy2 =1
let pointer2 =0;
function animation(){
        pointer++
           
    
    requestAnimationFrame(animation);
    //c.clearRect(0 ,0,innerWidth,innerHeight)
            c.beginPath()
    
    c.arc(x ,y,readus,0,Math.PI*2, false)
    c.fillStyle = 'black'
    c.fill()
    c.strokeStyle ='black'
    c.stroke()
   if(pointer < 20 ){
    x =x+dx
    }
    if(pointer > 20 && pointer <30){
    y =y +dy
    }
    if(pointer >30 && pointer <50){
        x =x-dx
    }
    if(pointer > 50 && pointer < 60){
        y =y -dy
    }
    if(pointer > 60){
         x =10
         y = 10
        pointer =0
    }


}

       
        function animation1(){
            console.log('hi')
            pointer1++
           
        requestAnimationFrame(animation1);
       // c.clearRect(0 ,0,innerWidth,innerHeight)
                c.beginPath()
        
        c.arc(x1 ,y1,readus,0,Math.PI*2, false)
        c.fillStyle = 'black'
        c.fill()
        c.strokeStyle ='black'
        c.stroke()
        if(pointer1 < 30 ){
            x1 =x1+dx1
            }
            if(pointer1 > 30 && pointer1 <45){
            y1 =y1 +dy1
            }
            if(pointer1 >45 && pointer1 <75){
                x1 =x1-dx1
            }
            if(pointer1 > 75 && pointer1 < 90){
                y1 =y1 -dy1
            }
            if(pointer1 > 90){
                 x1 =10
                 y1 = 24
                pointer1 =0
            }
    
    }
    function animation2(){
        console.log('hi')
        pointer2++
       
    requestAnimationFrame(animation2);
   // c.clearRect(0 ,0,innerWidth,innerHeight)
            c.beginPath()
    
    c.arc(x2 ,y2,readus,0,Math.PI*2, false)
    c.fillStyle = 'black'
    c.fill()
    c.strokeStyle ='black'
    c.stroke()
    if(pointer2 < 20 ){
        x2 =x2+dx2
        }
        if(pointer2 > 20 && pointer2 <30){
        y2 =y2 +dy2
        }
        if(pointer2 >30 && pointer2 <50){
            x2 =x2-dx2
        }
        if(pointer2 > 50 && pointer2 < 60){
            y2 =y2 -dy2
        }
        if(pointer2 > 60){
            x2 =10
            y2 = 43
            pointer2 =0
        }

}
 
 animation() 
 animation1()
 animation2()
        
        
       

