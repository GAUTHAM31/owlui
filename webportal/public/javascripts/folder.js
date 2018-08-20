
var link = number;
var href = document.getElementById("os");
href.setAttribute("href", link+"/Images/OS");

href = document.getElementById("od");
href.setAttribute("href", link+"/Images/OD");

link = "https://srujana.blob.core.windows.net/owl/"+link;
href = document.getElementById("config");
href.setAttribute("href", link+"/config.txt");