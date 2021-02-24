const apiKey = '20377131-0ebe9e49bfd56e929e88257a9';

export default {
    searchQuery: '',
    page: 1,

    async fetchPictures() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=21&key=${apiKey}`
     try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.hits);
         const mainData = data.hits;
         this.page += 1;
         console.log(mainData);
         return mainData;
    } catch (error) {
        return console.log(error);
    }
    },

    resetPage() {
        this.page = 1;
    },
    get query() {
        return this.searchQuery;
    },

    set query(inputValue) {
        this.searchQuery = inputValue;
    }

}