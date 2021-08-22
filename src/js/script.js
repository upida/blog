window.onload = function () {
    const OFFSET = 60;
    var VueAPP = Vue.createApp({
        delimiters: ['${', '}'],
        data() {
            return {
                page: 'home',
                showFullLogo: true,
                lastScrollPosition: 0,
                scrollValue: 0
            }
        },
        methods: {
            jsonGet(callback, url) {
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: (response) => {
                        callback(response);
                    }
                });
            },
            onScroll() {
                if (window.pageYOffset < 0) {
                    return;
                }
                if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
                    return;
                }

                this.showFullLogo = window.pageYOffset < this.lastScrollPosition;
                this.lastScrollPosition = window.pageYOffset;
            }
        },
        mounted() {this.lastScrollPosition = window.pageYOffset;
            window.addEventListener('scroll', this.onScroll);
        }
    }).mount('#app');
}