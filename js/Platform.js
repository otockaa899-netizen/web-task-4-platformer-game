class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#8B4513'; // Коричневый цвет для платформ
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Текстура травы на верхней части платформы
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, this.y, this.width, 5);
        
        // Детали платформы
        ctx.fillStyle = '#A0522D';
        for (let i = 0; i < this.width; i += 20) {
            ctx.fillRect(this.x + i, this.y, 2, this.height);
        }
    }
}