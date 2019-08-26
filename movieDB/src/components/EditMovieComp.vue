<template>
    <div>
        <div class="login-message">
            <v-snackbar top v-model="snackbarAdd" class="alert-message">
                Movie successfully  {{ action }}ed.
                <v-btn class="btn-close" text @click="snackbarAdd = false">Close</v-btn>
            </v-snackbar>             
        </div>   
        <div class="add-movie-form-container">
            <form>
                <div class="flex-start">
                    <div class="col-1">
                        <div class="input-divider">
                            <label for="title" class="label-movie">Title</label>
                            <input type="text" class="input-movie" name="title" v-model="title" @blur="$v.title.$touch()" :class="{borderError: $v.title.$error}">
                            <p class="error-message" v-if="$v.title.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="year" class="label-movie">Year</label>
                            <input type="text" class="input-movie" name="year" v-model="year" @blur="$v.year.$touch()" :class="{borderError: $v.year.$error}">
                            <p class="error-message" v-if="$v.year.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="runtime" class="label-movie">Runtime</label>
                            <input type="text" class="input-movie" name="runtime" v-model="runtime" @blur="$v.runtime.$touch()" :class="{borderError: $v.runtime.$error}"> 
                            <p class="error-message" v-if="$v.runtime.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="genre" class="label-movie">Genre</label>
                            <input type="text" class="input-movie" name="genre" v-model="genre" @blur="$v.genre.$touch()" :class="{borderError: $v.genre.$error}">  
                            <p class="error-message" v-if="$v.genre.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="country" class="label-movie">Country</label>
                            <input type="text" class="input-movie" name="country" v-model="country" @blur="$v.country.$touch()" :class="{borderError: $v.country.$error}">  
                            <p class="error-message" v-if="$v.country.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="poster" class="label-movie">Poster</label>
                            <input type="text" class="input-movie" name="poster" v-model="poster" @blur="$v.poster.$touch()" :class="{borderError: $v.poster.$error}"> 
                            <p class="error-message" v-if="$v.poster.$error">Required</p>
                        </div> 
                    </div>
                    <div class="col-2">
                        <div class="input-divider">
                            <label for="language" class="label-movie">Language</label>
                            <input type="text" class="input-movie" name="language" v-model="language" @blur="$v.language.$touch()" :class="{borderError: $v.language.$error}">
                            <p class="error-message" v-if="$v.language.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="rating" class="label-movie">IMDB Rating</label>
                            <input type="number" class="input-movie" name="rating" v-model="rating" @blur="$v.rating.$touch()" :class="{borderError: $v.rating.$error}">   
                            <p class="error-message" v-if="$v.rating.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="votes" class="label-movie">IMDB Votes</label>
                            <input type="text" class="input-movie" name="votes" v-model="votes" @blur="$v.votes.$touch()" :class="{borderError: $v.votes.$error}">  
                            <p class="error-message" v-if="$v.votes.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="imdbId" class="label-movie">IMDB Id</label>
                            <input type="text" class="input-movie" name="imdbId" v-model="imdbId" @blur="$v.imdbId.$touch()" :class="{borderError: $v.imdbId.$error}"> 
                            <p class="error-message" v-if="$v.imdbId.$error">Required</p>
                        </div>
                        <div class="input-divider">
                            <label for="type" class="label-movie">Type</label>
                            <input type="text" class="input-movie" name="type" v-model="type" @blur="$v.type.$touch()" :class="{borderError: $v.type.$error}">  
                            <p class="error-message" v-if="$v.type.$error">Required</p>
                        </div>
                        <div class="flex-end">
                            <button type="submit" @click.prevent="submitEdit" class="btn-submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>             
    </div>    
</template>
<script>
import { required, email, alpha, minLength, alphaNum } from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
    data() {
        return {
            snackbarAdd: false,
            baseURL: this.$store.state.baseURL,
            title: '',
            year: "",
            runtime: '',
            genre: '',
            country: '',
            poster: '',
            language: '',
            rating: '',
            votes: '',
            imdbId: '',
            type: '',
        }
    },
    validations: {
        title: {
            required
        },
        year: {
            required
        },
        runtime: {
            required
        },
        genre: {
            required,
            alpha
        },
        country: {
            required,
            alpha
        },
        poster: {
            required
        },
        language: {
            required,
            alpha
        },
        rating: {
            required,
            alphaNum
        },
        votes: {
            required,
            alphaNum
        },
        imdbId: {
            required
        },
        type: {
            required
        }
    },
    computed: {
        action() {
            return this.$store.state.addEdit;
        },
        id() {
            return this.$store.state.movieId;
        }        
    },    
    methods: {
        async getMovieToEdit(id) {
            await axios.get(`${this.baseURL}/movies/${id}`).then(response => {
                this.title = response.data.Title;
                this.year = response.data.Year;
                this.runtime = response.data.Runtime;
                this.genre = response.data.Genre;
                this.country = response.data.Country;
                this.poster = response.data.Poster;
                this.language = response.data.Language;
                this.rating = response.data.imdbRating;
                this.votes = response.data.imdbVotes;
                this.imdbId = response.data.imdbID;
                this.type = response.data.Type;
                });            
        },        
        submitEdit() {
            const getHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-auth-token': window.localStorage.getItem('authToken'),
                'Accept': 'application/json'
            };

            const Payload = {
                Title: this.title,
                Year: this.year,
                Runtime: this.runtime,
                Genre: this.genre,
                Country: this.country,
                Poster: this.poster,
                Language: this.language,
                imdbRating: this.rating,
                imdbVotes: this.votes,
                imdbID: this.imdbId,
                Type: this.type
            }

            const encodeForm = (data) => {
                return Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
                }
            axios.put(`${this.baseURL}/movies/${this.id}`, encodeForm(Payload), {headers: getHeaders})
                .then(res => {
                    this.snackbarAdd = true;
                    setTimeout(() => this.$router.push(`/movie/${this.id}`),1000);
                })
        }        
    },
    created() {
        this.snackbarAdd = false;
        this.getMovieToEdit(this.id);
        document.querySelector('body').classList.remove('fixed-body');
    } 
}
</script>
