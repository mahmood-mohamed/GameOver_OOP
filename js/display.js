// Display.js
export class Display {
    constructor() {
        this.gamesListElement = document.getElementById('games-list');
        this.detailsElement = document.getElementById('details');
        this.gamesSection = document.getElementById('games');
    }

    // دالة لاقتطاع الوصف إذا كان يحتوي على أكثر من 15 كلمة
    truncateDescription(description) {
        const words = description.split(' '); // تقسيم النص إلى كلمات
        if (words.length > 15) {
            return words.slice(0, 15).join(' ') + '...'; // إظهار أول 15 كلمة وإضافة ثلاث نقاط في النهاية
        }
        return description; // إذا كانت أقل من 15 كلمة، إرجاع النص كما هو
    }

    showGames(games, onClickGame) {
        const gameCards = games.map(game => {
            const card = document.createElement('div');
            card.className = 'gameCard col-sm-6 col-lg-3';
            card.innerHTML = `<div class="card h-100 bg-transparent text-light">
                    <div class="card-body">
                        <img class="card-img-top mb-2" src="${game.thumbnail}" alt="${game.title}" />
                        <div class="titleInfo d-flex justify-content-between align-items-center">
                            <h4 class="card-title h6 fw-500">${game.title}</h4>
                            <span class="badge bg-primary fw-700">Free</span>
                        </div>
                        <p class="card-text text-center text-secondary">${this.truncateDescription(game.short_description)}</p>
                    </div>
                    <div class="card-footer d-flex align-item-center justify-content-between flex-wrap gap-2">
                        <span class="badge bg-secondary fw-700">${game.genre}</span>
                        <span class="badge bg-secondary fw-700">${game.platform}</span>
                    </div>
                </div>`;
            card.addEventListener('click', () => onClickGame(game.id));
            return card;
        });

        this.gamesListElement.innerHTML = '';
        gameCards.forEach(card => this.gamesListElement.appendChild(card));
    }

    showDetails(game) {
        document.getElementById('game-details').innerHTML = `
            <div class="col-md-4">
                <img src="${game.thumbnail}" class="w-100" alt="${game.title}">
            </div>
            <div class="col-md-8">
                <h2 class="h4">Title: ${game.title}</h2>
                <h3 class="h6">Category: <span class="badge bg-info text-dark">${game.genre}</span></h3>
                <h3 class="h6">Platform: <span class="badge bg-info text-dark">${game.platform}</span></h3>
                <h3 class="h6">Status: <span class="badge bg-info text-dark">${game.status}</span></h3>
                <p class="py-2">${this.truncateDescription(game.description)}</p>
                <a href="${game.game_url}" target="_blank" class="btn btn-outline-warning text-light fw-500 mb-2">Show Game</a>
            </div>`;

        this.detailsElement.classList.remove('d-none');
        this.gamesSection.classList.add('d-none');
    }

    hideDetails() {
        this.detailsElement.classList.add('d-none');
        this.gamesSection.classList.remove('d-none');
    }
}
