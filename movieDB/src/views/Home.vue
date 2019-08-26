<template>
    <div class="home-container">
        <Slider />
        <Movies />
        <Separator />
    </div>
</template>
<script>
import Slider from '@/components/Slider.vue';
import Movies from '@/components/Movies.vue';
import Separator from '@/components/Separator.vue';
export default {
    components: {
        Slider,
        Movies,
        Separator
    }
}
</script>
