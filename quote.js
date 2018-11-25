$(document).ready(function () {


    function quoteLoading() {
        $('#spinner').css('display', 'block')
        let deg = 45;
        let limit = 0;
        let spinning = setInterval(function () {
            $('#spinner').css('transform', `rotate(${deg}deg)`)
            deg += 45;
            limit += 100;
            if(limit === 300){
                clearInterval(spinning)
                $('#spinner').fadeOut();
            }
            if(deg> 359){
                deg = 1
            }
        }, 100);
        
    }

    function changeColors() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        let newColor = `rgb(${red}, ${green}, ${blue})`;
        $('body, .button').css('background-color', newColor);

    }

    function displayQuote(){
        quoteLoading();
        $.get("https://talaikis.com/api/quotes/random/",
            function (data, textStatus, jqXHR) {
                let currentQuote = data.quote;
                let currentCat = data.cat;
                $('#text').text(data.quote)
                $('#author').text(`${data.cat}-cat`);
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + `-${currentCat} cat`));
                $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentCat) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
            },
        );
        changeColors();
        setTimeout(() => {
            
            $('#text').fadeIn(500);
            $('#author').fadeIn(500);
        }, 1000);
        
    }
    displayQuote();
    $("#quoteButton").on("click", function () {
        $('#text').fadeOut(400, displayQuote);
        $('#author').fadeOut();
       
    });

});