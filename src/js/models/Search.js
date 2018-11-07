import axios from "axios";



export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = "http://cors-anywhere.herokuapp.com/";
        const key = "4c73a2c2163a688f813af4b4904eaf95";
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);
        } catch (err) {
            console.log(err);
        }

    }



}