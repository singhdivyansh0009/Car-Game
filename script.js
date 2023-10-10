    let score = document.querySelector('.score');
    let startScreen = document.querySelector('.startScreen');
    let gameArea = document.querySelector('.gameArea');
    let vedio = document.querySelector('.vedio');
    const key = {'ArrowUp':false,'ArrowDown':false,'ArrowLeft':false,'ArrowRight':false};
    const backgroundAudio = document.getElementById('backgroundAudio');
    const gameOverAudio = document.getElementById('gameOverAudio');
    startScreen.addEventListener('click',start);
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);
 
   let player = {start:false, speed:4 , score:0, level:1, highscore:0};
   
    function keyDown(e){
        e.preventDefault(); 
        key[e.key] = true;
        // console.log(key);
        // console.log(e.key);
    }
    function keyUp(e){
        e.preventDefault();
        key[e.key] = false;
        // console.log(key);
        // console.log(e.key);
    }

    function isCollide(a,b){
           carA = a.getBoundingClientRect();
           carB = b.getBoundingClientRect();
           return !((carA.bottom < carB.top)||(carA.top > carB.bottom)||
           (carA.left > carB.right)||(carA.right < carB.left));
    }
    function moveRoadline(){
        let line = document.querySelectorAll('.roadline');
        // console.log('called');
        line.forEach(function(item){
            if(item.y >= 700)
              item.y-=750;
            item.y += (player.speed+player.level);
            item.style.top = item.y +'px';
        })
    }
    function endGame(){
        player.start = false;
        // console.log(player.score);
        startScreen.innerText = "GAME OVER\n YOUR SCORE : " + player.score+"\nCLICK AGAIN TO RESTART";
        startScreen.classList.remove('hide');
        // pause on collision
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        gameOverAudio.play();
1
        // To save the high score:
        const retrievedHighScore = sessionStorage.getItem('highscore');
        if(retrievedHighScore < player.score) 
        {
            console.log(vedio);
            localStorage.setItem('highscore',player.score);
            vedio.classList.remove ('hide');
            setInterval(()=>{
                vedio.classList.add('hide')
            },10000)
            
            console.log(vedio);
            // video.classList.add = 'active';

        }
    }
    function moveEnemy(car){
        let enemyCar = document.querySelectorAll('.enemy');
        // console.log('called');
        enemyCar.forEach(function(item){
           if(isCollide(car,item))
                endGame();
            if(item.y >= 700)
            {
              item.y = -300;
              item.style.left = Math.floor(Math.random()*350)+'px';
            }
            item.y += (player.speed+player.level); 
            // console.log(player.speed+player.level);
            item.style.top = item.y +'px';
        })
    }
    
    function gameplay(){
        let  car = document.querySelector('.car');
        let scoreArea = document.querySelector('.score');
        if(player.start){
            moveRoadline();
            moveEnemy(car);
            // console.log('game started');
            if(key.ArrowUp){ player.y -= player.speed;}
            if(key.ArrowDown){ player.y += player.speed;}
            if(key.ArrowLeft){ player.x -= player.speed;}
            if(key.ArrowRight){ player.x += player.speed;}

            /*for bounding the car inside the road*/
            if(player.y<5){player.y = 5;}
            if(player.x<5){player.x = 5;}
            if(player.x >345){player.x = 345;}
            if(player.y >705){player.y = 705;}

            /*for changing the position of car*/
            car.style.top = player.y + "px";
            car.style.left = player.x + "px";
            // console.log(player.y);

            /* for changing player score */
            player.score++;
            scoreArea.innerText = "HIGH SCORE:" + player.highscore + "\nSCORE : "+ player.score +"\nLEVEL : "+ player.level; 
            // console.log(player.score);
             if(player.score%1000==0) player.level++;  // to inrease the level for 1000 multiples
            window.requestAnimationFrame(gameplay);
        }
        else{
            gameArea.innerHTML = '';
        }
        
    }

    function start(){
       player.start=true;
       player.score=0;
       // Play background music
       backgroundAudio.play();
       const retrievedHighScore = localStorage.getItem('highscore');
       player.highscore = retrievedHighScore;
       !retrievedHighScore ? sessionStorage.setItem('highscore',0): sessionStorage.setItem('highscore',retrievedHighScore);
       // console.log('High Score:', retrievedHighScore);

       /* To create lines on road */
       for(let x = 0; x <= 5; x++)
       {
       let roadline = document.createElement('div');
       roadline.setAttribute('class','roadline');
       roadline.y = (x*150);
       roadline.style.top = roadline.y +'px';
       gameArea.appendChild(roadline);
       }

       /*to create car */
       let  car = document.createElement('div');
       car.setAttribute('class','car');
       gameArea.appendChild(car);
       let frontMirror = document.createElement('div');
       frontMirror.setAttribute('class','frontMirror');
    //    console.log(frontMirror);
       car.appendChild(frontMirror);
       let rearMirror = document.createElement('div');
       rearMirror.setAttribute('class','rearMirror');
       car.appendChild(rearMirror);

       startScreen.classList.add('hide');

       player.y= car.offsetTop;
       player.x = car.offsetLeft;
       /* To create emeny Car */
       for(let x = 0; x <= 2; x++)
       {
       let enemyFrontMirror = document.createElement('div');
       enemyFrontMirror.setAttribute('class','frontMirror');
       let enemyRearMirror = document.createElement('div');
       enemyRearMirror.setAttribute('class','rearMirror');
       let enemyCar = document.createElement('div');
       enemyCar.setAttribute('class','enemy');
       enemyCar.appendChild(enemyFrontMirror);
       enemyCar.appendChild(enemyRearMirror);
       enemyCar.y = ((x+1)*350)*-1;
       enemyCar.style.top = enemyCar.y +'px';
       enemyCar.style.left = Math.floor(Math.random()*350)+'px';
       enemyCar.style.background = 'blue';
       gameArea.appendChild(enemyCar);
       }
       window.requestAnimationFrame(gameplay);
    }