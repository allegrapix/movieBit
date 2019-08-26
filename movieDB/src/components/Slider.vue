<template>
    <div class="slider-container">
        <div class="slider">
            <button class="slider-btn btn-left is-hidden" @click="showPrev" ref="btnLeft">
                <ArrowLeft />
            </button>
            <div class="slider-track-container">
                <ul class="slider-track" ref="carouselTrack">
                    <li class="slider-slide" v-for="image in sliderImages" :key="image.imgSrc" ref="slideCard">
                        <img :src="image.imgSrc" alt="poster" class="slider-imag" ref="slideImage">
                    </li>
                </ul>
            </div>
            <button class="slider-btn btn-right" @click="showNext" ref="btnRight">
                <ArrowRight />
            </button>
            <div class="slider-nav" ref="carouselNav">
                <button class="slider-dot" v-for="(image, index) in sliderImages" :key="index" @click="changeToDot"></button>
            </div>         
        </div>
    </div>
</template>
<script>
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
export default {
    data() {
        return {
            sliderImages: this.$store.state.sliderImages,
            slideWidth: 0
        }
    },
    components: {
        ArrowLeft,
        ArrowRight
    },
    computed: {
        prevButton() {
            return this.$refs.btnLeft;
        },
        nextButton() {
            return this.$refs.btnRight
        },        
        track() {
            return this.$refs.carouselTrack; 
        },
        slides() {
            return Array.from(this.track.children);
        },
        dotsNav() {
            return this.$refs.carouselNav;
        },
        dots() {
            return Array.from(this.dotsNav.children);
        }        
    },
    methods: {
        showNext() {
            const currentSlide = this.track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = this.dotsNav.querySelector('.current-slide');
            const nextDot = currentDot.nextElementSibling;
            const nextIndex =  this.slides.findIndex(slide => slide === nextSlide);

            this.moveToSlide(this.track, currentSlide, nextSlide);
            this.updateDots(currentDot, nextDot);
            this.hideShowArrow(this.slides, this.prevButton, this.nextButton, nextIndex); 
        },
        showPrev() {
            const currentSlide = this.track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = this.dotsNav.querySelector('.current-slide');
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = this.slides.findIndex(slide => slide === prevSlide);

            this.moveToSlide(this.track, currentSlide, prevSlide);
            this.updateDots(currentDot, prevDot);
            this.hideShowArrow(this.slides, this.prevButton, this.nextButton, prevIndex);            
        },
        changeToDot(e) {
            const targetDot = e.target.closest('button');
            if(!targetDot) return;

            const currentSlide = this.track.querySelector('.current-slide');
            const currentDot = this.dotsNav.querySelector(".current-slide");
            const targetIndex = this.dots.findIndex(dot => dot === targetDot);
            const targetSlide = this.slides[targetIndex];        

            this.moveToSlide(this.track, currentSlide, targetSlide);
            this.updateDots(currentDot, targetDot);
            this.hideShowArrow(this.slides, this.prevButton, this.nextButton, targetIndex); 
        },
        moveToSlide(track, currentSlide, targetSlide) {
            this.track.style.transform = "translateX(-" + targetSlide.style.left + ")";
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');             
        },
        updateDots(currentDot, targetDot) {
            currentDot.classList.remove('current-slide');
            targetDot.classList.add("current-slide");
        },
        hideShowArrow(slides, prevButton, nextButton, targetIndex) {
            if(targetIndex === 0) {
                prevButton.classList.add('is-hidden');
                nextButton.classList.remove('is-hidden');
            } else if(targetIndex === slides.length - 1) {
                nextButton.classList.add('is-hidden');
                prevButton.classList.remove('is-hidden');
            } else {
                prevButton.classList.remove('is-hidden');
                nextButton.classList.remove('is-hidden');
             }
        },
        handleResizeImage() {
            const currentSlide = this.track.querySelector('.current-slide');
            const targetSlide = this.slides[0];
            const currentDot = this.dotsNav.querySelector('.current-slide');
            const targetDot = this.dots[0];
            this.slideWidth = this.$refs.slideCard[0].clientWidth;
            this.$refs.slideImage.clientWidth = this.slideWidth;           
            this.slides.forEach((slide, index) => {
                slide.style.left = index * this.slideWidth + 'px';
            });
            this.slides[0].classList.add('current-slide');  
            this.moveToSlide(this.track, currentSlide, targetSlide);
            this.updateDots(currentDot, targetDot);
            this.hideShowArrow(this.slides, this.prevButton, this.nextButton, 0);
        }
    },
    mounted() {
        this.slides[0].classList.add('current-slide');
        this.dots[0].classList.add('current-slide');
        this.handleResizeImage();
        window.addEventListener('resize', this.handleResizeImage);
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResizeImage);
    },    
}
</script>
<style lang="scss">
@import "@/scss/resources.scss";
.slider-container {
    .slider {
        position: relative;
        width: 100%;
        margin: 0;

        .slider-btn {
            @include position(absolute, 50%, null, null, null);
            @include prefix(transform, translateY(-50%), webkit moz ms o);
            width: 30px;
            z-index: 5;
            outline: none;

            svg {
                color: $secondary-color;
                opacity: .5;
                transition: all 300ms ease-in-out;
            }

            @include on_event {
                svg {
                    opacity: .8;
                }
            }
        }

        .btn-left {
            left: 50px;
        }

        .btn-right {
            right: 50px;
        }

        .slider-track-container {
            overflow: hidden;
            height: 100%;

            .slider-track {
                position: relative;
                padding: 0;
                margin: 0;
                list-style: none;
                height: 400px;
                transition: transform 400ms ease-in-out;                

                .slider-slide {
                    @include position(absolute, 0, null, 0, null);
                    margin: 0;
                    height: 100%;
                    width: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }

        .slider-nav {
            @include position(absolute, null, null, 0 null);
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 10px 0;
            z-index: 9; 
            
            .slider-dot {
                @include border-radius(50%);
                @include size(10px, 10px);
                background: $default-color;
                opacity: .9;
                margin: 0 10px;
                border: 0;
                outline: none;
                cursor: pointer; 
                transition: all 300ms ease-in-out;    

                @include on_event {
                    opacity: .9;
                }

                &.current-slide {
                    opacity: .9;
                }
            }
        }
    }
}

.is-hidden {
    display: none;
}

@media screen and (max-width: 767px) {
    .slider-container .slider {
        .btn-left {
            left: 15px;
        }

        .btn-right {
            right: 15px;
        }

        .slider-track-container {
            overflow: hidden;
            height: 100%;

            .slider-track {
                height: 200px; 
            }
        }
    }    
}
</style>

