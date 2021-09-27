
var score = 0;
var scoreText;
var endGAME;
var portalesCount = 0
var portalesText
var winer;
var vida = 60;

var maxHeight = 500
var maxWidth = 900

var rootUrl ="https://ivansanchezespinoza2019.github.io/phaser-jungleGame/"
var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:  
    function SceneA(){

        Phaser.Scene.call(this, { key: 'sceneA' });
    },
    restart: function(){
        console.log("Si")
    },
    preload: function(){

        this.load.image("color", rootUrl+"assets/background/plx-1.png");
        this.load.image("back", rootUrl+"assets/background/plx-5.png");
    
        this.load.image("ground", rootUrl+"assets/obstaculos/ground.png");
        this.load.image("obst1", rootUrl+"assets/obstaculos/obs-1.png");
        this.load.image("obst2", rootUrl+"assets/obstaculos/obs-2.png");
        this.load.image("obst3", rootUrl+"assets/obstaculos/obs-3.png");
        this.load.image("obst4", rootUrl+"assets/obstaculos/obs-4.png");
        this.load.image("coin", rootUrl+"assets/coin2.png");
        this.load.spritesheet('dude', rootUrl+"assets/Character/dude.png",
        { frameWidth: 21, frameHeight: 33 });
        this.load.spritesheet('life', rootUrl+"assets/life.png",
        { frameWidth: 28, frameHeight: 7 });
        this.load.spritesheet('enemy', rootUrl+"assets/enemy.png",
        { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('portal', rootUrl+"assets/portal.png",
        { frameWidth: 80, frameHeight: 80 });
    },
    create: function(){
        /* Background */
        this.add.image(450, 250, 'color').setScale(2.5);
        this.add.image(450, 250, 'back').setScale(2.5);

        // plataformas
        platforms = this.physics.add.staticGroup();
        platforms.create(50, 485, 'ground').setScale(2,1).refreshBody();
        platforms.create(430, 370, "ground").setScale(1.4,1).refreshBody();
        platforms.create(800, 300, "ground").setScale(1.4, 1).refreshBody();
        platforms.create(785, 485, 'ground').setScale(2, 1).refreshBody();
        platforms.create(20, 280, 'ground').setScale(2, 1).refreshBody();
        platforms.create(850, 100, 'ground').setScale(0.7, 1).refreshBody();
        platforms.create(280, 100, 'ground').setScale(0.7, 1).refreshBody();
        platforms.create(570, 170, 'ground').setScale(0.7, 1).refreshBody()

        // jugador
        player = this.physics.add.sprite(50, 450, 'dude');
        player.setScale(1.4);
        console.log(player)

        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.inmune = false;

        /* animaciones del personaje */
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player, platforms);
        /* movimiento del personje */
        cursors = this.input.keyboard.createCursorKeys();

        /* Moneda */
        //coin = this.physics.add.sprite(200, 300, 'coin');
        coins = this.physics.add.group({
            key: 'coin',
            repeat: 25,
            setXY: { x: 12, y: 0, stepX: 50 }
        });
    
        /* Valor de rebote */
        coins.children.iterate(function (child) {
            child.setScale(0.7)
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        });
        this.physics.add.collider(coins, platforms);
        /* verifica si se el eprsonje a chocado con algun estrella */
        this.physics.add.overlap(player, coins, countCoins, null, this);


    /* Health */
        health = this.add.sprite(700, 20, 'life', 1); // agrega el frame que necesitamos
        health.setScale(4, 2.5);

        this.anims.create({
            key: 'enemyMove',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
  
        /* enemigos */
        enemy = this.physics.add.group()
        var e = enemy.create(470, 50, "enemy")
        e.setBounce(1);
        e.setCollideWorldBounds(true);
        e.direction = 1
        e.anims.play('enemyMove', true);
        e.setScale(0.7)

        var e2 = enemy.create(750, 100, "enemy")
        e2.setBounce(1);
        e2.setCollideWorldBounds(true);
        e2.direction = 1
        e2.anims.play('enemyMove', true);
        e2.setScale(0.7)

        var e3 = enemy.create(780, 350, "enemy")
        e3.setBounce(1);
        e3.setCollideWorldBounds(true);
        e3.direction = 1
        e3.anims.play('enemyMove', true);
        e3.setScale(0.7)

        var e4 = enemy.create(80, 70, "enemy")
        e4.setBounce(1);
        e4.setCollideWorldBounds(true);
        e4.direction = 1
        e4.anims.play('enemyMove', true);
        e4.setScale(0.7)

        var e5 = enemy.create(280, 480, "enemy")
        e5.setBounce(1);
        e5.setCollideWorldBounds(true);
        e5.direction = 1
        e5.anims.play('enemyMove', true);
        e5.setScale(0.7)

        this.physics.add.overlap(player, enemy, enemyCount, null, this);
        this.physics.add.overlap(enemy, platforms, enemyColider, null, this);


        /* textos */
        scoreText = this.add.text(16, 16, 'SCORE 0', { fontSize: '32px', fill: 'red' });
        endGame = this.add.text(400, 250, { fontSize: '32px', fill: 'red' })
        endGame.visible = false;
        portalesText = this.add.text(250, 16, 'LLAVES 0', { fontSize: '32px', fill: 'black'});
        winer = this.add.text(250, 250, 'HAS PASADO EL NIVEL!!', { fontSize: '32px', fill: 'black'});
        winer.visible = false;
        /* portales */
        portales = this.physics.add.staticGroup();
        var p1 = portales.create(865, 60, 'portal').setScale(0.6)
        var p2 = portales.create(880, 410, 'portal').setScale(0.6)
        var p3 = portales.create(280, 60, 'portal').setScale(0.6)

        this.anims.create({
            key: 'portalMove',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        p1.anims.play('portalMove', true);
        p2.anims.play('portalMove', true);
        p3.anims.play('portalMove', true);
        this.physics.add.overlap(player, portales, portalFunc, null, this);
    },

    update: function(){
        
        if((player.y+(player.height/2+10)) >= maxHeight){
            //endGame.visible = true;
            player.disableBody(true, true)
            endGame.setText("HAS MUERTO")
            alert("Te has caido al vacio!!!")
            player.disableBody(false, false)
            player.x = 50
            player.y = 450
     
            vida = 60
            location.reload()
        }

        if(portalesCount==3){
            winer.visible = true;
            alert("FELICIDADES Has pasado el nivel!!! :)")
            portalesCount = 0
            vida=60
            location.reload()
        }

        printHealth(health)
        /* Movimiento de los enemigos */
        enemy.children.iterate(function(cildren){
            enemyMove(cildren)
        })


        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }
})

var config = {
    type: Phaser.AUTO,
    width: maxWidth,
    height: maxHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ SceneA ]
};

var game = new Phaser.Game(config);

function countCoins(player, coin){
    /* Cuenta las monedas */
    coin.disableBody(true, true);
    score +=10
    scoreText.setText('SCORE ' + score);
}

function enemyCount(player, enemy){
    /* det6ecta los atacques de enemigos*/
    if(!player.inmune){
        vida-=10
        player.inmune = true
        waitUntileNextHit(player)
    }
}

function printHealth(health){
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

function portalFunc(player, portal ){
    portal.disableBody(true, true)
    portalesCount+=1
    portalesText.setText('LLAVES ' + portalesCount);
}
