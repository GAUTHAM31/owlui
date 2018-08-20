$(function(){               
    console.log('Loading');
      
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/date_image',                      
        success: function(data) {
            console.log('success');
            var img_ul = document.getElementById("lightgallery");

            var databind    = "sanitizedAttr: { src: imageUri }, visible: imageUri()"
            var datasrc     = data[0];


            for(var i = 0; i < data.length; i++) {

                var li = document.createElement("li");
                li.setAttribute('data-src',datasrc);
                li.setAttribute('data-sub-html',"Heading");

                var img_tag = document.createElement("img");
                img_tag.setAttribute('class','img-responsive');
                img_tag.setAttribute('data-bind',databind);
                img_tag.setAttribute('src',datasrc);

                var a_tag = document.createElement("a");
                a_tag.setAttribute('href',"#");

                var img_zoom    = document.createElement("img");
                img_zoom.setAttribute('src',"https://sachinchoolur.github.io/lightGallery/static/img/zoom.png");

                var div_zoom    = document.createElement("div");
                div_zoom.setAttribute('class',"demo-gallery-poster");
                div_zoom.appendChild(img_zoom);

                a_tag.appendChild(img_tag);
                a_tag.appendChild(div_zoom);

                li.appendChild(a_tag);
                img_ul.appendChild(li);
                }
            
        },
        complete: function(){
           $('#preloader').hide();
	       $('#lightgallery').lightGallery();
        },
        error: function(req) {
           alert('Error: ' + req.status);
        }
    });

});
