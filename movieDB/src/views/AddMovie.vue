<template>
    <div class="add-movie-container">
        <div class="title-container">
            <p>{{ action }} movie</p>
        </div>
        <AddMovieComp/>
        <Separator />
    </div>
</template>
<script>
import Upload from '@/components/Upload.vue';
import AddMovieComp from '@/components/AddMovieComp.vue';
import EditMovieComp from '@/components/EditMovieComp.vue';
import Separator from '@/components/Separator.vue';

import { setTimeout } from 'timers';
export default {
    data() {
        return {
            movieComponent: 'AddMovieComp'
        }
    },
    components: {
        Upload,
        AddMovieComp,
        EditMovieComp,
        Separator
    },
    computed: {
        action() {
            return this.$store.state.addEdit;
        }
    },
    methods: {

    },
    created() {
        
    }
}
</script>

<style lang="scss">
@import "@/scss/resources.scss";
.add-movie-container {
    @include font($font-size: 18px, $font-weight: 700, $color: $primary-color);
    background-image: linear-gradient(to right, $default-color 5%, $secondary-color 95%);
    padding: 50px 50px 100px;

    .title-container {
        @include font($text-transform: capitalize, $font-size: 32px);
    }

    .add-movie-form-container {
        .input-divider {
            position: relative;

            .error-message {
                @include position(absolute, null, null, -38px, 0);
                @include font($font-size: 14px, $color: $warning-color);
            }
        }

        .flex-start {
            flex-wrap: wrap;
        }

        .input-movie {
            @include border-radius(10px);
            background: $third-color;
            display: block;
            border: 1px solid $primary-color;
            width: 100%;
            padding: 3px 10px;
            margin: 3px 0 20px;

            &::placeholder {
                color: $primary-color;
            }
        }

        .borderError {
            border: 1px solid $warning-color;
        }

        .input-poster {
            opacity: 0;
        }

        .label-movie {
            svg {
                height: 20px;
                padding: 0 5px;
            }
        }

        .poster-upload-container {
            margin-top: 40px;
            position: relative;
            width: 100%;
            transition: all 250ms ease;

            .label-poster {
                @include position(absolute, 0, 0, 0, 0);
                @include border-radius(10px);
                border: 1px solid $primary-color;
                background: $third-color;
                transition: all 250ms ease;
            }

            @include on_event {
                .label-poster {
                    background: $primary-color;
                    color: $default-color;
                }
            }
        }

        .col-1 {
            width: 50%;
            padding-right: 35px;
        }

        .col-2 {
            width: 50%;
        }

        .btn-submit {
            @include border-radius(10px);
            margin-top: 30px;
            width: 50%;
            border: 1px solid $primary-color;
            padding: 6px;
            transition: all 250ms ease;

            @include on_event {
                background: $primary-color;
                color: $default-color;
            }

            &:disabled {
                border: 1px solid $third-color;
                background: $secondary-color;
                color: $forth-color;

                @include on_event {
                    background:  $secondary-color;
                    color: $forth-color;
                }                
            }
        }
    }
}
@media screen and (max-width: 767px) {
    .add-movie-container {
        padding: 25px 15px 50px;

        .title-container {
            font-size: 24px;
        }

        .add-movie-form-container {
            .poster-upload-container {
                margin: 40px 0 30px;
            }

            .col-1 {
                width: 100%;
                padding-right: 0;
            }

            .col-2 {
                width: 100%;
            }

            .btn-submit {
                width: 100%;
            }
        }
    }    
}
</style>

