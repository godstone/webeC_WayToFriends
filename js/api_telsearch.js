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
            var entries = xmlToObject(xml.getElementsByTagName("entry"));
            //console.log(entries[0]);
            //console.log(entries[0].get);
            //console.log(entries[0].getElementsByTagNameNS(ns, "name")[0].innerHTML);
            console.log(entries);


            // Clean before new search
            document.getElementById('searchResult').innerHTML ='';
            localStorage['results'] = JSON.stringify(entries);

            for (i = 0; i < entries.length; i++) {
                var saveMyDiv = document.getElementById('searchResult').innerHTML;

                document.getElementById('searchResult').innerHTML = saveMyDiv + '<fieldset>' +
                    '<div class="searchedContact">' +
                    '<div class="star"><i class="fa fa-star-o" aria-hidden="false" onmouseover="over(this);" onmouseout="out(this);" onclick="star('+i+')"></i></div>' +
                    '<div class="contactContent"><span class="contactName">' + entries[i].name + '</span> ' +
                    '<span class="contactFirstname">' + entries[i].firstname + '</span><br/>' +
                    '<span class="contactStreet">' + entries[i].street + ' ' + entries[i].streetno + '</span>, ' +
                    '<span class="contactZip">' + entries[i].zip + ' ' + entries[i].city + '</span><br/>'
                '</fieldset>';

            }
            showResults();



        }
    });

    function getValueFromEntry(entry, param){
        if(entry.getElementsByTagNameNS(ns, param)[0]){
            return entry.getElementsByTagNameNS(ns, param)[0].innerHTML
        }else{
            return "";
        }
    }

    function xmlToObject(entries){
        var objects = [];

        for (i = 0; i < entries.length; i++) {
            objects.push({
                name:getValueFromEntry(entries[i], "name"),
                firstname:getValueFromEntry(entries[i], "firstname"),
                street:getValueFromEntry(entries[i], "street"),
                streetno:getValueFromEntry(entries[i], "streetno"),
                zip:getValueFromEntry(entries[i], "zip"),
                city:getValueFromEntry(entries[i], "city"),
                phone:getValueFromEntry(entries[i], "phone"),
                telsearch_id:getValueFromEntry(entries[i], "id")
            });
        }

        return objects;
    }
}

