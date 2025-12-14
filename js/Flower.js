class Flower {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
        this.type = type;
        this.colors = {
            daisy: { center: '#FFD700', petals: '#FFFFFF' },
            rose: { center: '#FF69B4', petals: '#DC143C' },
            peony: { center: '#FF1493', petals: '#FF69B4' },
            forgetmenot: { center: '#FFFF00', petals: '#1E90FF' }
        };
    }
    
    draw(ctx) {
        const color = this.colors[this.type] || this.colors.daisy;
        
        // Стебель
        ctx.fillStyle = '#008000';
        ctx.fillRect(this.x + 8, this.y + 15, 4, 15);
        
        // Лепестки
        ctx.fillStyle = color.petals;
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Центр цветка
        ctx.fillStyle = color.center;
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Листья
        ctx.fillStyle = '#008000';
        ctx.beginPath();
        ctx.ellipse(this.x + 5, this.y + 25, 5, 3, Math.PI / 4, 0, Math.PI * 2);
        ctx.ellipse(this.x + 15, this.y + 25, 5, 3, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}