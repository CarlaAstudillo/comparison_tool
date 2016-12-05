var csvurl = 'data/median_income.csv'

var csvurl2 = 'data/median_income_2005-2009.csv'

var latest_years = "2010 - 2014"
var previous_years = "2005 - 2009"


var config = {
      '.chosen-select'           : {},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }




    $.ajax({
  url: csvurl,
  dataType: 'text',
}).done(firsturlget);


  

var entry = [];

    function firsturlget(data) {

    	var csv = data;

    	var dropdown = $('select.chosen-select.single');

    	var grid = $('.grid');

   
  

    	 Papa.parse(data, {
   	header: true,
   	dynamicTyping: true,
	step: function(row) {

		var thisrow = row.data



		 for (var i = 0; i < thisrow.length; i++) {


		 	var option = $('<option value="'+thisrow[i].GEOdisplaylabel+'">'+thisrow[i].GEOdisplaylabel+'</option>');
  dropdown.append(option);

  var change = ((thisrow[i].median_house_income_latest - thisrow[i].median_house_income_prev_inf)/thisrow[i].median_house_income_prev_inf) * 100

  var nj_change = ((thisrow[i].nj_median_income_latest - thisrow[i].nj_median_income_prev_inf)/thisrow[i].nj_median_income_prev) * 100
  var usa_change = ((thisrow[i].usa_median_income_latest - thisrow[i].usa_median_income_prev_inf)/thisrow[i].usa_median_income_prev)*100
 



var gridsquares = $('<div class="element-item transition metal " data-category="transition"><p class="symbol">'+thisrow[i].GEOdisplaylabel+'</p><p class="crit">All median household income</p><img src="img/median_income.svg"><table><thead><tr><th></th><th>' + latest_years + '</th><th>' + previous_years+'</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$'+thisrow[i].median_house_income_latest.toLocaleString()+'</td><td class="bolded">$'+thisrow[i].median_house_income_prev_inf.toLocaleString()+ '</td><td class="bolded">'+ ((change > 0) ? "+" : "-" ) + ((change > 0) ? change.toFixed(1) : (change.toFixed(1) * -1) ) +'%</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$'+thisrow[i].nj_median_income_latest.toLocaleString()+'</td><td class="separate2">$'+ thisrow[i].nj_median_income_prev_inf.toLocaleString() + '</td><td class="separate2">'+((nj_change > 0) ? "+" : "-" ) + ((nj_change > 0) ? nj_change.toFixed(1) : (nj_change.toFixed(1) * -1) )+'%</td></tr><tr><td class="separate">US</td><td>$'+thisrow[i].usa_median_income_latest.toLocaleString()+'</td><td>$'+thisrow[i].usa_median_income_prev_inf.toLocaleString()+'</td><td>'+((usa_change > 0) ? "+" : "-" ) + ((usa_change > 0) ? usa_change.toFixed(1) : (usa_change.toFixed(1) * -1) )+'%</td></tr></tbody></div>');

  grid.append(gridsquares);

  





		 }



		 dropdown.trigger("chosen:updated");

		

	},
	complete: function() {

		dropdown.on('change', function(e, params) {

			console.log(e.target.value)
  
})
		

	}


});

    	
        var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows'
});



    }

