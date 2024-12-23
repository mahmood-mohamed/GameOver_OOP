// Game.js
export class Game {
    constructor(apiHeaders) {
        this.apiHeaders = apiHeaders;
        this.loading = document.getElementById('loading');
    }

    async fetchGames(category) {
        const options = {
            method: 'GET',
            headers: this.apiHeaders
        };

        try {
            this.loading.classList.remove('d-none');  // Show loading

            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
            return await response.json();
            
        } catch (error) {
            this.loading.classList.remove('d-none');  // Show loading
            console.error(error);
            return [];
        } finally {
            this.loading.classList.add('d-none');  // Hide loading
        }
    }

    async fetchGameDetails(id) {
        const options = {
            method: 'GET',
            headers: this.apiHeaders
        };

        try {
            this.loading.classList.remove('d-none');  // Show loading
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            this.loading.classList.add('d-none');  // Hide loading
        }
    }
}
