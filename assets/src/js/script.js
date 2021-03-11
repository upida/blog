const content = document.getElementById("content");
const url = "data.json";
var article = "";

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    data.forEach(function(i,key) {
        let item = '<div class="article-item">';
        let title = '';
        if(key==0){
            title = '<div class="article-title show">'+i.title+'</div>';
        }else{
            title = '<div class="article-title">'+i.title+'</div>';
        }
        let body = '<div class="article-body"><div class="article-date">'+i.date+'</div>';
        let text = '<div class="article-text">'+i.content+'</div></div></div>';
        article += item+title+body+text;
    });
    content.innerHTML = article;

    $('.article-title').click(function(){
        $(".article-title.show").removeClass("show");
        $(this).addClass("show");
    });
})
.catch(function(error){
    console.log(error);
});
