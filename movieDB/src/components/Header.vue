<template>
    <div class="header-container">
        <div class="header-padding">
            <div class="flex-between-center">
                <router-link to="/">
                    <div class="logo-container flex-start-center">
                        <img src="@/assets/logo-1.png" alt="moviebit">
                        <span class="caps">movie</span>
                        <span class="lowercaps">bit</span>
                    </div>
                </router-link>
                <div class="header-links-container flex-end" ref="headerMenu">
                    <button @click="openCloseMenu" class="burger-menu" ref="burgerMenu">
                        <span class="bar bar-1"></span>
                        <span class="bar bar-2"></span>
                        <span class="bar bar-3"></span>
                    </button> 
                    <div class="mobile-control">
                        <div class="mobile-position">
                            <div class="user-logged-in flex-end" v-if="logged">
                                <div class="header-link flex-start-center">
                                    <Portrait class="user-portrait"/>
                                    <span>{{ loggedUser }}</span>                                                              
                                </div>
                                <a href="#" class="header-link" @click="logoutUser">Logout
                                    <span class="link-effect"></span>
                                </a>                    
                            </div>
                            <div class="user-logged-out flex-end " v-else>
                                <a href="#" class="header-link" @click="login">Login
                                    <span class="link-effect"></span>
                                </a>
                                <a href="#" class="header-link" @click="register">Register
                                    <span class="link-effect"></span>
                                </a>                    
                            </div>                        
                        </div>
                    </div>
                </div>               
            </div> 
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Portrait from '@/components/Portrait.vue';
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            baseURL: this.$store.state.baseURL,
            loggedUser: ''
        }
    },
    components: {
        Portrait
    },
    methods: {
        openCloseMenu() {
            if(!this.burgerBtn.classList.contains("burger-open")) {
                this.burgerBtn.classList.add("burger-open");
                this.body.classList.add('fixed-body');
            } else {
                this.burgerBtn.classList.remove("burger-open");
                this.body.classList.remove('fixed-body');
            }
        },
        login() {
            this.$store.state.modalIsOpen = true; 
            this.$store.state.pressLogin = true;
        },
        register() {
            this.$store.state.modalIsOpen = true;
            this.$store.state.pressRegister = true;
        },
        logoutUser() {
            const token = window.localStorage.getItem("authToken");
            window.localStorage.removeItem("authToken");
            window.localStorage.removeItem("username");
            this.$store.state.userIsLogged = false;
            this.$router.push('/');            
        }
    },
    computed: {
        burgerBtn() {
            return this.$refs.headerMenu;
        },
        body() {
            return document.querySelector('body');
        },
        links() {
            return document.querySelectorAll('.header-link');
        },
        arrayLinks() {
            return Array.prototype.slice.call(this.links);
        },
        logged() {
            return this.$store.state.userIsLogged
        },
    },
    updated() {
        if(localStorage.getItem('username')) {
            this.$store.state.userIsLogged = true;
            this.$store.state.currentUser = window.localStorage.getItem('username');
            this.loggedUser = window.localStorage.getItem('username');;
        }
    },
    mounted() {
        this.arrayLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.burgerBtn.classList.remove('burger-open');
                this.body.classList.remove('fixed-body');
            })
        });
        if(localStorage.getItem('username')) {
            this.$store.state.userIsLogged = true;         
        }        
    }
}
</script>
<style lang="scss">
@import "@/scss/resources.scss";
.header-container {
    background: $default-color;
    padding: 0 50px;

    .header-padding {
        padding: 10px 0;
    }

    .header-links-container {
        .burger-menu {
            display: none;
        }

        .header-link {
            @include font($color: $primary-color, $font-size: 18px, $font-weight: 700);
            padding-left: 30px;
            position: relative;

            svg {
                height: 16px;
                padding: 0 5px;
                color: $primary-color;
            }

            .link-effect {
                @include position(absolute, null, null, -2px, 25px);
                @include size(2px, 20px);
                @include border-radius(2px);
                @include prefix(transform, scale(0,1), webkit moz ms o);
                background-image: linear-gradient(to left, $primary-color 5%, $secondary-color 95%);
                transition: transform 250ms ease;
            }

            @include on_event {
                .link-effect {
                    -webkit-animation: hoverEffect 750ms 1; 
                    animation: hoverEffect 750ms 1;
                }
            }

            @keyframes hoverEffect {
            0%   {
                @include prefix(transform, scale(1,1), webkit moz ms o);
                left:25px; 
            }
            50%  {
                @include prefix(transform, scale(0,1), webkit moz ms o);
                left:100%; 
                
            }
            100% {
                background-image: linear-gradient(to right, $primary-color 5%, $secondary-color 95%);
                @include prefix(transform, scale(1,1), webkit moz ms o);
                left:25px; 
                }
            }
        }
    }
}

.logo-container {
    img {
        width: 28px;
        margin-right: 8px;
    }

    span {
        @include font($font-size: 21px, $color: $primary-color);
    }

    .caps {
        @include font($text-transform: uppercase, $font-weight: 700);            
    }

    .lowercaps {
        text-transform: lowercase;
    }
}

.fixed-body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;    
}

@media screen and (max-width: 767px) {
    .header-container {
        padding: 0 15px;

        .header-padding {
            padding: 10px 0;
        }

        .header-links-container {
  
            .burger-menu {
                @include size (20px, 40px);
                display: block;
                position: relative;
                border: none;
                background: none;
                outline: none;
                float: right;
                z-index: 20;

                .bar {
                    @include position(absolute, 0, 0, null, 0);
                    @include border-radius(1px);
                    height: 3px;
                    background: $primary-color;
                    transition: all 200ms ease-in-out;

                    &-2 {
                        top: 9px;
                    }

                    &-3 {
                        top: 18px;
                    }
                }
            } 

            .mobile-control {
                .mobile-position {
                    @include position(absolute, 0, 0, 0, 100%);
                    background: rgba( $default-color, .9);
                    z-index: 10;
                    transition: all 250ms ease;

                    .user-logged-in,
                    .user-logged-out {
                        @include prefix(transform, scale(1, 0), webkit moz ms o);
                        margin-top: 70px;
                    }

                    .flex-end {
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-end;
                    }
                }
            }

            .header-link {
                padding: 5px 25px;
                transition: all 250ms ease;
            }            

            &.burger-open {
                .burger-menu {
                    .bar {
                        &-1 {
                            @include prefix(transform, rotate(45deg), webkit moz ms o);
                            @include position(absolute, 8px, 0, null, 0);
                        }

                        &-2 {
                            @include prefix(transform, rotate(-45deg), webkit moz ms o);
                        }
                        
                        &-3 {
                            opacity: 0;
                        }
                    }
                }

                .mobile-control {
                    .mobile-position {
                        @include position(absolute, 0, 0, 0, 60%);
                        box-shadow: 10px 10px 0px 7670px rgba($primary-color, .8);

                        .user-logged-in,
                        .user-logged-out {
                            @include prefix(transform, scale(1, 1), webkit moz ms o);
                        }
                    }
                }
            }
        }
    }    
}
</style>

