


var all_datasets = [
  {
    "dataset": "Household Median Income",
    "csv": "median_income",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "Note: Includes the household median income for all residents. all 2005-2009 data has been adjusted for 2014 inflation.",
    "pic": "median_income.svg"
  },
  {
    "dataset": "Population",
    "csv": "population",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "Note: Includes the total population for all residents",
    "pic": "population.svg"
  },
  {
    "dataset": "Poverty",
    "csv": "poverty",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "",
    "pic": "population.svg"
  },
  {
    "dataset": "Race",
    "csv": "race",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "",
    "pic": "race.svg"

  },
  {
    "dataset": "Hispanic or Latino origin",
    "csv": "hispanic",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "",
    "pic": "latinamerica.svg"

  },
  {
    "dataset": "Age",
    "csv": "age",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "",
    "pic": "age.svg"
  },
  {
    "dataset": "Health Insurance",
    "csv": "health_insurance",
    "latest_years": "2010 - 2014",
    "previous_years": "2005 - 2009",
    "notes": "",
    "pic": "health_insurance.svg"

  }
]


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






 var dropdown_criteria = $('select.chosen-select.criteria');

      var dropdown_county1 = $('select.chosen-select.county1');

      var dropdown_county2 = $('select.chosen-select.county2');

      var grid = $('.grid');
      var grid2 = $('.grid2');

      var criteriatext
      var latest_years
      var previous_years
      var notes
      var pic

      $("#county1, #county2, .grid, .grid2").hide();



       for (var j = 0; j < all_datasets.length; j++) {

        var option = $('<option value="'+all_datasets[j].dataset+'">'+all_datasets[j].dataset+'</option>');
  dropdown_criteria.append(option);



     }




      dropdown_criteria.trigger("chosen:updated");

      dropdown_criteria.on('change', function(e, params) {

         for (var j = 0; j < all_datasets.length; j++) {

        

  if (all_datasets[j].dataset == e.target.value) {
    $("#county1, .grid").show();

    

    criteriatext = all_datasets[j].dataset
    latest_years = all_datasets[j].latest_years
    previous_years = all_datasets[j].previous_years
    notes = all_datasets[j].notes
    pic = all_datasets[j].pic


        $.ajax({
  url: "data/" + all_datasets[j].csv + ".csv",
  dataType: 'text',
}).done(firsturlget);


  }



     }

      
  
})
  

var entry = [];

    function firsturlget(data) {

    	var csv = data;

      $('.notes').html(notes);


  

    	 Papa.parse(data, {
   	header: true,
   	dynamicTyping: true,
	step: function(row) {



		var thisrow = row.data[0]

      

      entry.push(thisrow)



      var option = $('<option value="'+thisrow.GEOdisplaylabel+'">'+thisrow.GEOdisplaylabel+'</option>');
      

  dropdown_county1.append(option);
  

    var option2 = $('<option value="'+thisrow.GEOdisplaylabel+'">'+thisrow.GEOdisplaylabel+'</option>');
      dropdown_county2.append(option2);   



 
  




		

	},
	complete: function() {

    

      dropdown_county1.trigger("chosen:updated");

       dropdown_county2.trigger("chosen:updated");
     

		

    dropdown_county1.on('change', function(e, params) {



     
      $("#county2, .grid2").show();

      var selectedValue = dropdown_county1.chosen().val()



      
   

   

      $(".grid").css("float", "left");

    



      $.each(entry, function(index,key) {
        if (e.target.value == key.GEOdisplaylabel) {

          var isValidMoney = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/.test(key.latest)

           var change = (isValidMoney == true) ? (parseFloat(key.latest.replace(/[$,]+/g,"")) - parseFloat(key.prev.replace(/[$,]+/g,"")))/parseFloat(key.prev.replace(/[$,]+/g,"")) * 100 : ((key.latest - key.prev)/key.prev) * 100


           var nj_change = (isValidMoney == true) ? (parseFloat(key.nj_latest.replace(/[$,]+/g,"")) - parseFloat(key.nj_prev.replace(/[$,]+/g,"")))/parseFloat(key.nj_prev.replace(/[$,]+/g,"")) * 100 : ((key.nj_latest - key.nj_prev)/key.nj_prev) * 100

           var usa_change = (isValidMoney == true) ? (parseFloat(key.usa_latest.replace(/[$,]+/g,"")) - parseFloat(key.usa_prev.replace(/[$,]+/g,"")))/parseFloat(key.usa_prev.replace(/[$,]+/g,"")) * 100 : ((key.usa_latest - key.usa_prev)/key.usa_prev) * 100

 

 
 $("select.chosen-select.county2").find('option[value="'+ selectedValue +'"]:not(:selected)').attr('disabled','disabled')

var gridsquares = $('<div class="element-item"><p class="symbol">'+key.GEOdisplaylabel+'</p><p class="crit">' + criteriatext + '</p><img src="img/' + pic + '"><table><thead><tr><th></th><th>' + latest_years + '</th><th>' + previous_years+'</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">'+key.latest.toLocaleString()+'</td><td class="bolded">'+key.prev.toLocaleString()+ '</td><td class="bolded">'+ ((change > 0) ? "+" : "-" ) + ((change > 0) ? change.toFixed(1) : (change.toFixed(1) * -1) ) +'%</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">'+key.nj_latest.toLocaleString()+'</td><td class="separate2">'+ key.nj_prev.toLocaleString() + '</td><td class="separate2">'+((nj_change > 0) ? "+" : "-" ) + ((nj_change > 0) ? nj_change.toFixed(1) : (nj_change.toFixed(1) * -1) )+'%</td></tr><tr><td class="separate">US</td><td>'+key.usa_latest.toLocaleString()+'</td><td>'+key.usa_prev.toLocaleString()+'</td><td>'+((usa_change > 0) ? "+" : "-" ) + ((usa_change > 0) ? usa_change.toFixed(1) : (usa_change.toFixed(1) * -1) )+'%</td></tr></tbody></div>');

grid.html(gridsquares);

  
  }
  else {

    $('select.chosen-select.county2 option[value="' + key.GEOdisplaylabel + '"]').removeAttr('disabled');
  }

  $('select.chosen-select.county2').trigger('chosen:updated');

 


});

  dropdown_county2.on('change', function(e, params) {

       var selectedValue = dropdown_county2.chosen().val()



      $.each(entry, function(index,key) {
        if (e.target.value == key.GEOdisplaylabel) {
         var isValidMoney = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/.test(key.latest)

           var change = (isValidMoney == true) ? (parseFloat(key.latest.replace(/[$,]+/g,"")) - parseFloat(key.prev.replace(/[$,]+/g,"")))/parseFloat(key.prev.replace(/[$,]+/g,"")) * 100 : ((key.latest - key.prev)/key.prev) * 100


           var nj_change = (isValidMoney == true) ? (parseFloat(key.nj_latest.replace(/[$,]+/g,"")) - parseFloat(key.nj_prev.replace(/[$,]+/g,"")))/parseFloat(key.nj_prev.replace(/[$,]+/g,"")) * 100 : ((key.nj_latest - key.nj_prev)/key.nj_prev) * 100

           var usa_change = (isValidMoney == true) ? (parseFloat(key.usa_latest.replace(/[$,]+/g,"")) - parseFloat(key.usa_prev.replace(/[$,]+/g,"")))/parseFloat(key.usa_prev.replace(/[$,]+/g,"")) * 100 : ((key.usa_latest - key.usa_prev)/key.usa_prev) * 100



var gridsquares = $('<div class="element-item"><p class="symbol">'+key.GEOdisplaylabel+'</p><p class="crit">' + criteriatext + '</p><img src="img/'+ pic + '"><table><thead><tr><th></th><th>' + latest_years + '</th><th>' + previous_years+'</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">'+key.latest.toLocaleString()+'</td><td class="bolded">'+key.prev.toLocaleString()+ '</td><td class="bolded">'+ ((change > 0) ? "+" : "-" ) + ((change > 0) ? change.toFixed(1) : (change.toFixed(1) * -1) ) +'%</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">'+key.nj_latest.toLocaleString()+'</td><td class="separate2">'+ key.nj_prev.toLocaleString() + '</td><td class="separate2">'+((nj_change > 0) ? "+" : "-" ) + ((nj_change > 0) ? nj_change.toFixed(1) : (nj_change.toFixed(1) * -1) )+'%</td></tr><tr><td class="separate">US</td><td>'+key.usa_latest.toLocaleString()+'</td><td>$'+key.usa_prev.toLocaleString()+'</td><td>'+((usa_change > 0) ? "+" : "-" ) + ((usa_change > 0) ? usa_change.toFixed(1) : (usa_change.toFixed(1) * -1) )+'%</td></tr></tbody></div>');

grid2.html(gridsquares);

 $("select.chosen-select.county1").find('option[value="'+ selectedValue +'"]:not(:selected)').attr('disabled','disabled')

  
  } 

  else {

    $('select.chosen-select.county1 option[value="' + key.GEOdisplaylabel + '"]').removeAttr('disabled');
  }

   $('select.chosen-select.county1').trigger('chosen:updated');

})
  });
  
})
		

	}


});

    	
        var $grid = $('.njam-container').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows'
});



    }

