class Game {
    constructor(canvas, ctx, scoreElement, levelElement) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.scoreElement = scoreElement;
        this.levelElement = levelElement;
        
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.player = null;
        this.platforms = [];
        this.flowers = [];
        this.ants = [];
        
        this.score = 0;
        this.level = 1;
        this.flowersToCollect = 7;
        this.isRunning = false;
        this.isPaused = false;
        this.animationId = null;
        
        this.inputHandler = new InputHandler();
        
        console.log('Game instance created');
    }
    
    init() {
        console.log('Initializing game level ' + this.level);
        this.createPlayer();
        this.createLevel();
        this.updateUI();
    }
    
    createPlayer() {
        this.player = new Player(this.width / 2, 100, 30, 30);
        console.log('Player created');
    }
    
    createLevel() {
        // Очищаем предыдущие объекты
        this.platforms = [];
        this.flowers = [];
        this.ants = [];
        
        // Базовые платформы
        this.platforms.push(new Platform(0, this.height - 40, this.width, 40));
        
        if (this.level === 1) {
            // Уровень 1 - 6 платформ
            this.platforms.push(new Platform(100, 350, 150, 20));
            this.platforms.push(new Platform(400, 300, 150, 20));
            this.platforms.push(new Platform(200, 250, 150, 20));
            this.platforms.push(new Platform(500, 200, 150, 20));
            this.platforms.push(new Platform(150, 150, 150, 20));
            this.platforms.push(new Platform(450, 100, 150, 20));
            
            // Цветы для уровня 1
            this.flowers.push(new Flower(150, 320, 'daisy'));
            this.flowers.push(new Flower(450, 270, 'rose'));
            this.flowers.push(new Flower(250, 220, 'peony'));
            this.flowers.push(new Flower(550, 170, 'forgetmenot'));
            this.flowers.push(new Flower(200, 120, 'daisy'));
            this.flowers.push(new Flower(500, 70, 'rose'));
            this.flowers.push(new Flower(300, 170, 'peony'));
            
            // Муравьи для уровня 1 (двигаются по платформам)
            this.ants.push(new Ant(150, 330, 25, 25, 100, 350, 150)); // на первой платформе
            this.ants.push(new Ant(450, 280, 25, 25, 400, 300, 150)); // на второй платформе
            
        } else if (this.level === 2) {
            // Уровень 2 - 6 платформ (другой layout)
            this.platforms.push(new Platform(50, 380, 120, 20));
            this.platforms.push(new Platform(300, 320, 120, 20));
            this.platforms.push(new Platform(550, 280, 120, 20));
            this.platforms.push(new Platform(200, 220, 120, 20));
            this.platforms.push(new Platform(450, 180, 120, 20));
            this.platforms.push(new Platform(100, 120, 120, 20));
            
            // Цветы для уровня 2
            this.flowers.push(new Flower(100, 350, 'daisy'));
            this.flowers.push(new Flower(350, 290, 'rose'));
            this.flowers.push(new Flower(600, 250, 'peony'));
            this.flowers.push(new Flower(250, 190, 'forgetmenot'));
            this.flowers.push(new Flower(500, 150, 'daisy'));
            this.flowers.push(new Flower(150, 90, 'rose'));
            
            // Муравьи для уровня 2 (больше и сложнее)
            this.ants.push(new Ant(80, 360, 25, 25, 50, 380, 120));
            this.ants.push(new Ant(330, 300, 25, 25, 300, 320, 120));
            this.ants.push(new Ant(580, 260, 25, 25, 550, 280, 120));
        }
        
        this.flowersToCollect = this.level === 1 ? 7 : 6;
        console.log('Level ' + this.level + ' created with ' + this.flowers.length + ' flowers and ' + this.ants.length + ' ants');
    }
    
    update() {
        if (this.isPaused) return;
        
        // Обновление игрока
        this.player.update(this.inputHandler.keys);
        this.player.applyGravity();
        // Проверка коллизий с платформами
        this.player.isOnGround = false;
        this.platforms.forEach(platform => {
            if (Collision.check(this.player, platform)) {
                Collision.resolve(this.player, platform);
            }
        });
        
        // Проверка коллизий с цветами
        for (let i = this.flowers.length - 1; i >= 0; i--) {
            if (Collision.check(this.player, this.flowers[i])) {
                this.flowers.splice(i, 1);
                this.score++;
                this.updateUI();
                
                if (this.score >= this.flowersToCollect) {
                    if (this.level === 1) {
                        window.showLevelComplete();
                    } else {
                        window.showWin();
                        this.stop();
                    }
                    return;
                }
            }
        }
        
        // Проверка коллизий с муравьями
        for (let ant of this.ants) {
            ant.update();
            if (Collision.check(this.player, ant)) {
                window.showGameOver();
                this.stop();
                return;
            }
        }
        
        // Проверка падения
        if (this.player.y > this.height) {
            window.showGameOver();
            this.stop();
        }
    }
    
    render() {
        // Очистка
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Фон с небом и землей
        this.drawBackground();
        
        // Отрисовка объектов
        this.platforms.forEach(p => p.draw(this.ctx));
        this.flowers.forEach(f => f.draw(this.ctx));
        this.ants.forEach(a => a.draw(this.ctx));
        this.player.draw(this.ctx);
        
        // Облака на заднем плане
        this.drawClouds();
    }
    
    drawBackground() {
        // Небо
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Солнце
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(700, 80, 40, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Деревья на заднем плане
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(50, 300, 20, 160);
        this.ctx.fillRect(650, 250, 20, 210);
        
        this.ctx.fillStyle = '#228B22';
        this.ctx.beginPath();
        this.ctx.arc(60, 280, 40, 0, Math.PI * 2);
        this.ctx.arc(40, 300, 35, 0, Math.PI * 2);
        this.ctx.arc(80, 300, 35, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(660, 230, 50, 0, Math.PI * 2);
        this.ctx.arc(630, 250, 45, 0, Math.PI * 2);
        this.ctx.arc(690, 250, 45, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // Облако 1
        this.ctx.beginPath();
        this.ctx.arc(100, 60, 25, 0, Math.PI * 2);
        this.ctx.arc(130, 50, 30, 0, Math.PI * 2);
        this.ctx.arc(160, 60, 25, 0, Math.PI * 2);
        this.ctx.arc(130, 70, 20, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Облако 2
        this.ctx.beginPath();
        this.ctx.arc(500, 40, 20, 0, Math.PI * 2);
        this.ctx.arc(530, 30, 25, 0, Math.PI * 2);
        this.ctx.arc(560, 40, 20, 0, Math.PI * 2);
        this.ctx.arc(530, 50, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Облако 3
        this.ctx.beginPath();
        this.ctx.arc(300, 80, 22, 0, Math.PI * 2);
        this.ctx.arc(330, 70, 27, 0, Math.PI * 2);
        this.ctx.arc(360, 80, 22, 0, Math.PI * 2);
        this.ctx.arc(330, 90, 17, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    gameLoop() {
        this.update();
        this.render();
        
        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }
start() {
        console.log('Game starting...');
        this.isRunning = true;
        this.isPaused = false;
        this.gameLoop();
    }
    
    stop() {
        console.log('Game stopping');
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    restart() {
        this.stop();
        this.score = 0;
        this.level = 1;
        this.init();
        this.start();
    }
    
    nextLevel() {
        console.log('Moving to level 2');
        this.stop();
        this.level = 2;
        this.score = 0;
        this.init();
        this.start();
    }
    
    updateUI() {
        if (this.scoreElement) {
            this.scoreElement.textContent = 'Цветы: ' + this.score + '/' + this.flowersToCollect;
        }
        if (this.levelElement) {
            this.levelElement.textContent = 'Уровень: ' + this.level;
        }
    }
}