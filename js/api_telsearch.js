/**
 * Created by tilip on 24.05.2016.
 */


function showAdresses(searchKey, element){
    console.log(searchKey);
    var ns = "http://tel.search.ch/api/spec/result/1.0/";
    var adresses = new Array();
    return $.ajax({
        type: "GET",
        url: "http://tel.search.ch/api/?q="+searchKey+"&maxnum=2&key=02bd50c0d8083930ce53cd4cdafb01b0",
        dataType: "xml",
        success: function(xml) {
            var entries = xml.getElementsByTagName("entry");
            //console.log(entries[0]);
            //console.log(entries[0].get);
            //console.log(entries[0].getElementsByTagNameNS(ns, "name")[0].innerHTML);
            console.log(entries);
/*
            entries.forEach(function(entry){
                $(element).append("name = "+getValueFromEntry(entry, "name")+"<br>");
            });*/

            // Clean before new search
            document.getElementById('searchResult').innerHTML ='';

            for (i = 0; i < entries.length; i++) {
                /*$(element).append("<div class='searchedContact'>");
                $(element).append("<div>[favIcon]</div>");

                $(element).append("<div>");
                $(element).append("name = "+getValueFromEntry(entries[i], "name")+"<br>");
                $(element).append("firstname = "+getValueFromEntry(entries[i], "firstname")+"<br>");
                $(element).append("street = "+getValueFromEntry(entries[i], "street")+"<br>");
                $(element).append("streetno = "+getValueFromEntry(entries[i], "streetno")+"<br>");
                $(element).append("zip = "+getValueFromEntry(entries[i], "zip")+"<br>");
                $(element).append("city = "+getValueFromEntry(entries[i], "city")+"<br>");
                $(element).append("phone = "+getValueFromEntry(entries[i], "phone")+"<br>");
                $(element).append("id = "+getValueFromEntry(entries[i], "id")+"<br>");
                $(element).append("</div></div>");*/
                var saveMyDiv = document.getElementById('searchResult').innerHTML;
                document.getElementById('searchResult').innerHTML = saveMyDiv + '<fieldset>' +
                    '<div class="searchedContact">' +
                    '<div class="star"><i class="fa fa-star" aria-hidden="false"></i></div>' +
                    '<div class="contactContent"><span class="contactName">' + getValueFromEntry(entries[i], "name") + '</span><br/>' +
                    '<span class="contactFirstname">' + getValueFromEntry(entries[i], "firstname") + '</span><br/>' +
                    '<span class="contactStreet">' + getValueFromEntry(entries[i], "street") + ' ' + getValueFromEntry(entries[i], "streetno") + '</span><br/>' +
                    '<span class="contactZip">' + getValueFromEntry(entries[i], "zip") + ' ' + getValueFromEntry(entries[i], "city") + '</span><br/>' +
                    '<span class="contactPhone">' + getValueFromEntry(entries[i], "phone") + '</span><br/>' +
                    '<span class="contactId">' + getValueFromEntry(entries[i], "id") + '</span>'
                '</fieldset>';

            }



        }
    });

    function getValueFromEntry(entry, param){
        if(entry.getElementsByTagNameNS(ns, param)[0]){
            return entry.getElementsByTagNameNS(ns, param)[0].innerHTML
        }else{
            return "";
        }
    }
}