<template>
    <div class="movies-container flex-start">
        <div class="search-filters-container">
            <button class="btn btn-add flex-start-center" @click="goToAddMovie">
                <span>Add movie</span>
                <Add />
            </button>
            <div class="search-filters-flex">
                <div class="search-input-container">
                    <input type="text" id="title" class="search-input" placeholder="Search..." v-model="searchItem" @keyup.enter="applyFilters">
                    <button class="search-btn" id="searchBtn" @click="applyFilters" >
                        <Search />
                    </button>
                </div>
                <div class="filters-container">
                    <div class="flex-start-center">
                        <p class="filters-title">Filters</p>
                        <button class="open-filters" v-if="laptopMobileDevice" @click="toggleFilters" ref="filterBtn">
                            <ChevronUp />
                        </button>
                    </div>
                    <form class="filtersList" :class="{toggleList:hideFilters}">
                        <ul>
                            <li class="filter-item" v-for="filter in filters" :key="filter.inputId">
                                <input type="checkbox" :id="filter.checkboxId" class="filter-checkbox" @click="filter.focusInput">
                                <label :for="filter.for" class="form-check-label">{{ filter.placeholder }}</label>
                                <input :type="filter.type" :id="filter.inputId" class="search-criteria" placeholder="..." v-model="filter.vmodel" @keyup.enter="applyFilters">
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <div class="movie-list-container">
            <v-snackbar v-model="snackbar" class="alert-message">
                You must be logged in to add a movie
                <v-btn class="btn-close" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <div class="logo-container flex-start-center">
                <img src="@/assets/logo-1.png" alt="moviebit">
                <span class="caps">Get your movies </span>
                <span class="lowercaps"> bit by bit</span>
            </div>
            <div class="populate-movies flex-start">
                <div class="movie-card-container" v-for="movie in movies" :key="movie._id">
                    <router-link :to="{ name: 'movie', params: {id: movie._id} }" class="movie-card" :id="movie._id">
                        <div class="movie-image-container">
                            <img :src="movie.Poster" :alt="movie.Title">
                        </div>
                        <div class="flex-between">
                            <p class="movie-details movie-year">{{ movie.Year }}</p>
                            <p class="movie-details movie-rating flex-end">
                                <span>{{ movie.imdbRating }}</span>
                                <Star />
                            </p> 
                        </div>
                        <p class="movie-title">{{ movie.Title }}</p>
                    </router-link>                    
                </div> 
            </div>
            <div class="pagination flex-center">
                <button class="prevPage page" ref="prevPage" @click="goToPrevPage">
                    <ChevronLeft />
                </button>
                <span class="activePage page" ref="activePage">{{ currentPage }}</span>
                <button class="next page" ref="nextPage" @click="goToNextPage">
                    <ChevronRight />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import Add from '@/components/Add.vue';
import Search from '@/components/Search.vue';
import ChevronUp from '@/components/ChevronUp.vue';
import ChevronLeft from '@/components/ChevronLeft.vue';
import ChevronRight from '@/components/ChevronRight.vue';
import Star from '@/components/Star.vue';

import axios from 'axios';
export default {
    data() {
        return {
            snackbar: this.$store.state.snackbar,
            searchByYear: '',
            searchByGenre: '',
            searchByLanguage: '',
            searchByCountry: '',
            filters: [
                {
                    for: "yearBox",
                    name: "yearBox",
                    checkboxId: "yearBox",
                    inputId: "year",
                    placeholder: "Year",
                    applyFilter: this.searchYear,
                    focusInput: this.focusYear,
                    type: 'number'
                },
                {
                    for: "genreBox",
                    name: "genreBox",
                    checkboxId: "genreBox",
                    inputId: "genre",
                    placeholder: "Genre",
                    applyFilter: this.searchGenre,
                    focusInput: this.focusGenre,
                    type: 'text'
                },
                {
                    for: "languageBox",
                    name: "languageBox",
                    checkboxId: "languageBox",
                    inputId: "language",
                    placeholder: "Language",
                    applyFilter: this.searchLanguage,
                    focusInput: this.focusLanguage,
                    type: 'text'
                },
                {
                    for: "countryBox",
                    name: "countryBox",
                    checkboxId: "countryBox",
                    inputId: "country",
                    placeholder: "Country",
                    applyFilter: this.searchCountry,
                    focusInput: this.focusCountry,
                    type: 'text'
                }
            ],
            baseURL: this.$store.state.baseURL,
            movies: [],
            searchItem: '',
            take: 10,
            laptopMobileDevice: false,
            window: {
                width: 0
            },
            hideFilters: false,
            currentPage: this.$store.state.currentPage,
            firstPage: null,
            lastPage: '',
            queryParam: [],
        }
    },
    components: {
        Add, 
        Search,
        ChevronUp,
        ChevronRight,
        ChevronLeft,
        Star        
    },
    computed: {
        prevPage() {
            return this.$refs.prevPage;
        },
        activePage() {
            return this.$refs.activePage;
        },
        nextPage() {
            return this.$refs.nextPage;
        },
        yearCheckbox() {
            return document.querySelector("#yearBox");
        },
        yearInput() {
            return document.querySelector("#year");
        },
        genreCheckbox() {
            return document.querySelector("#genreBox");
        },
        genreInput() {
            return document.querySelector("#genre");
        },
        languageCheckbox() {
            return document.querySelector("#languageBox");
        },
        languageInput() {
            return document.querySelector("#language");
        },
        countryCheckbox() {
            return document.querySelector("#countryBox");
        },
        countryInput() {
            return document.querySelector("#country");
        }
    },
    methods: {
        createQueryParam(title, year, genre, language, country) {
            this.queryParam =[];
            if(title) {
                this.queryParam.push(`&Title=${title}`);
            }
            if(year && this.yearCheckbox.checked) {
                this.queryParam.push(`&Year=${year}`);
            }
            if(genre && this.genreCheckbox.checked) {
                this.queryParam.push(`&Genre=${genre}`);
            }
            if(language && this.languageCheckbox.checked) {
                this.queryParam.push(`&Language=${language}`);
            }
            if(country && this.countryCheckbox.checked) {
                this.queryParam.push(`&Country=${country}`);
            } 
            return this.queryParam.join().replace(/,/g,'').slice(1);
        },
        async populateMovies(currentPage, query) {
            if(!query) {
                await axios.get(`${this.baseURL}/movies?currentPage=${currentPage}&take=${this.take}`).then(response => {
                    this.assignMovies(response);
                });
            } else {
                await axios.get(`${this.baseURL}/movies?${query}&currentPage=${currentPage}&take=${this.take}`).then(response => {
                    this.assignMovies(response);
                });
            } 
        },
        assignMovies(response) {
            this.movies = response.data.movies;
            this.lastPage = response.data.nrOfPages;
        },
        goToPrevPage() {
            this.$store.state.currentPage --;
            const query = this.createQueryParam(this.searchItem, this.searchByYear, this.searchByGenre, this.searchByLanguage, this.searchByCountry);
            this.currentPage = this.$store.state.currentPage;
            this.populateMovies(this.currentPage, query);
            window.scrollTo(0, 420);
        },
        goToNextPage() {
            this.$store.state.currentPage ++;
            this.currentPage = this.$store.state.currentPage;
            const query = this.createQueryParam(this.searchItem, this.searchByYear, this.searchByGenre, this.searchByLanguage, this.searchByCountry);
            this.populateMovies(this.currentPage, query); 
            window.scrollTo(0, 420);
        },
        getIputValues() {
            this.searchByYear = document.querySelector('#year').value;
            this.searchByGenre = document.querySelector('#genre').value;
            this.searchByLanguage = document.querySelector('#language').value;
            this.searchByCountry = document.querySelector('#country').value;
        },
        applyFilters() {
            this.getIputValues();
            this.$store.state.currentPage = 1;
            this.currentPage = this.$store.state.currentPage;            
            const query = this.createQueryParam(this.searchItem, this.searchByYear, this.searchByGenre, this.searchByLanguage, this.searchByCountry);
            this.populateMovies(this.currentPage, query);  
        },
        handleResize() {
            this.window.width = window.innerWidth;
            this.laptopMobileDevice = (this.window.width > 991) ? false : true;
            this.hideFilters = (this.window.width > 991) ? false : true;
            const filterContainer = document.querySelector(".search-filters-flex");
            filterContainer.style.height = (this.window.width > 991) ? "auto" : "80px";
        },
        toggleFilters() {
            const openFiltersBtn = this.$refs.filterBtn;
            const filterContainer = document.querySelector(".search-filters-flex");
            if(!openFiltersBtn.classList.contains('rotate-btn')) {
                openFiltersBtn.classList.add('rotate-btn');
                this.hideFilters = false;
                filterContainer.style.height = "auto";
            } else {
                openFiltersBtn.classList.remove('rotate-btn');
                this.hideFilters = true;
                filterContainer.style.height = "80px";
            }
        },
        focusYear() {
            if(this.yearCheckbox.checked) {
                this.yearInput.focus();
            }
        },
        focusGenre() {
            if(this.genreCheckbox.checked) {
                this.genreInput.focus();
            }
        },
        focusLanguage () {
            if(this.languageCheckbox.checked) {
                this.languageInput.focus();
            }
        },
        focusCountry () {
            if(this.countryCheckbox.checked) {
                this.countryInput.focus();
            }
        },
        goToAddMovie() {
            if(this.$store.state.userIsLogged) {
                this.$store.state.addEdit = 'add';
                this.$router.push('/add');
            } else {
                this.snackbar = true
            }
        }
    },
    created() {
        this.populateMovies(this.currentPage);        
    },
    mounted() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    updated() {
       if (this.currentPage === 1) {
            this.prevPage.disabled = true;
        } else {
            this.prevPage.disabled = false;
        }
        if (this.currentPage === this.lastPage) {
            this.nextPage.disabled = true;
        } else {
            this.nextPage.disabled = false;
        } 
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },    
}
</script>
<style lang="scss">
@import "@/scss/resources.scss";
.movies-container {
    padding: 25px 50px;
    background-image: linear-gradient(to right, $default-color 5%, $secondary-color 95%);
    flex-wrap: wrap;

    .search-filters-container {
        width: 25%;
        padding-right: 50px;

        .search-input-container {
            position: relative;

            .search-input {
                @include border-radius(20px);
                @include font($font-size: 14px, $color: $primary-color);
                border: 2px solid $primary-color;
                background: $third-color;
                padding: 5px 10px;
                margin: 30px 0;
                width: 100%;
                outline: none;

                &::placeholder {
                    color: $primary-color;
                    opacity: 1;
                }
            }
            
            .search-btn {
                @include position(absolute, 37px, 10px, null, null);
                outline: none;

                svg {
                    width: 20px;
                    fill: $primary-color;
                    transition: all 250ms ease;
                }

                @include on_event {
                    svg {
                        @include prefix(transform, scale(1.2, 1.2), webkit moz ms o);
                    }
                }
            }
        }

        .filters-container {
            .filtersList{
                transition: all 250ms ease;
                @include prefix(transform, scale(1, 1), webkit moz ms o);
                transform-origin: top;
            }

            .filters-title {
                @include font($font-size: 24px, $color: $primary-color, $font-weight: 700);
            }

            .open-filters {
                margin: 0 0 5px 20px;
                outline: none;

                svg {
                    @include size(20px, auto);
                    @include prefix(transform, rotate(180deg), webkit moz ms o);
                    color: $primary-color;
                    transition: all 250ms ease;
                }
            }

            .rotate-btn {
                svg {
                    @include prefix(transform, rotate(0deg), webkit moz ms o);
                }
            }

            .filter-item {
                padding: 10px 0;
                position: relative;
                transition: all 250ms ease;

                .form-check-label {
                    @include font($font-size: 18px, $color: $primary-color);
                    position: relative;
                    margin: 0 15px;

                    &::before {
                        @include position(absolute, 4px, null, 0, null);
                        @include size(17px, 17px);
                        @include border-radius(5px);
                        display: block;
                        content: '';
                        background: $third-color;
                        border: 1px solid $primary-color;
                    }
                }

                .filter-checkbox {
                    position: relative;
                    width: 17px;
                    opacity: 0;
                    z-index: 10;

                    &:checked {
                        & ~ .form-check-label::before {
                            background: $third-color url('../assets/check.png') center/10px no-repeat;
                        }

                        & ~ .search-criteria {
                            opacity: 1;
                            width: 40%;
                        }
                    }
                }

                .search-criteria {
                    @include position(absolute, 12px, 0, null, null);
                    @include border-radius(15px);
                    width: 10%;
                    color: $primary-color;
                    background: $third-color;
                    border: 1px solid $primary-color;
                    padding: 0 10px;
                    outline: none;
                    opacity: 0;
                    transition: opacity 250ms ease, width 400ms ease;

                    &::placeholder {
                        color: $primary-color;
                    }
                }
            }

            .toggleList {
                 @include prefix(transform, scale(1, 0), webkit moz ms o);

                .filter-item {
                    @include prefix(transform, scale(1, 0), webkit moz ms o);
                }
            }
        }
    }

    .movie-list-container {
        width: 75%;

        .alert-message.v-snack.v-snack--active.v-snack--bottom .v-snack__wrapper {
            @include font($color: $primary-color, $font-weight: 700, $text-transform: none);
            @include border-radius(10px);
            padding: 15px 30px;
            background: $secondary-color;
        }

        .btn-close {
            @include font($color: $primary-color, $font-weight: 700);

            &.theme--light {
                @include border-radius(10px);
                background-color: transparent;
                border: 1px solid $primary-color;
                padding: 5px 15px;
            }
        }

        .logo-container {
            padding: 0 0 25px;

            .caps {
                padding-right: 10px;
            }
        }

        .populate-movies {
            flex-wrap: wrap;

            .movie-card-container {
                width: 20%;
                padding-right: 15px;

                .movie-card {
                    overflow: hidden;

                    .movie-image-container {
                        @include border-radius(10px);
                        @include size(230px, 100%);
                        overflow: hidden;
                        transition: all 250ms ease-in-out;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    .movie-title {
                        @include font($font-size: 16px, $color: $primary-color, $font-weight: 600);
                        width: 100%;
                        height: 28px;
                        margin: 0;
                        text-overflow: ellipsis; 
                        overflow: hidden;
                        margin: 0 0 15px;
                    }

                    .movie-details {
                        @include font($font-size: 12px, $color: $primary-color, $font-weight: 300);
                        padding-top: 10px;
                        margin: 0;
                        align-items: center;

                        svg {
                            width: 15px;
                            padding-left: 3px;
                        }
                    }

                    @include on_event {
                        .movie-image-container {
                            @include prefix(transform, scale(1.05, 1.05), webkit moz ms o);
                        }
                    }
                }
            }
        }
    }
}

.btn {
    @include font($font-size: 18px, $color: $primary-color, $font-weight: 700);
    outline: none;

    .svg-plus {
        fill: $primary-color;
        width: 25px;
        margin-left: 5px;
        transition: all 250ms ease;
        stroke: $primary-color;
        stroke-width: 2px;

        .cls-2 {
            fill: $default-color;
            stroke: none;
        }
    }

    @include on_event {
        .svg-plus {
            fill: $default-color;

            .cls-2 {
                fill: $primary-color;
            }
        }
    }
}

.pagination {
    align-items: flex-start;

    .page {
        @include font($font-size: 18px, $color: $primary-color);
        padding: 10px;
    }

    button {
        outline: none;
    }

    svg {
        @include size(32px);
        @include border-radius(50%);
        padding: 10px 12px;
        color: $primary-color;
        transition: all 250ms ease;
        border: 1px solid transparent;

        @include on_event {
            border: 1px solid $primary-color;
        }
    }

    button:disabled {
        svg {
            color: $third-color;
            @include on_event {
                border: 1px solid transparent;
            }
        }
    }
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  margin: 0; 
}

@media screen and (max-width: 991px) {
    .movies-container {
        .search-filters-container {
            padding-right: 0;
            width: 100%;

            .search-filters-flex {
                display: flex;
                justify-content: space-between;
                padding: 20px 0;
                transition: all 259ms ease;
            }

            .search-input-container {
                width: 30%;
                order: 2;

                .search-input { 
                    @include font($font-size: 14px, $color: $primary-color);
                    border: 1px solid $primary-color;
                    margin: 0;
                }

                .search-btn {
                    @include position(absolute, 7px, 10px, null, null);
                    
                    svg {
                        width: 18px;
                    }
                }
            }

            .filters-container {
                width: 30%;
                order: 1;

                .filters-title {
                    @include font($font-size: 18px, $color: $primary-color, $font-weight: 700);
                    margin-bottom: 10px;
                }

                .filter-item {
                    .form-check-label {
                        font-size: 16px;
                    }
                }
            }
        }

        .movie-list-container {
            width: 100%;
        }
    }
}

@media screen and (max-width: 767px) {
    .movies-container {
        padding: 25px 15px;

        .movie-list-container {
            .populate-movies {
                .movie-card-container {
                    width: 100%;
                    padding-right: 0;

                    .movie-card {
                        .movie-image-container {
                            height: 500px;
                        }

                        .movie-title {
                            margin: 0 0 30px;
                        }

                        @include on_event {
                            .movie-image-container {
                                @include prefix(transform, scale(1, 1), webkit moz ms o);
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 425px) {
    .movies-container {
        .search-filters-container {
            padding-right: 0;
            width: 100%;

            .search-filters-flex {
                display: flex;
                justify-content: space-between;
                padding: 20px 0;
                transition: all 259ms ease;
                flex-wrap: wrap;
            }

            .search-input-container {
                width: 100%;
                order: 1;

                .search-input { 
                    @include font($font-size: 14px, $color: $primary-color);
                    border: 1px solid $primary-color;
                    margin: 0;
                }

                .search-btn {
                    @include position(absolute, 7px, 10px, null, null);
                    
                    svg {
                        width: 18px;
                    }
                }
            }

            .filters-container {
                width: 100%;
                order: 2;

                .filters-title {
                    @include font($font-size: 18px, $color: $primary-color, $font-weight: 700);
                    margin: 10px 0;
                }

                .filter-item {
                    .form-check-label {
                        font-size: 16px;
                    }
                }
            }
        }

        .movie-list-container {
            .alert-message.v-snack.v-snack--active.v-snack--bottom .v-snack__wrapper {
                font-size: 12px;
                padding: 15px 0;
            }

            .btn-close {
                @include font($color: $primary-color, $font-weight: 700);

                &.theme--light {
                    font-size: 12px;
                    padding: 5px 10px;
                }
            }            
            .logo-container {
                padding: 25px 0;

                span {
                    font-size: 18px;
                }

                .caps {
                    padding-right: 10px;
                }
            } 

            .populate-movies {
                .movie-card-container {
                    .movie-card {
                        .movie-image-container {
                            height: 400px;
                        }
                    }
                }
            } 
        }
    }
}
</style>
