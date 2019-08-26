<template>
    <div class="movie-container">
        <div class="login-message">
            <v-snackbar top v-model="snackbarMovie" class="alert-message">
                {{ snackbarText }}
                <v-btn class="btn-close" text @click="snackbarMovie = false">Close</v-btn>
            </v-snackbar>             
        </div>
        <div class="modal-check-container">
            <p class="check-text">Are you sure you want to {{ checkType }} the movie?</p>
            <div class="flex-between">
                <button class="btn-dark" v-if="checkType==='delete'" @click="deleteMovie">{{ checkType }}</button>
                <button class="btn-dark" v-if="checkType==='edit'" @click="editMovie">{{ checkType }}</button>
                <button class="close-check btn-dark" @click="closeCheckModal">cancel</button>
            </div>
        </div>
        <div class="flex-start">
            <div class="movie-detail-image-container">
                <img :src="movie.Poster" :alt="movie.Title">
            </div>
            <div class="movie-detail-text-container">
                <div class="flex-between title-container">
                    <p class="movie-title">{{ movie.Title }}</p>
                    <div class="btn-container">
                        <button class="btn-round" @click="movieCheck('edit')">
                            <EditBtn />
                        </button>
                        <button class="btn-round" @click="movieCheck('delete')">
                            <DeleteBtn />
                        </button>                        
                    </div>                  
                </div>
                <p class="movie-text"><span>Year:</span>  {{ movie.Year }}</p>
                <p class="movie-text"><span>Runtime:</span> {{ movie.Runtime }}</p>            
                <p class="movie-text"><span>Genre:</span> {{ movie.Genre }}</p>
                <p class="movie-text"><span>Language:</span>  {{ movie.Language }}</p>
                <p class="movie-text"><span>Country:</span>  {{ movie.Country }}</p>
                <div class="movie-rating-container">
                    <p class="movie-rating">{{ movie.imdbRating }} imdb</p>
                    <p class="movie-rating">{{ movie.imdbVotes }} votes</p>
                </div>
            </div>
        </div>
        <Separator />
    </div>    
</template>
<script>
import EditBtn from '@/components/EditBtn.vue';
import DeleteBtn from '@/components/DeleteBtn.vue';
import CheckEdit from '@/components/CheckEdit.vue';
import CheckDelete from '@/components/CheckDelete.vue';
import Separator from '@/components/Separator.vue';
import axios from 'axios';
import { setTimeout } from 'timers';
export default {    
    data() {
        return {
            movieDB: [],
            movie: {},
            baseURL: this.$store.state.baseURL,
            currentPage: this.$store.state.currentPage,
            take: 10,
            snackbarMovie: false,
            selectedModal: '',
            checkType: 'delete',
            snackbarText: ''
        }
    },
    components: {
        EditBtn,
        DeleteBtn,
        CheckEdit,
        CheckDelete,
        Separator
    }, 
    computed: {
        checkContainer() {
            return document.querySelector('.modal-check-container')
        },
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        async getMovie(id) {
            await axios.get(`${this.baseURL}/movies/${id}`).then(response => {
                this.movie = response.data.movies;
                });            
        },
        movieCheck(type) {
            if(!window.localStorage.getItem('authToken')) {
                this.snackbarText = 'You must be logged in'
                this.snackbarMovie = true;
            } else {
                window.scrollTo(0, 0);
                document.querySelector('body').classList.add('fixed-body');
                this.checkContainer.style.transform = "translate(50%, 0)";
                if(type==='edit') {
                    this.checkType = 'edit';
                } else {
                    this.checkType ='delete';
                }
            }
        },
        editMovie() {
            this.$store.state.addEdit = 'edit';
            this.$store.state.movieId = this.id;            
            this.$router.push(`/add`);
        },
        deleteMovie() {
            const getHeaders = {
                'x-auth-token': window.localStorage.getItem('authToken')
            };            
            axios.delete(`${this.baseURL}/movies/${this.id}`, {headers: getHeaders})
                .then(res => {
                    this.closeCheckModal();
                    this.snackbarMovie = true;
                    this.snackbarText = 'You have successfully deleted the movie';
                    setTimeout(() => this.$router.push(`/`), 1000);
                });

        },
        closeCheckModal() {
           this.checkContainer.style.transform = "translate(50%, -300%)"
           document.querySelector('body').classList.remove('fixed-body');
        }
    },
    created() {
        this.getMovie(this.id);
    }
}
</script>
<style lang="scss">
@import "@/scss/resources.scss";
.modal-check-container {
    @include position(absolute, 30vh, 50%, null, null);
    @include prefix(transform, translate(50%, -300%), webkit moz ms o);
    @include border-radius(10px);
    width: 350px;
    background: rgba($primary-color, .95);
    padding: 30px 50px;
    transition: transform 250ms ease;

    .check-text {
        @include font($font-size: 18px, $font-weight: 600, $text-transform: none);        
    }
}

.btn-dark {
    @include border-radius(10px);
    @include font($font-size: 16px, $font-weight: 700, $color: $primary-color, $text-transform: capitalize);
    border: 2px solid $default-color;
    width: 120px;
    background: $default-color;
    padding: 5px 25px;
    transition: all 250ms ease;

    @include on_event {
        background: $primary-color;
        color: $default-color;
    }    
}

.close-check {
    background: $third-color;
    border: 2px solid $third-color;
}

.movie-container {    
    background-image: linear-gradient(to right, $default-color 5%, $secondary-color 95%);

    .flex-start {
        flex-wrap: wrap;
    }

    .movie-detail-image-container {
        width: 50%;
        height: 660px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .movie-detail-text-container {
        
        width: 50%;
        padding: 50px;

        .movie-title {
            @include font($font-size: 24px, $color: $primary-color, $font-weight: 700);
            width: 70%;
        }

        .btn-container {
            .btn-round {
                margin-top: 10px;

                svg {
                    width: 24px;
                    margin-left: 10px;
                    
                }

                .cls {
                    &1,
                    &2 {
                        transition: all 250ms ease;
                    }

                    &-1 {
                        fill: $third-color;
                        stroke: $primary-color;
                        stroke-width: 2px;
                        transition: all 250ms ease;
                    }

                    &-2 {
                        fill: $primary-color;
                        transition: all 250ms ease;                        
                    }
                }

                @include on_event {
                    .cls-1 {
                        fill: $primary-color;
                    }

                    .cls-2 {
                        fill: $default-color;
                    }                    
                }
            }            
        }

        .movie-text {
            @include font($font-size: 18px, $color: $forth-color, $font-weight: 700);
            margin: 0 0 15px;

            span {
                font-weight: 400;
                display: block;
            }
        }

        .movie-rating-container {
            margin-top: 50px;
        }

        .movie-rating {
            @include font($color: $primary-color,$font-size: 18px, $text-align: center);
            @include border-radius(10px);
            margin: 0 0 10px;
            padding: 5px 20px;
            border: 2px solid $primary-color;

        }
    }
}

@media screen and (max-width: 767px) {
    .modal-check-container {
        width: 300px;
        padding: 30px 25px;
        transition: transform 250ms ease;

        .check-text {
            @include font($font-size: 18px, $font-weight: 600, $text-transform: none);        
        }
    }    
    .movie-container {
        .movie-detail-image-container {
            width: 100%;
            height: auto;
        }

        .movie-detail-text-container {
            width: 100%;
            padding: 25px 15px;

            .movie-title {
                font-size: 18px;
            }

            .btn-container {
                .btn-round {
                    margin-top: 0;
                }            
            }

            .movie-text {
                font-size: 16px;
                margin: 0 0 5px;

                span {
                    padding-right: 5px;
                    display: inline-block;
                }
            }

            .movie-rating-container {
                margin-top: 25px;
            }

            .movie-rating {
                font-size: 16px;
                margin: 0 0 5px;
            }
        }
    }
}
</style>

