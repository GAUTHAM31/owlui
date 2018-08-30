$(function(){               
    console.log('Loading');
    
    var data = {};
    data.title = "title";
    data.message = "message";
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/mrquery_pupil/',                      
        success: function(data) {
            console.log('success');
            var div_list = document.getElementsByClassName("table-content")[0];
            for(var i = 0; i < data.length; i++) {
                
                var div_row = document.createElement("div");
                div_row.setAttribute('class','table-row');
                
                //div --values 
                var div_mrno = document.createElement("div");
                div_mrno.setAttribute('class','table-data');

                var div_date = document.createElement("div");
                div_date.setAttribute('class','table-data');

                var div_device = document.createElement("div");
                div_device.setAttribute('class','table-data');

                var div_opt = document.createElement("div");
                div_opt.setAttribute('class','table-data');

                // a tags
                var a_tag = document.createElement("a");
                var a_view = document.createElement("a");
                var a_download = document.createElement("a");
                
                var mrno = data[i].MRNO
                a_tag.setAttribute('href',"/mr/"+mrno);
               
                a_tag.innerHTML      = data[i].MRNO;
                //div_mrno.appendChild(a_tag);
                div_mrno.innerHTML = data[i].MRNO;
                var date = new Date(data[i].Date);
                div_date.innerHTML   = date;
                div_device.innerHTML = data[i].DeviceName;
                //options- download and view
                var visited_time = data[i].file_blob.split("/").pop();
                var month_ = date.getMonth()+1;
                var month = '';
                if (month_<10) {
                    month = '0'+month_;
                }
                date = ""+date.getFullYear()+"-"+month+"-"+date.getDate();
                a_view.innerHTML      = "<i class=\"fas fa-eye\" title='View'></i>"
                a_view.setAttribute('href',"pupil/"+date+"/"+mrno+"/"+visited_time);
                div_opt.appendChild(a_view);

                var icon = "<i class=\"fas fa-download\" title='Download Data'></i>";
                a_download.innerHTML = "&nbsp;&nbsp; | &nbsp; &nbsp;"+ icon;
                //a_download.setAttribute('href',"#");
                div_opt.appendChild(a_download);
                //div_opt.innerHTML    =  'Download';

                div_row.appendChild(div_mrno);
                div_row.appendChild(div_date);
                div_row.appendChild(div_device);
                div_row.appendChild(div_opt);

                div_list.appendChild(div_row);
                }
            
        },
        complete: function(){
            $('#loading').hide();
        },
        error: function(req) {
           alert('Error: ' + req.status);
        }
    });

});             