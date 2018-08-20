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
                
                //div--table row----
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
                
                var mrno = data[i].MRNO.match(/\d/g);
                a_tag.setAttribute('href',"/mr/"+mrno);
               
                a_tag.innerHTML      = data[i].MRNO;
                div_mrno.appendChild(a_tag);
                var date = new Date(data[i].Date);
                div_date.innerHTML   = date;
                div_device.innerHTML = data[i].DeviceName;
                div_opt.innerHTML    =  'Download';

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