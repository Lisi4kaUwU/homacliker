// scripts.js
let score = 0;
let pointsPerClick = 1;
const scoreElement = document.getElementById('score');
const clickImage = document.getElementById('click-image');
const rewardMessage = document.getElementById('reward-message');
const rewardsContainer = document.getElementById('rewards');
const shopItems = document.querySelectorAll('.shop-item');
const resetButton = document.getElementById('reset-button');

// Переменные для уровней улучшений
let upgradeLevels = {
    upgrade1: 0,
    upgrade2: 0,
};

// Загрузка данных из Local Storage
if (localStorage.getItem('score')) {
    score = parseInt(localStorage.getItem('score'));
    scoreElement.textContent = score;

    upgradeLevels = JSON.parse(localStorage.getItem('upgradeLevels')) || upgradeLevels;
    updateUpgradeLevels();
    checkRewards(); // Проверка наград на основе загруженного счёта
}

// Обновление кнопок магазина при загрузке страницы
updateShopButtons();

clickImage.addEventListener('click', function() {
    score += pointsPerClick;
    scoreElement.textContent = score;

    // Сохранение текущего количества очков и уровней в Local Storage
    localStorage.setItem('score', score);
    localStorage.setItem('upgradeLevels', JSON.stringify(upgradeLevels));

    checkRewards();
    updateShopButtons(); // Обновляем состояние кнопок магазина
});

// Логика сброса прогресса
resetButton.addEventListener('click', function() {
    // Сброс значений
    score = 0;
    pointsPerClick = 1;
    upgradeLevels = {
        upgrade1: 0,
        upgrade2: 0,
    };

    // Обновление интерфейса
    scoreElement.textContent = score;
    updateUpgradeLevels();
    rewardsContainer.innerHTML = ''; // Очистка наград

    // Удаление данных из Local Storage
    localStorage.removeItem('score');
    localStorage.removeItem('upgradeLevels');

    updateShopButtons();
});

function checkRewards() {
    rewardsContainer.innerHTML = ''; // Очистка контейнера с наградами

    if (score >= 100) {
        addReward('100.png', '100 HomaCoin');
    }
    if (score >= 500) {
        addReward('500.png', '500 HomaCoin');
    }
    if (score >= 1000) {
        addReward('1000.png', '1.000 HomaCoin');
    }
    if (score >= 5000) {
        addReward('5000.png', '5.000 HomaCoin');
    }
    if (score >= 10000) {
        addReward('10000.png', '10.000 HomaCoin');
    }
    if (score >= 100000) {
        addReward('100000.jpg', '100.000 HomaCoin');
    }
    if (score >= 500000) {
        addReward('500000.png', '500.000 HomaCoin');
    }
    if (score >= 1000000) {
        addReward('1м.png', '1.000.000 HomaCoin');
    }
    if (score >= 10000000) {
        addReward('10м.png', '10.000.000 HomaCoin!');
    }
}

function addReward(imageSrc, rewardText) {
    const rewardItem = document.createElement('div');
    rewardItem.className = 'reward-item';

    const rewardImage = document.createElement('img');
    rewardImage.src = imageSrc;
    rewardImage.alt = rewardText;

    const rewardLabel = document.createElement('p');
    rewardLabel.textContent = rewardText;

    rewardItem.appendChild(rewardImage);
    rewardItem.appendChild(rewardLabel);

    rewardsContainer.appendChild(rewardItem);
}

function updateShopButtons() {
    shopItems.forEach(item => {
        const cost = parseInt(item.getAttribute('data-cost'));
        const value = parseInt(item.getAttribute('data-value'));
        const upgradeType = item.getAttribute('data-upgrade');
        const maxLevel = parseInt(item.getAttribute('data-max-level'));
        const button = item.querySelector('.buy-button');

        if (score >= cost && upgradeLevels[`upgrade${upgradeType}`] < maxLevel) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }

        button.addEventListener('click', function() {
            if (score >= cost && upgradeLevels[`upgrade${upgradeType}`] < maxLevel) {
                score -= cost;
                scoreElement.textContent = score;
                localStorage.setItem('score', score);

                pointsPerClick += value;
                upgradeLevels[`upgrade${upgradeType}`]++;
                updateUpgradeLevels();

                localStorage.setItem('upgradeLevels', JSON.stringify(upgradeLevels));
                updateShopButtons();
            }
        });
    });
}

function updateUpgradeLevels() {
    document.getElementById('upgrade1-level').textContent = upgradeLevels.upgrade1;
    document.getElementById('upgrade2-level').textContent = upgradeLevels.upgrade2;
}
