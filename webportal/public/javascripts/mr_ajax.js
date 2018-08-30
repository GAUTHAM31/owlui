$(function(){               
    console.log('Loading');
    
    var data = {};
    data.title = "title";
    data.message = "message";
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'mrquery/',                      
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
                var month = date.getUTCMonth()+1;
                date = ""+date.getUTCFullYear()+"-"+month+"-"+date.getUTCDate();

                a_view.innerHTML      = "<i class=\"fas fa-eye\" title='View'></i>"
                a_view.setAttribute('href',"/date/"+date+"/"+mrno+"/"+visited_time);
                div_opt.appendChild(a_view);

                var value = "" + mrno + "/" + date + "/" + visited_time ; 
                value = value.replace(/-/g,'/');
                var icon = "<i class=\"fas fa-download\" title='Download Data' id="+value+" data-val="+value+"></i>";
                a_download.setAttribute('download',mrno);
                a_download.innerHTML = icon;
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
            $('.fa-download').click(function(){

                    var value = $(this).data('val');
                     $(this).css("color", "blue");
                     download(value);

                });
        },
        error: function(req) {
           alert('Error: ' + req.status);
        }
    });

    

});             

 function download(value)
 {

  var icon = document.getElementById(value);
  var data = {};
  data.blob_name = value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/download", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          // alert("Failed to download:" + xhr.status + "---" + xhr.statusText);
          var blob = new Blob([xhr.response], {type: "octet/stream"});
          var fileName = value+".zip";
          icon.setAttribute('style','color:\'black\'')
          saveAs(blob, fileName);
      }
  }
  xhr.responseType = "arraybuffer";
  xhr.send(JSON.stringify(data));

//     let data = {};
//     data.blob_name = value;
//     console.log('downloading', data.blob_name);

// $.ajax({
//         type: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json',
//         url: 'download/',                      
//         success: function(data) {
//             console.log(data);
//             const link = document.createElement('a');
//             link.download = value+'.zip';
//             const blob = new Blob([ data ]);
//             link.href = URL.createObjectURL(blob);
//             link.click();
// /*           */
            
//         },
//         complete: function(){

//         },
//         error: function(req) {
//            alert('Error: ' + req.status);
//         }
//     });




// /*   */
 }
