import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            dimensions: { width: window.innerWidth, height: window.innerHeight },
            permit: {
                audio: true, video: true, screen: false
            }
        }
    },
    mounted() {

        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            window.addEventListener('load', this.setId);
            document.addEventListener("contextmenu", e => e.preventDefault());
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        isPinned(el) {
            document.querySelectorAll('*').forEach((element) => { element.classList.remove('pinned') });
        },
        toggleFullScreen(x, element) {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                if (document.exitFullscreen) { document.exitFullscreen() }
                else if (document.mozCancelFullScreen) { document.mozCancelFullScreen() }
                else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
                else if (document.msExitFullscreen) { document.msExitFullscreen() }

            } else {
                if (element.requestFullscreen) { element.requestFullscreen(); }
                else if (element.mozRequestFullScreen) { element.mozRequestFullScreen(); }
                else if (element.webkitRequestFullscreen) { element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); }
                else if (element.msRequestFullscreen) { element.msRequestFullscreen(); }
            }
        }
    }
}).mount('#app');