document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing game...');
    
    // Получаем элементы
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    const startScreen = document.getElementById('startScreen');
    const gameScreen = document.getElementById('gameScreen');
    const pauseScreen = document.getElementById('pauseScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const levelCompleteScreen = document.getElementById('levelCompleteScreen');
    const winScreen = document.getElementById('winScreen');
    
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resumeButton = document.getElementById('resumeButton');
    const restartButton = document.getElementById('restartButton');
    const restartFromGameOver = document.getElementById('restartFromGameOver');
    const restartFromWin = document.getElementById('restartFromWin');
    
    // Кнопки "Главная"
    const mainMenuButton = document.getElementById('mainMenuButton');
    const mainMenuFromPause = document.getElementById('mainMenuFromPause');
    const mainMenuFromGameOver = document.getElementById('mainMenuFromGameOver');
    const mainMenuFromLevelComplete = document.getElementById('mainMenuFromLevelComplete');
    const mainMenuFromWin = document.getElementById('mainMenuFromWin');
    
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const finalScoreElement = document.getElementById('finalScore');
    
    let game = null;

    function startGame() {
        console.log('Start button clicked!');
        
        if (game) {
            game.stop();
        }
        
        game = new Game(canvas, ctx, scoreElement, levelElement);
        game.init();
        
        hideAllScreens();
        gameScreen.classList.remove('hidden');
        
        game.start();
    }

    function returnToMainMenu() {
        console.log('Returning to main menu');
        
        if (game) {
            game.stop();
            game = null;
        }
        
        hideAllScreens();
        startScreen.classList.remove('hidden');
    }

    function hideAllScreens() {
        const screens = [
            startScreen, 
            gameScreen, 
            pauseScreen, 
            gameOverScreen, 
            levelCompleteScreen, 
            winScreen
        ];
        screens.forEach(screen => {
            if (screen) {
                screen.classList.add('hidden');
            }
        });
    }

    function showGameOver() {
        console.log('Game over');
        hideAllScreens();
        if (gameOverScreen) {
            gameOverScreen.classList.remove('hidden');
            finalScoreElement.textContent = 'Собрано цветов: ' + Math.floor(game.score);
        }
    }

    function showLevelComplete() {
        console.log('Level complete');
        hideAllScreens();
        if (levelCompleteScreen) {
            levelCompleteScreen.classList.remove('hidden');
        }
        
        setTimeout(() => {
            if (game) {
                hideAllScreens();
                gameScreen.classList.remove('hidden');
                game.nextLevel();
            }
        }, 2000);
    }

    function showWin() {
        console.log('Game won');
        hideAllScreens();
        if (winScreen) {
            winScreen.classList.remove('hidden');
        }
    }

    // Обработчики событий
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', function() {
            if (game && game.isRunning) {
                game.pause();
                hideAllScreens();
                pauseScreen.classList.remove('hidden');
            }
        });
    }
    
    if (resumeButton) {
        resumeButton.addEventListener('click', function() {
            if (game) {game.resume();
                hideAllScreens();
                gameScreen.classList.remove('hidden');
            }
        });
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', startGame);
    }
    
    if (restartFromGameOver) {
        restartFromGameOver.addEventListener('click', startGame);
    }
    
    if (restartFromWin) {
        restartFromWin.addEventListener('click', startGame);
    }
    
    // Обработчики для кнопок "Главная"
    if (mainMenuButton) {
        mainMenuButton.addEventListener('click', returnToMainMenu);
    }
    
    if (mainMenuFromPause) {
        mainMenuFromPause.addEventListener('click', returnToMainMenu);
    }
    
    if (mainMenuFromGameOver) {
        mainMenuFromGameOver.addEventListener('click', returnToMainMenu);
    }
    
    if (mainMenuFromLevelComplete) {
        mainMenuFromLevelComplete.addEventListener('click', returnToMainMenu);
    }
    
    if (mainMenuFromWin) {
        mainMenuFromWin.addEventListener('click', returnToMainMenu);
    }

    // Глобальные функции
    window.showGameOver = showGameOver;
    window.showLevelComplete = showLevelComplete;
    window.showWin = showWin;

    console.log('Game initialization complete');
});