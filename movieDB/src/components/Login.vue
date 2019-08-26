<template>
    <div class="login-form">
        <form>
            <div class="input-container">
                <label for="username" class="label-login">Username</label>
                <input type="text" class="input-login" name="username" v-model="username" @blur="$v.username.$touch()" :class="{invalid: $v.username.$error}"> 
                <p class="error-message" v-if="$v.username.$error">Required</p>                  
            </div>
            <div class="input-container">
                <label for="email" class="label-login">E-mail</label>
                <input type="email" class="input-login" name="email" v-model="email" @blur="$v.email.$touch()" :class="{invalid: $v.email.$error}">
                <p class="error-message" v-if="$v.email.$error">Please insert a valid email address</p>
            </div>         
            <div class="input-container">
                <label for="password" class="label-login">Password</label>
                <input type="password" class="input-login" name="password" v-model="password" @blur="$v.password.$touch()" :class="{invalid: $v.password.$error}">
                <p class="error-message" v-if="$v.password.$error">Min. 6 char, 1 uppercase & 1 number</p>                  
            </div>
            <div class="input-container">
                <input type="submit" value="Login" class="login-submit" :class="{loginBorder: this.$store.state.pressLogin}" @click.prevent="submitLogin" :disabled="$v.$invalid">
            </div> 
        </form>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import { required, email, alpha, minLength, sameAs } from 'vuelidate/lib/validators';
import passwordComplexity from '@/passwordComplexity';
import axios from 'axios';

export default {
    data() {
        return {         
            username: '',
            email: '',
            password: '',
            baseURL: this.$store.state.baseURL
        }
    },
    validations: {
        username: {
            required
        },
        email: {
            required,
            email
        },        
        password: {
            required,
            minLength: minLength(6),
            passwordComplexity
        }
    },
    methods: {
        submitLogin() {
            const Payload = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            const encodeForm = (data) => {
                return Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
                }
            axios.post(`${this.baseURL}/login`, encodeForm(Payload), {headers: {'Accept': 'application/json'}})
            .then(res => {
                
                window.localStorage.setItem('authToken', res.headers['x-auth-token']);
                window.localStorage.setItem('username', res.data.user.username);
                this.$store.state.currentUser = window.localStorage.getItem('username');
                this.$store.state.token = res.headers.jsonwebtoken;
                this.$store.state.modalIsOpen = false;
                this.$store.state.userIsLogged = true;
                this.$store.state.pressLogin = false;
                this.$store.state.snackbarLogin = true;
            })
            .catch(error => console.log(error));           
        }
    },
    computed: {
        modalIsOpen() {
            return this.$store.state.modalIsOpen
        }
    },
    updated() {
        if(!this.modalIsOpen) {
            this.username = '';
            this.password = '';      
        }
    }
}
</script>

