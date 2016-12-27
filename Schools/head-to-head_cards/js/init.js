var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {
        allow_single_deselect: true
    },
    '.chosen-select-no-single': {
        disable_search_threshold: 10
    },
    '.chosen-select-no-results': {
        no_results_text: 'Oops, nothing found!'
    },
    '.chosen-select-width': {
        width: "95%"
    }
}
for (var selector in config) {
    $(selector).chosen(config[selector]);
}


$.ajax({
    url: "data_merge/ultimate_parcc_scores.csv",
    dataType: 'text',
}).done(firsturlget);

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}




var dropdown_county1 = $('select.chosen-select.county1');

var dropdown_county2 = $('select.chosen-select.county2');

var dropdown_dist1 = $('select.chosen-select.district1');

var dropdown_dist2 = $('select.chosen-select.district2');


var dropdown_town1 = $('select.chosen-select.town1');

var dropdown_town2 = $('select.chosen-select.town2');

var grid = $('.grid');
var grid2 = $('.grid2');

$('#county2').hide();
$('#dist1').hide();
$('#dist2').hide();

$('#town1').hide();
$('#town2').hide();

var moe_text = "<small>* Margin of Error is larger than 10 percent of the total value due to small sample size. Discretion is advised when interpreting data.</small>"

var county1value;
var county2value;
var dist1value;
var dist2value;



var entry = [];

function firsturlget(data) {

    var csv = data;

    var usedCounties = [];

    var usedDist = [];

    var usedSchool = [];

var keyValuePair = {};

var grade3 = [];
var grade4 = [];
var grade5 = [];

var grade6 = [];
var grade7 = [];
var grade8 = [];
var algebra = [];
var algebra2 = [];
var geometry = [];
var schools = [];




    Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        step: function(row) {



            var thisrow = row.data[0]



            if (usedCounties.indexOf(thisrow["COUNTY NAME"]) == -1) {
                var option = $('<option value="' + thisrow["COUNTY NAME"] + '">' + thisrow["COUNTY NAME"] + '</option>');
                var option2 = $('<option value="' + thisrow["COUNTY NAME"] + '">' + thisrow["COUNTY NAME"] + '</option>');

                dropdown_county1.append(option);
                dropdown_county2.append(option2);
                usedCounties.push(thisrow["COUNTY NAME"]);

                
            }

            if (usedDist.indexOf(thisrow["DISTRICT NAME"]) == -1) {

                usedDist.push(thisrow["DISTRICT NAME"]);
  

                keyValuePair[thisrow["DISTRICT NAME"]]=thisrow["COUNTY NAME"]; // set your dynamic values


            }


            if (usedSchool.indexOf(thisrow["SCHOOL NAME"]) == -1) {

                usedSchool.push(thisrow["SCHOOL NAME"]);

                schools.push(thisrow)
  

               

            }



            if (thisrow["GRADE"] == "3") {

                grade3.push(thisrow);
  

               


            }

            else if (thisrow["GRADE"] == "4") {

                grade4.push(thisrow);
  

               


            }

            else if (thisrow["GRADE"] == "5") {

                grade5.push(thisrow);
  

               


            }

            else if (thisrow["GRADE"] == "6") {

                grade6.push(thisrow);
  


            }

             else if (thisrow["GRADE"] == "7") {

                grade7.push(thisrow);
  


            }

             else if (thisrow["GRADE"] == "8") {

                grade8.push(thisrow);
  


            }

            else if (thisrow["GRADE"] == "9 and Algebra I") {

                algebra.push(thisrow);
  


            }

            else if (thisrow["GRADE"] == "10 and Algebra II") {

                algebra2.push(thisrow);
  


            }

            else if (thisrow["GRADE"] == "11 and Geometry") {

                geometry.push(thisrow);
  


            }




//              if (usedDist.indexOf(thisrow["DISTRICT NAME"]) == -1) {
//                 usedDist.push(thisrow["DISTRICT NAME"]);
//             }

          

// console.log(usedDist)




            




        },
        complete: function() {



            dropdown_county1.trigger("chosen:updated");

            dropdown_county2.trigger("chosen:updated");


             function fill_buttons(btn_value, dropdown ) {
                

                 $.each(keyValuePair, function(index, key) {

                    


                    if (btn_value == key) {
                  

                        

                         var townoption = $('<option value="' + index + '">' + index + '</option>');

                        dropdown.append(townoption);



                    }

                    dropdown.trigger('chosen:updated');

            // if (usedDist.indexOf(thisrow["DISTRICT NAME"]) == -1) {
            //     var option = $('<option value="' + thisrow["DISTRICT NAME"] + '">' + thisrow["DISTRICT NAME"] + '</option>');
            //     var option2 = $('<option value="' + thisrow["DISTRICT NAME"] + '">' + thisrow["DISTRICT NAME"] + '</option>');

            //     dropdown.append(option);
            //     dropdown.append(option2);
            //     usedDist.push(thisrow["DISTRICT NAME"]);
            // }

           

            })

        }


            dropdown_county1.on('change', function(e, params) {


                $('#dist1').show();
                $('#county2').show();


                dropdown_dist1.empty();

                var emptyoption = $('<option value=""></option>');

                dropdown_dist1.append(emptyoption).trigger('chosen:updated')

                county1value = e.target.value;

                fill_buttons(county1value,  dropdown_dist1)

    

            });

           
            dropdown_county2.on('change', function(e, params) {


                $('#dist2').show();



                dropdown_dist2.empty();

                var emptyoption = $('<option value=""></option>');

                dropdown_dist2.append(emptyoption).trigger('chosen:updated')


                county2value = e.target.value;

                fill_buttons(county2value,  dropdown_dist2)

 


            });




            dropdown_dist1.on('change', function(e, params) {








                $('#town1').show();

            

                


                dropdown_town1.empty();

                var emptyoption = $('<option value=""></option>');

                dropdown_town1.append(emptyoption).trigger('chosen:updated')

                var selectedValue = dropdown_county1.chosen().val()

                dist1value = e.target.value;

                populate_cards(dist1value, grid, dropdown_town1, county1value)




            });

            dropdown_dist2.on('change', function(e, params) {

                $('#town2').show();

                $( "span#town1" ).css("display", "inline");





                dropdown_town2.empty();

                var emptyoption = $('<option value=""></option>');

                dropdown_town2.append(emptyoption).trigger('chosen:updated')




                dist2value = e.target.value;

                populate_cards(dist2value, grid2, dropdown_town2, county2value)


            });


            dropdown_town1.on('change', function(e, params) {




                populate_cards(e.target.value, grid, null, county1value)




            })


            dropdown_town2.on('change', function(e, params) {


                populate_cards(e.target.value, grid2, null, county2value)



            })


            function change(value1, value2) {

              

                var changevalue = parseInt(value1).toFixed(1) - parseInt(value2).toFixed(1);

               

                if (changevalue > 0 || changevalue == 0) {

                    return "+" + changevalue;


                }

                else {
                    return changevalue
                }


            }


           


            //Grid Square function

            function populate_cards(btn_value, thegrid, thedropdown, placevalue) {

                thegrid.empty();


               

                var gridsquares = '<div class="element-item">'

                 gridsquares += '<p class="symbol">' + btn_value + '</p>'


                $.each(grade3, function(index, key) {




                   if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {



                        gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                         gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>LA</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"

                          //Alternative setup

                           // gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><table style='display: inline-block'><thead><tr><th class='subject' colspan='2'>MATH <img src='img/calc.svg'></th></tr><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td></tr></tbody></table>"

                        // //<p class='subject'>LANGUAGE ARTS</p>


                        //   gridsquares += "<table style='display: inline-block'><thead><tr><th class='subject' colspan='3'>LANG ARTS <img src='img/book.svg'></th></tr><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th></tr></thead><tbody><tr><td class='headerbold'></td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td></tr><tr><td class='headerbold'></td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td></tr><tr><td class='headerbold'></td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td></tr><tr><td class='headerbold'></td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td></tr><tr><td class='headerbold'></td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td></tr></tbody></table>"





                        // thegrid.append(gridsquares);




                    } 

                })

                $.each(grade4, function(index, key) {



                     if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                  

                   

                        // Place Name and Margin of Error text
                    

                      gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                         gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>LA</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"





                    } 

                })

                $.each(grade5, function(index, key) {



                     if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                       

                        // Place Name and Margin of Error text
                    

                        gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                         gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>LA</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"







                    } 

                })

                $.each(grade6, function(index, key) {



                      if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {

                        //Beginning of div
                       

                        // Place Name and Margin of Error text
                    
gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                         gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>LA</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"




                    } 

                })

                $.each(grade7, function(index, key) {



                     if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                       

                        // Place Name and Margin of Error text
                    
gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                         gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>LA</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"




                    } 

                })

                $.each(grade8, function(index, key) {



                      if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                       

                        // Place Name and Margin of Error text
                    
       gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                         gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE "+ key["GRADE"] + "</p><p class='subject'>LA</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"




                    } 

                })

                $.each(algebra, function(index, key) {



                      if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                       

                        // Place Name and Margin of Error text
                    
   gridsquares += "<img src='img/school.svg'><p class='crit'>GEOMETRY</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                          gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE 9</p><p class='subject'>LANGUAGE ARTS</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"







                    } 

                })

                $.each(algebra2, function(index, key) {



                     if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                       

                        // Place Name and Margin of Error text
                    
        gridsquares += "<img src='img/school.svg'><p class='crit'>GEOMETRY</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                          gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE 10</p><p class='subject'>LANGUAGE ARTS</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"





                    } 

                })

                $.each(geometry, function(index, key) {



                      if ((placevalue == key["COUNTY NAME"] && btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] == "")|| (placevalue == key["COUNTY NAME"] && btn_value == key["SCHOOL NAME"] && key["SCHOOL CODE"] != "") ) {


                        //Beginning of div
                       

                    gridsquares += "<img src='img/school.svg'><p class='crit'>GEOMETRY</p><p class='subject'>MATH</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_MATH"], key["PREV_L1 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_MATH"], key["PREV_L2 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_MATH"], key["PREV_L3 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_MATH"], key["PREV_L4 PERCENT_MATH"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_MATH"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_MATH"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_MATH"], key["PREV_L5 PERCENT_MATH"]) + "%</td></tr></tbody></table>"


                          gridsquares += "<img src='img/school.svg'><p class='crit'>GRADE 11</p><p class='subject'>LANGUAGE ARTS</p><table><thead><tr><th></th><th class='latest'>'15-'16</th><th>'14-'15</th><th class='change'>Change</th></tr></thead><tbody><tr><td class='headerbold'>L1</td><td class='bolded latest'>" + key["LATEST_L1 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L1 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L1 PERCENT_LA"], key["PREV_L1 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L2</td><td class='bolded latest'>" + key["LATEST_L2 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L2 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L2 PERCENT_LA"], key["PREV_L2 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L3</td><td class='bolded latest'>" + key["LATEST_L3 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L3 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L3 PERCENT_LA"], key["PREV_L3 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L4</td><td class='bolded latest'>" + key["LATEST_L4 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L4 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L4 PERCENT_LA"], key["PREV_L4 PERCENT_LA"]) + "%</td></tr><tr><td class='headerbold'>L5</td><td class='bolded latest'>" + key["LATEST_L5 PERCENT_LA"] + "%</td><td class='bolded'>" + key["PREV_L5 PERCENT_LA"] + "%</td><td class='bolded change'>" + change(key["LATEST_L5 PERCENT_LA"], key["PREV_L5 PERCENT_LA"]) + "%</td></tr></tbody></table>"


      


                        gridsquares += '</div>'


                        


                       




                    } 

                })

///
            if (thedropdown != null) {

                $.each(schools, function(index, key) {


                    if (btn_value == key["DISTRICT NAME"] && key["SCHOOL CODE"] != "") {



                        var townoption = $('<option value="' + key["SCHOOL NAME"] + '">' + key["SCHOOL NAME"] + '</option>');

                        thedropdown.append(townoption);



                    }




                    dropdown_county2.trigger('chosen:updated');
                    dropdown_county1.trigger('chosen:updated');

                    dropdown_town1.trigger("chosen:updated");
                    dropdown_town2.trigger("chosen:updated");

                    });


                }





                ///

                 thegrid.append(gridsquares);

                  thegrid.imagesLoaded(function() {
                            pymChild.sendHeight();
                        });


            }


        }


    });


    var $grid = $('.njam-container').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });

    $(window).resize(function() {


        $(".chosen-container-single").css("width", "48%")


    });

    var pymChild = new pym.Child();



}