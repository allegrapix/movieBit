<template>
    <div class="footer-container flex-between-center">
        <div class="logo-wrapper">
            <div class="logo-container flex-start-center">
                <img src="@/assets/logo-1.png" alt="moviebit">
                <span class="caps">movie</span>
                <span class="lowercaps">bit</span>
            </div>           
            <p class="logo-text">Get your movies bit by bit</p>  
        </div>
        <div class="copyright-container">
            <p>© Allegrapix</p>
        </div>
    </div>
</template>
<style lang="scss">
@import "@/scss/resources.scss";
.footer-container {
    @include position(absolute, null, 0, 0, 0);
    background: $default-color;
    padding: 70px 50px 130px;
    flex-wrap: wrap;

    .logo-wrapper {
        .logo-text {
            @include font($font-size: 12px, $color: $primary-color, $text-transform: none);
        }
    }

    .copyright-container {
        p {
            @include font($font-size: 18px, $color: $primary-color, $text-transform: none);
        }
    }
}

@media screen and (max-width: 767px) {
    .footer-container {
        flex-wrap: wrap;
         padding: 80px 50px;

        .logo-container {
            justify-content: center;
        }

        .logo-wrapper {
            width: 100%;
            text-align: center;
            .logo-text {
                @include font($font-size: 12px, $color: $primary-color, $text-transform: none);
            }
        }

        .copyright-container {
            width: 100%;
            text-align: center;
            p {
                @include font($font-size: 18px, $color: $primary-color, $text-transform: none);
            }
        }
    }
}
</style>
