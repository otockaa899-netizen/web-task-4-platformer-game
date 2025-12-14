class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpForce = 12;
        this.isOnGround = false;
        
        this.color = '#FFD700';
    }
    
    update(keys) {
        // Движение влево/вправо
        if (keys['a'] || keys['ArrowLeft']) {
            this.velocityX = -this.speed;
        } else if (keys['d'] || keys['ArrowRight']) {
            this.velocityX = this.speed;
        } else {
            this.velocityX = 0;
        }
        
        // Прыжок - ИСПРАВЛЕННАЯ СТРОКА
        if ((keys['w'] || keys['ArrowUp'] || keys[' ']) && this.isOnGround) {
            this.velocityY = -this.jumpForce;
            this.isOnGround = false;
        }
        
        // Применение скорости
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Ограничение движения по горизонтали
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > 800) this.x = 800 - this.width;
    }
    
    applyGravity() {
        this.velocityY += 0.5;
        if (this.velocityY > 10) {
            this.velocityY = 10;
        }
    }
    
    draw(ctx) {
        // Тело пчелы
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Полоски
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 5, this.y, 5, this.height);
        ctx.fillRect(this.x + 15, this.y, 5, this.height);
        ctx.fillRect(this.x + 25, this.y, 5, this.height);
        
        // Глаза
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 4, 0, Math.PI * 2);
        ctx.arc(this.x + 25, this.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Крылья
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(this.x - 5, this.y + 10, 8, 5, 0, 0, Math.PI * 2);
        ctx.ellipse(this.x + 35, this.y + 10, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    resetPosition(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isOnGround = false;
    }
}