$(function(){               
    console.log('Loading');
        
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/view/',                      
        success: function(data) {
            console.log('success');
            console.log(data);
            var folder_div = document.getElementsByClassName("folder-view")[0];
            /*var databind = "sanitizedAttr: { src: imageUri }, visible: imageUri()"*/
            for(var i = 0; i < data.length; i++) {

                if (data[i].type==='dir') {
                    var div = document.createElement("");
                    var atag = document.createElement("a");
                    div.setAttribute('class','folder');
                    atag.appendChild(div);
                    atag.setAttribute('href','#');
                    atag.setAttribute('data-value',data[0]);  
                    folder_div.appendChild(atag);

                }
                }
        },
        complete: function(){
            $('#preloader').hide();
        },
        error: function(req) {
           alert('Error: ' + req.status);
        }
    });

});  



