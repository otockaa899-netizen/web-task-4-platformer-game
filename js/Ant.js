class Ant {
    constructor(x, y, width, height, platformX, platformY, platformWidth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 2;
        this.direction = 1;
        
        // Параметры платформы для движения
        this.platformX = platformX;
        this.platformY = platformY;
        this.platformWidth = platformWidth;
        
        this.color = '#000';
    }
    
    update() {
        // Движение муравья по платформе
        this.x += this.speed * this.direction;
        
        // Изменение направления при достижении края платформы
        if (this.x <= this.platformX) {
            this.direction = 1;
            this.x = this.platformX;
        } else if (this.x + this.width >= this.platformX + this.platformWidth) {
            this.direction = -1;
            this.x = this.platformX + this.platformWidth - this.width;
        }
        
        // Муравей всегда остается на платформе
        this.y = this.platformY - this.height;
    }
    
    draw(ctx) {
        // Тело муравья
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Голова
        ctx.fillRect(this.x - 5, this.y, 10, this.height);
        
        // Глаза
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.x - 2, this.y + 5, 2, 0, Math.PI * 2);
        ctx.arc(this.x - 2, this.y + 15, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Ноги
        ctx.fillStyle = this.color;
        for (let i = 0; i < 3; i++) {
            // Левые ноги
            ctx.fillRect(this.x - 3, this.y + 5 + i * 8, 5, 2);
            // Правые ноги
            ctx.fillRect(this.x + this.width - 2, this.y + 5 + i * 8, 5, 2);
        }
        
        // Усики
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - 5, this.y + 5);
        ctx.lineTo(this.x - 10, this.y);
        ctx.moveTo(this.x - 5, this.y + 8);
        ctx.lineTo(this.x - 12, this.y + 3);
        ctx.stroke();
    }
}