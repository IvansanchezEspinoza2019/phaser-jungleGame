function countCoins(player, coin, score, scoreText){
    /* Cuenta las monedas */
    coin.disableBody(true, true);
    score +=10
    scoreText.setText('SCORE ' + score);
}

function enemyCount(player, enemy, vida){
    /* det6ecta los atacques de enemigos*/
    if(!player.inmune){
        vida-=10
        player.inmune = true
        waitUntileNextHit(player)
    }
}

function printHealth(health, vida){
     /* cambia el frame del sprite de vida*/
    if(vida >= 60){
        health.setFrame(5)
    }else if(vida >= 50){
        health.setFrame(4)
    }else if(vida >= 40){
        health.setFrame(3)
    }else if(vida >= 30){
        health.setFrame(2)
    }else if(vida >= 20){
        health.setFrame(1)
    }else if(vida >= 10){
        health.setFrame(0)
    }else{
        alert("HAS MUERTO <·")
        vida = 60
        location.reload()
    }
}
function waitUntileNextHit(player){
    let inmune = new Promise(resolve => setTimeout(() => 
            resolve(true)
        , 1000))

    inmune.then(function(res){
            if(res){
                player.inmune = false
            }
    })
}

function enemyMove(enemy){
    /* controla el moviemiento de los enemigos*/
    switch(enemy.direction){
        case 1:
            enemy.setVelocityY(75)
            if(enemy.y+50 >maxHeight){
                enemy.setVelocityY(-75)
                enemy.direction = -1;
            }
            break;
        case -1:
            enemy.setVelocityY(-75)
             if(enemy.y-50 <0){
                enemy.setVelocityY(75)
                enemy.direction = 1;
            }
            break;
        defult:
            break;
    }

}

    function enemyColider(enemy, platform){
        if(enemy.direction == -1){
            enemy.y = enemy.y + 10
            enemy.direction = 1
        }
        else{
            enemy.y = enemy.y - 10
            enemy.direction = -1
        }
        enemyMove(enemy)
    }

function portalFunc(player, portal, portalesCount, portalesText){
    portal.disableBody(true, true)
    portalesCount+=1
    portalesText.setText('LLAVES ' + portalesCount);
}