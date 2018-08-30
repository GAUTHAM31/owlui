$(function(){               
    console.log('Loading');

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/folder_ajax/',                      
        success: function(data) {
            console.log('success');
            console.log(data);
            var img_folder = document.getElementById("images");
            var div_txt = document.getElementById("txt");


            var link = number;

            link = "https://srujana.blob.core.windows.net/owl/"+link;
            //href.setAttribute("href", link+"/"+time+"/config.txt");
            if(data.hasOwnProperty('images'))
            {

                var arr = data['images'];
                for (var i = 0; i < arr.length; i++) {
                        var a_tag = document.createElement("a");
                        a_tag.setAttribute('class',arr[i]['type']);
                        a_tag.setAttribute('href',time+"/Images/"+arr[i]['name']);
                        a_tag.setAttribute('id',arr[i]['name']);
                        a_tag.innerHTML = arr[i]['name'];
                        img_folder.appendChild(a_tag);
                }
            }
            if (data.hasOwnProperty('others')) {
                var arr = data['others'];
                console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    var i = document.createElement("i");
                    i.setAttribute('class','far fa-file-alt');
                    div_txt.appendChild(i);

                    var a_tag = document.createElement("a");
                    a_tag.innerHTML = "config.txt";
                    a_tag.setAttribute('id','config');
                    a_tag.setAttribute('href',link+"/"+time+"/config.txt");
                    div_txt.appendChild(a_tag);
                }

            }
        },
        complete: function(){
            $('#preloader').hide();
            $('#folder').show();
        },
        error: function(req) {
           alert('Error: ' + req.status);
        }
    });

});     