getArticles();

$(document).ready(function() {
    showArticle(0);
    $('.article-title').click(function(){
        let id = $(this).parent(".article-item").attr('id');
        let parent = $(".article-title.show").parent().attr('id');
 
        if(id != parent){
            $(".article-title.show").removeClass("show");
            $(".article-item .article-body").hide( "fast");
            showArticle(id);
        }
 
    });
    
});

function showArticle(id){
    $(`.article-item#${id} .article-title`).addClass("show");
    $(`.article-item#${id} .article-body`).show( "fast");
}

function getArticles() {
    $.get(
        'data.json',
        function (data) {
             data.forEach((e, key) => {
                let id = key;
                let title = e.title;
                let date = e.date;
                let content = e.content;
                var articles = '<div class="article-item" id="'+id+'"><div class="article-title">'+title+'</div><div class="article-body"><div class="article-date">'+date+'</div><div class="article-text">'+content+'</div></div></div>';
                $("#content").append(articles);
             });
        }
    );
}