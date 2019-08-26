<template>
    <div class="modal">
        <div class="login-message">
            <v-snackbar class="alert-message" v-model="snackbarLogin" top id="login-alert">
                Login successful
                <v-btn text @click="$store.state.snackbarLogin = false" class="btn-close">Close</v-btn>
            </v-snackbar>
        </div>        
        <div class="modal-overlay" :class="{openModal:checkIfOpen}">
            <div class="modal-container">
                <div class="close-modal-container" @click="closeModal()">
                    <span class="bar bar-1"></span>
                    <span class="bar bar-2"></span>
                </div>
                <p class="login-title" v-if="$store.state.pressLogin">Login</p>
                <p class="login-title" v-if="$store.state.pressRegister">Register</p>
                <keep-alive>
                    <component :is="selectedComponent"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import { required, email, alpha, minLength, sameAs } from 'vuelidate/lib/validators';
import passwordComplexity from '@/passwordComplexity';
import axios from 'axios';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue'


export default {
    data() {
        return {
            baseURL: this.$store.state.baseURL,
            selectedComponent: 'Login'
        }
    },
    components: {
        Login,
        Register
    },
    methods: {
        closeModal() {            
            this.$store.state.modalIsOpen = false;
            setTimeout(() => {
                this.$store.state.pressLogin = false;
                this.$store.state.pressRegister = false;                
            }, 250);      
        },
    },
    validations: {},
    computed: {
        modal() {
            return document.querySelector('.modal-overlay');
        },
        checkIfOpen() {
            return this.$store.state.modalIsOpen;
        },
        body() {
            return document.querySelector('body');
        },
        payload() {
            return {
                username: this.username,
                password: this.password
            }
        },
        snackbarLogin() {
            return this.$store.state.snackbarLogin;
        }
    },
    updated() {
        if(this.checkIfOpen) {
            setTimeout(() => {
                this.body.classList.add('fixed-body');
            }, 0);            
        } else {
            this.body.classList.remove('fixed-body');
        }
        const modalContainer = document.querySelector('.modal-container');
        if(window.innerWidth < 768 && window.innerHeight < 558) {
            if( this.$store.state.pressLogin) {
                if(window.innerHeight < 400) {
                    modalContainer.style.height = window.innerHeight - 75 + 'px';
                }
            } else if(this.$store.state.pressRegister) {
                modalContainer.style.height = window.innerHeight - 100 + 'px';
            }
        }
        if(this.$store.state.pressLogin) {
            this.selectedComponent = "Login"
        } else if(this.$store.state.pressRegister) {
            this.selectedComponent = "Register"
        }
    }
}
</script>
<style lang="scss">
@import "@/scss/resources.scss";
.modal,
.movie-container,
.add-movie-container {
    .login-message {
        .alert-message.v-snack.v-snack--active.v-snack--top .v-snack__wrapper {
            @include font($color: $primary-color, $font-weight: 700, $text-transform: none);
            @include border-radius(10px);
            padding: 15px 30px;
            background: $secondary-color;

            .btn-close {
                @include font($color: $primary-color, $font-weight: 700);

                &.theme--light {
                    @include border-radius(10px);
                    background-color: transparent;
                    border: 1px solid $primary-color;
                    padding: 5px 15px;
                }
            }
        }
    }    
}

.modal-overlay {
    @include position(absolute, 0,0,0,100%);
    @include font($font-size: 18px, $font-weight: 700, $color: $default-color);
    background: rgba($default-color, .5);
    z-index: 20;
    transition: all 250ms ease-in;

    .modal-container {
        @include prefix(transform, scale(1,0), webkit moz ms o);
        @include border-radius(10px);
        position: relative;
        display: block;
        margin: 200px auto;
        width: 420px;
        background: rgba($primary-color, .95);
        padding: 30px 25px;        
        transition: transform 300ms ease-in;
 

        .close-modal-container {
            @include size(25px, 25px);
            @include position(absolute, 30px, 25px, null, null);
            @include border-radius(50%);
            border: 2px solid $default-color;
            background: $default-color;
            transition: all 250ms ease;
            cursor: pointer;

            .bar {
                @include position(absolute, 9px, 3px, null, null);                               
                @include size(3px, 15px);
                @include border-radius(2px);
                background: $primary-color;
                display: block;

                &-1 {
                    @include prefix(transform, rotate(45deg), webkit moz ms o); 
                }


                &-2 {
                    @include prefix(transform, rotate(-45deg), webkit moz ms o); 
                }
            }

            @include on_event {
                @include prefix(transform, rotate(90deg), webkit moz ms o);
            }
        }

        .login-title {
            @include font($font-size: 28px, $font-weight: 900);
        }

        .input-login {
            @include border-radius(10px);
            font-size: 16px;
            padding: 5px 10px;
            margin: 5px 0 15px;
            border: 1px solid $third-color;
            width: 100%;
            background: $fifth-color;
        }

        .invalid {
            border: 1px solid $warning-color;
        }

        .input-container {
            position: relative;

            .error-message {
                @include position(absolute, null, null, -20px, null);
                @include font($font-size: 14px, $font-weight: 600, $color: $warning-color, $text-transform: none);
            }
        }

        .input-login-checkbox {
            position: relative;
            width: 15px;
            height: 15px;
            opacity: 0;

            &:checked {
                & ~ .label-login-checkbox::before {
                    background: $fifth-color url('../assets/check-solid.png') center/10px no-repeat;
                }
            }
        }

        .label-login-checkbox {
            @include font($font-size: 14px, $font-weight: 400, $text-transform: none);
            margin-top: 10px;
            padding-left: 10px;
            position: relative;

            &::before {
                @include position(absolute, 2px, null, null, -15px);
                @include size(15px, 15px);
                @include border-radius(3px);
                display: block;
                content: '';
                border: 1px solid $default-color;
                background: $fifth-color;
            }

            a {
                color: $default-color;
                font-weight: 700;
                position: relative;

                .underline {
                    @include position(absolute, null, 0, 0, 0);
                    height: 1px;
                    background: transparent;
                    transition: all 250ms ease;
                }

                @include on_event { 
                    .underline {
                        background: $default-color;
                    }
                }
            }

            &.invalidCheck::before {
                border: 1px solid $warning-color;
            }
        }

        .login-submit {
            @include border-radius(10px);
            border: 2px solid $default-color;
            color: $primary-color;
            background: $default-color;
            width: 100%;
            display: block;
            margin: 20px auto;
            padding: 5px;
            transition: all 250ms ease;

            @include on_event {
                background: $primary-color;
                color: $default-color;
            }

            &:disabled {
                border: 2px solid $third-color;
                background: $third-color;

                @include on_event {
                    color: $primary-color;
                }
            }
        }

        .loginBorder {
            margin-top: 30px;
        }        
    }
}

.openModal {
    @include position(absolute, 0,0,0,0);

    .modal-container {
        @include prefix(transform, scale(1,1), webkit moz ms o);
    }
}

@media screen and (max-width: 767px) {
    .modal-overlay {
        .modal-container {
            width: 300px;
            margin: 50px auto;
            padding: 30px 15px;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            .close-modal-container {
                @include position(absolute, 30px, 15px, null, null);
            }

            .label-login-checkbox {
                font-size: 12px;
            }
        }
    }
}
</style>
