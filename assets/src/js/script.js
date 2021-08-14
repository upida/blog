window.onload = function() {
    const OFFSET = 60;
    var VueAPP = new Vue({
        el: '#app',
        data() {
            return {
                page: 'home',
                showFullLogo: true,
                showArticle: false,
                lastScrollPosition: 0,
                scrollValue: 0,
                posts: []
            }
        },
        methods: {
            jsonGet(callback,url)
            {
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: (response) => {
                        callback(response);
                    }
                });
            },
            onScroll () {
                if (window.pageYOffset < 0) {
                    return;
                }
                if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
                    return;
                }
                // console.log(window.pageYOffset);
                this.showFullLogo = window.pageYOffset < this.lastScrollPosition;
                this.lastScrollPosition = window.pageYOffset;
            }
        },
        mounted() {
            var root = location.origin;
            var pathparts = location.pathname.split('/');
            var url = root+'/'+pathparts[1].trim('/')+'/'+pathparts[2].trim('/')+'/';

            console.log(url);
            
            this.lastScrollPosition = window.pageYOffset;
            window.addEventListener('scroll', this.onScroll);

            this.jsonGet(data => {
                let finaldata = [];
                data.map(function(value, key) {
                    finaldata.push(
                        {
                            id: key,
                            title: value.title,
                            date: value.date,
                            content: value.content
                        }
                    );
                });
                this.posts = finaldata;
            },url+'data.json');
        }
    });
}