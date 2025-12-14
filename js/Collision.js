class Collision {
    static check(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    static resolve(player, platform) {
        // Определяем, с какой стороны произошло столкновение
        const playerBottom = player.y + player.height;
        const platformTop = platform.y;
        const playerTop = player.y;
        const platformBottom = platform.y + platform.height;
        const playerRight = player.x + player.width;
        const platformLeft = platform.x;
        const playerLeft = player.x;
        const platformRight = platform.x + platform.width;
        
        // Определяем глубину проникновения с каждой стороны
        const bottomOverlap = playerBottom - platformTop;
        const topOverlap = platformBottom - playerTop;
        const rightOverlap = playerRight - platformLeft;
        const leftOverlap = platformRight - playerLeft;
        
        // Находим наименьшее перекрытие
        const minOverlap = Math.min(bottomOverlap, topOverlap, rightOverlap, leftOverlap);
        
        // Разрешаем коллизию в зависимости от стороны столкновения
        if (minOverlap === bottomOverlap) {
            // Столкновение сверху (игрок приземляется на платформу)
            player.y = platformTop - player.height;
            player.velocityY = 0;
            player.isOnGround = true;
        } else if (minOverlap === topOverlap) {
            // Столкновение снизу (игрок ударяется головой)
            player.y = platformBottom;
            player.velocityY = 0;
        } else if (minOverlap === rightOverlap) {
            // Столкновение справа
            player.x = platformLeft - player.width;
            player.velocityX = 0;
        } else if (minOverlap === leftOverlap) {
            // Столкновение слева
            player.x = platformRight;
            player.velocityX = 0;
        }
    }
}