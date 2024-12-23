// GameApp.js
import { Game } from './game.js';
import { Display } from './display.js';

export class GameApp {
    constructor() {
        this.apiHeaders = {
            'x-rapidapi-key': 'c6e03e4d3amshf56317c38eff32fp1ba4f1jsn229d3ed62781',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        };
        this.gameService = new Game(this.apiHeaders);
        this.display = new Display();
        this.links = Array.from(document.querySelectorAll('.nav-link'));
        this.closeBtn = document.getElementById('closeBtn');
        this.init();
    }

    init() {
        this.addNavLinkEventListeners();
        this.addCloseButtonListener();
        this.loadGames('mmorpg');
    }

    addNavLinkEventListeners() {
        this.links.forEach(navLink => {
            navLink.addEventListener('click', () => {
                this.loadGames(navLink.textContent);
                this.setActiveLink(navLink);
            });
        });
    }

    setActiveLink(activeLink) {
        this.links.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    addCloseButtonListener() {
        this.closeBtn.addEventListener('click', () => {
            this.display.hideDetails();
        });
    }

    async loadGames(category) {
        const games = await this.gameService.fetchGames(category);
        this.display.showGames(games, this.showGameDetails.bind(this));
    }

    async showGameDetails(id) {
        const game = await this.gameService.fetchGameDetails(id);
        if (game) {
            this.display.showDetails(game);
        }
    }
}
