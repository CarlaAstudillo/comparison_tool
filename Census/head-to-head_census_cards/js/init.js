


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
  url: "data/census_data_towns.csv",
  dataType: 'text',
}).done(firsturlget);





      var dropdown_county1 = $('select.chosen-select.county1');

      var dropdown_county2 = $('select.chosen-select.county2');

      var dropdown_town1 = $('select.chosen-select.town1');

      var dropdown_town2 = $('select.chosen-select.town2');

      var grid = $('.grid');
      var grid2 = $('.grid2');

      $('#town1').hide();
      $('#town2').hide();

     

   
  

var entry = [];

    function firsturlget(data) {

    	var csv = data;

      var usedNames = [];


      


  

    	 Papa.parse(data, {
   	header: true,
   	dynamicTyping: true,
	step: function(row) {



		var thisrow = row.data[0]
   

    if (usedNames.indexOf(thisrow.County) == -1) {
         var option = $('<option value="'+thisrow.County+'">'+thisrow.County+'</option>');
         var option2 = $('<option value="'+thisrow.County+'">'+thisrow.County+'</option>');

  dropdown_county1.append(option);
  dropdown_county2.append(option2);
        usedNames.push(thisrow.County);
    }


      

      entry.push(thisrow)



     
  




 
  




		

	},
	complete: function() {

    

      dropdown_county1.trigger("chosen:updated");

       dropdown_county2.trigger("chosen:updated");
     

		

    dropdown_county1.on('change', function(e, params) {


       $('#town1').show();


        dropdown_town1.empty();

        var emptyoption = $('<option value=""></option>');

        dropdown_town1.append(emptyoption).trigger('chosen:updated')

      var selectedValue = dropdown_county1.chosen().val()



      
   


    



      $.each(entry, function(index,key) {


      
        if (e.target.value == key.County && e.target.value + " County" == key.GEOdisplaylabel) {

          
           var change = ((key.median_income_latest - key.median_income_prev)/key.median_income_prev) * 100


           var nj_change = ((key.nj_median_income_latest - key.nj_median_income_prev)/key.nj_median_income_prev) * 100

           var usa_change = ((key.usa_median_income_latest - key.usa_median_income_prev)/key.usa_median_income_prev) * 100

 

 
 // $("select.chosen-select.county2").find('option[value="'+ selectedValue +'"]:not(:selected)').attr('disabled','disabled')

var gridsquares = $('<div class="element-item"><p class="symbol">'+key.GEOdisplaylabel+'</p><p class="crit">Household Median Income</p><img src="img/median_income.svg"><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$'+key.median_income_latest.toLocaleString()+'</td><td class="bolded">$'+key.median_income_prev.toLocaleString()+ '</td><td class="bolded">'+ ((change > 0) ? "+" : "-" ) + ((change > 0) ? change.toFixed(1) : (change.toFixed(1) * -1) ) +'%</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$'+key.nj_median_income_latest.toLocaleString()+'</td><td class="separate2">$'+ key.nj_median_income_prev.toLocaleString() + '</td><td class="separate2">'+((nj_change > 0) ? "+" : "-" ) + ((nj_change > 0) ? nj_change.toFixed(1) : (nj_change.toFixed(1) * -1) )+'%</td></tr><tr><td class="separate">US</td><td>'+key.usa_median_income_latest.toLocaleString()+'</td><td>'+key.usa_median_income_prev.toLocaleString()+'</td><td>'+((usa_change > 0) ? "+" : "-" ) + ((usa_change > 0) ? usa_change.toFixed(1) : (usa_change.toFixed(1) * -1) )+'%</td></tr></tbody></div>');

grid.html(gridsquares);



  
  }
 
  else if (e.target.value == key.County && e.target.value + " County" != key.GEOdisplaylabel){

     console.log("THIS Happened!!")

    var townoption = $('<option value="'+key.GEOdisplaylabel+'">'+key.GEOdisplaylabel+'</option>');

  dropdown_town1.append(townoption);



  }

  $('select.chosen-select.county2').trigger('chosen:updated');
  $('select.chosen-select.town1').trigger("chosen:updated");

 


});

  dropdown_county2.on('change', function(e, params) {

    $('#town2').show();


     dropdown_town2.empty();

        var emptyoption = $('<option value=""></option>');

        dropdown_town2.append(emptyoption).trigger('chosen:updated')

      


       var selectedValue = dropdown_county2.chosen().val()



      $.each(entry, function(index,key) {
        if (e.target.value == key.County && e.target.value + " County" == key.GEOdisplaylabel) {
         
           var change = ((key.median_income_latest - key.median_income_prev)/key.median_income_prev) * 100


           var nj_change = ((key.nj_median_income_latest - key.nj_median_income_prev)/key.nj_median_income_prev) * 100

           var usa_change = ((key.usa_median_income_latest - key.usa_median_income_prev)/key.usa_median_income_prev) * 100



var gridsquares = $('<div class="element-item"><p class="symbol">'+key.GEOdisplaylabel+'</p><p class="crit">Household Median Income</p><img src="img/median_income.svg"><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$'+key.median_income_latest.toLocaleString()+'</td><td class="bolded">$'+key.median_income_prev.toLocaleString()+ '</td><td class="bolded">'+ ((change > 0) ? "+" : "-" ) + ((change > 0) ? change.toFixed(1) : (change.toFixed(1) * -1) ) +'%</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$'+key.nj_median_income_latest.toLocaleString()+'</td><td class="separate2">$'+ key.nj_median_income_prev.toLocaleString() + '</td><td class="separate2">'+((nj_change > 0) ? "+" : "-" ) + ((nj_change > 0) ? nj_change.toFixed(1) : (nj_change.toFixed(1) * -1) )+'%</td></tr><tr><td class="separate">US</td><td>'+key.usa_median_income_latest.toLocaleString()+'</td><td>'+key.usa_median_income_prev.toLocaleString()+'</td><td>'+((usa_change > 0) ? "+" : "-" ) + ((usa_change > 0) ? usa_change.toFixed(1) : (usa_change.toFixed(1) * -1) )+'%</td></tr></tbody></div>');

grid2.html(gridsquares);



  
  } 

  

  else if (e.target.value == key.County && e.target.value + " County" != key.GEOdisplaylabel){

  

    var townoption = $('<option value="'+key.GEOdisplaylabel+'">'+key.GEOdisplaylabel+'</option>');

  dropdown_town2.append(townoption);



  }
   $('select.chosen-select.county1').trigger('chosen:updated');
   $('select.chosen-select.town2').trigger('chosen:updated');

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

