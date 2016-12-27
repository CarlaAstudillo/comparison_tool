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
    url: "data/ultimate_census_data.csv",
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

var dropdown_town1 = $('select.chosen-select.town1');

var dropdown_town2 = $('select.chosen-select.town2');

var grid = $('.grid');
var grid2 = $('.grid2');

$('#county2').hide();

$('#town1').hide();
$('#town2').hide();

var moe_text = "<small>* Margin of Error is larger than 10 percent of the total value due to small sample size. Discretion is advised when interpreting data.</small>"

var county1value;
var county2value;



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
                var option = $('<option value="' + thisrow.County + '">' + thisrow.County + '</option>');
                var option2 = $('<option value="' + thisrow.County + '">' + thisrow.County + '</option>');

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
                $('#county2').show();


                dropdown_town1.empty();

                var emptyoption = $('<option value=""></option>');

                dropdown_town1.append(emptyoption).trigger('chosen:updated')

                var selectedValue = dropdown_county1.chosen().val()

                county1value = e.target.value;

                populate_cards(county1value, grid, dropdown_town1)




            });

            dropdown_county2.on('change', function(e, params) {

                $('#town2').show();


                dropdown_town2.empty();

                var emptyoption = $('<option value=""></option>');

                dropdown_town2.append(emptyoption).trigger('chosen:updated')




                var selectedValue = dropdown_county2.chosen().val()

                county2value = e.target.value;

                populate_cards(county2value, grid2, dropdown_town2)


            });


            dropdown_town1.on('change', function(e, params) {


                populate_cards(e.target.value, grid, dropdown_town1)




            })


            dropdown_town2.on('change', function(e, params) {


                populate_cards(e.target.value, grid2, dropdown_town2)



            })


            //Grid Square function

            function populate_cards(btn_value, thegrid, thedropdown) {


                $.each(entry, function(index, key) {



                    if ((btn_value == key.County && btn_value + " County" == key.ledgerstyle) || (btn_value == key.ledgerstyle && county1value == key.County) || (btn_value == key.ledgerstyle && county2value == key.County)) {


                        //Beginning of div
                        var gridsquares = '<div class="element-item">'


                        // Place Name and Margin of Error text
                        gridsquares += '<p class="symbol">' + key.ledgerstyle + '</p>' + moe_text


                        // First Section 

                        gridsquares += '<img src="img/median_income.svg"><p class="crit">Household Median Income</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$' + key.median_income_latest.toLocaleString() + ((key.median_income_moe_latest_per > 10) ? "*" : "") + '</td><td class="bolded">$' + key.median_income_prev.toLocaleString() + ((key.median_income_moe_prev_per > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.median_income_change > 0) ? "+" : "-") + ((key.median_income_change > 0) ? key.median_income_change.toFixed(1) : (key.median_income_change.toFixed(1) * -1)) + '%' + ((key.median_income_moe_prev_per > 10 || key.median_income_moe_latest_per > 10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$' + key.nj_median_income_latest.toLocaleString() + '</td><td class="separate2">$' + key.nj_median_income_prev.toLocaleString() + '</td><td class="separate2">' + ((key.nj_median_income_change > 0) ? "+" : "-") + ((key.nj_median_income_change > 0) ? key.nj_median_income_change.toFixed(1) : (key.nj_median_income_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>$' + key.usa_median_income_latest.toLocaleString() + '</td><td>$' + key.usa_median_income_prev.toLocaleString() + '</td><td>' + ((key.usa_median_income_change > 0) ? "+" : "-") + ((key.usa_median_income_change > 0) ? key.usa_median_income_change.toFixed(1) : (key.usa_median_income_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'


                        // Second Section 

                        gridsquares += '<img src="img/population.svg"><p class="crit">Population</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">' + key.population_latest.toLocaleString() + ((key.population_moe_latest_per > 10) ? "*" : "") + '</td><td class="bolded">' + key.population_prev.toLocaleString() + ((key.population_moe_prev_per > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.population_change > 0) ? "+" : "-") + ((key.population_change > 0) ? key.population_change.toFixed(1) : (key.population_change.toFixed(1) * -1)) + '%' + ((key.population_moe_prev_per > 10 || key.population_moe_latest_per > 10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">' + key.nj_population_latest.toLocaleString() + '</td><td class="separate2">' + key.nj_population_prev.toLocaleString() + '</td><td class="separate2">' + ((key.nj_population_change > 0) ? "+" : "-") + ((key.nj_population_change > 0) ? key.nj_population_change.toFixed(1) : (nj_population_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>' + key.usa_population_latest.toLocaleString() + '</td><td>' + key.usa_population_prev.toLocaleString() + '</td><td>' + ((key.usa_population_change > 0) ? "+" : "-") + ((key.usa_population_change > 0) ? key.usa_population_change.toFixed(1) : (key.usa_population_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'


                        // Third Section

                        gridsquares += '<img src="img/age.svg"><p class="crit">Median Age</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">' + key.median_age_latest.toLocaleString() + ' yrs' + ((key.median_age_moe_latest_per > 10) ? "*" : "") + '</td><td class="bolded">' + key.median_age_prev.toLocaleString() + ' yrs' + ((key.median_age_moe_prev_per > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.median_age_change > 0) ? "+" : "-") + ((key.median_age_change > 0) ? key.median_age_change.toFixed(1) : (key.median_age_change.toFixed(1) * -1)) + '%' + ((key.median_age_moe_prev_per > 10 || key.median_age_moe_latest_per > 10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">' + key.nj_median_age_latest.toLocaleString() + '</td><td class="separate2">' + key.nj_median_age_prev.toLocaleString() + '</td><td class="separate2">' + ((key.nj_median_age_change > 0) ? "+" : "-") + ((key.nj_median_age_change > 0) ? key.nj_median_age_change.toFixed(1) : (key.nj_median_age_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>' + key.usa_median_age_latest.toLocaleString() + '</td><td>' + key.usa_median_age_prev.toLocaleString() + '</td><td>' + ((key.usa_median_age_change > 0) ? "+" : "-") + ((key.usa_median_age_change > 0) ? key.usa_median_age_change.toFixed(1) : (key.usa_median_age_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'

                        // Fourth section

                        gridsquares += '<img src="img/race.svg"><p class="crit">Race/Ethnicity</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td class="race">White</td><td class="bolded">' + key.white_per_latest.toFixed(1) + '%' + ((key.white_moe_per_latest > 10) ? "*" : "") + '</td><td class="bolded">' + key.white_per_prev.toFixed(1) + '%' + ((key.white_moe_per_prev > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.white_change > 0) ? "+" : "-") + ((key.white_change > 0) ? key.white_change.toFixed(1) : (key.white_change.toFixed(1) * -1)) + '%' + ((key.white_moe_per_prev > 10 || key.white_moe_per_latest > 10) ? "*" : "") + '</td></tr><tr><td class="race">Black</td><td class="bolded">' + key.black_per_latest.toFixed(1) + '%' + ((key.black_moe_per_latest > 10) ? "*" : "") + '</td><td class="bolded">' + key.black_per_prev.toFixed(1) + '%' + ((key.black_moe_per_prev > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.black_change > 0) ? "+" : "-") + ((key.black_change > 0) ? key.black_change.toFixed(1) : (key.black_change.toFixed(1) * -1)) + '%' + ((key.black_moe_per_prev > 10 || key.black_moe_per_latest > 10) ? "*" : "") + '</td></tr><tr><td class="race">Hispanic</td><td class="bolded">' + key.hispanic_per_latest.toFixed(1) + '%' + ((key.hispanic_moe_per_latest > 10) ? "*" : "") + '</td><td class="bolded">' + key.hispanic_per_prev.toFixed(1) + '%' + ((key.hispanic_moe_per_prev > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.hispanic_change > 0) ? "+" : "-") + ((key.hispanic_change > 0) ? key.hispanic_change.toFixed(1) : (key.hispanic_change.toFixed(1) * -1)) + '%' + ((key.hispanic_moe_per_prev > 10 || key.hispanic_moe_per_latest > 10) ? "*" : "") + '</td></tr><tr><td class="race">Asian</td><td class="bolded">' + key.asian_per_latest.toFixed(1) + '%' + ((key.asian_moe_per_latest > 10) ? "*" : "") + '</td><td class="bolded">' + key.asian_per_prev.toFixed(1) + '%' + ((key.asian_moe_per_prev > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.asian_change > 0) ? "+" : "-") + ((key.asian_change > 0) ? key.asian_change.toFixed(1) : (key.asian_change.toFixed(1) * -1)) + '%' + ((key.asian_moe_per_prev > 10 || key.asian_moe_per_latest > 10) ? "*" : "") + '</td></tr></tbody></table>'

                        // Fifth section

                        gridsquares += '<img src="img/home_values.svg"><p class="crit">Home Values</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$' + addCommas(key.homevalue_latest) + ((key.homevalue_moe_latest_per > 0.10) ? "*" : "") + '</td><td class="bolded">$' + addCommas(key.homevalue_prev) + ((key.homevalue_prev_moe_per > 0.10) ? "*" : "") + '</td><td class="bolded">' + ((key.value_change > 0) ? "+" : "-") + ((key.value_change > 0) ? key.value_change.toFixed(1) : (key.value_change.toFixed(1) * -1)) + '%' + ((key.homevalue_prev_moe_per > 0.10 || key.homevalue_moe_latest_per > 0.10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$' + key.nj_values_latest.toLocaleString() + '</td><td class="separate2">$' + key.nj_values_previous.toLocaleString() + '</td><td class="separate2">' + ((key.nj_value_change > 0) ? "+" : "-") + ((key.nj_value_change > 0) ? key.nj_value_change.toFixed(1) : (key.nj_value_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>$' + key.us_values_latest.toLocaleString() + '</td><td>$' + key.us_values_previous.toLocaleString() + '</td><td>' + ((key.us_value_change > 0) ? "+" : "-") + ((key.us_value_change > 0) ? key.us_value_change.toFixed(1) : (key.us_value_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'

                        // Sixth section

                        gridsquares += '<img src="img/housing_costs.svg"><p class="crit">Monthly Home Costs</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$' + addCommas(key.homecosts_latest) + ((key.homecosts_latest_moe_per > 0.10) ? "*" : "") + '</td><td class="bolded">$' + addCommas(key.homecosts_prev) + ((key.homecosts_prev_moe_per > 0.10) ? "*" : "") + '</td><td class="bolded">' + ((key.cost_change > 0) ? "+" : "-") + ((key.cost_change > 0) ? key.cost_change.toFixed(1) : (key.cost_change.toFixed(1) * -1)) + '%' + ((key.homecosts_prev_moe_per > 0.10 || key.homecosts_moe_latest_per > 0.10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$' + key.nj_costs_latest.toLocaleString() + '</td><td class="separate2">$' + key.nj_costs_previous.toLocaleString() + '</td><td class="separate2">' + ((key.nj_cost_change > 0) ? "+" : "-") + ((key.nj_cost_change > 0) ? nj_change.toFixed(1) : (key.nj_cost_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>$' + key.us_costs_latest.toLocaleString() + '</td><td>$' + key.us_costs_previous.toLocaleString() + '</td><td>' + ((key.us_cost_change > 0) ? "+" : "-") + ((key.us_cost_change > 0) ? key.us_cost_change.toFixed(1) : (key.us_cost_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'

                        // Seventh section

                        gridsquares += '<img src="img/poverty.svg"><p class="crit">Poverty Rate</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">' + key.poverty_per_latest.toLocaleString() + '%' + ((key.poverty_moe_per_latest > 10) ? "*" : "") + '</td><td class="bolded">' + key.poverty_per_prev.toLocaleString() + '%' + ((key.poverty_moe_per_prev > 10) ? "*" : "") + '</td><td class="bolded">' + ((key.poverty_change > 0) ? "+" : "-") + ((key.poverty_change > 0) ? key.poverty_change.toFixed(1) : (key.poverty_change.toFixed(1) * -1)) + '%' + ((key.poverty_moe_per_prev > 10 || key.poverty_moe_per_latest > 10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">' + key.nj_poverty_latest.toLocaleString() + '%</td><td class="separate2">' + key.nj_poverty_prev.toLocaleString() + '%</td><td class="separate2">' + ((key.nj_poverty_change > 0) ? "+" : "-") + ((key.nj_poverty_change > 0) ? key.nj_poverty_change.toFixed(1) : (key.nj_poverty_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>' + key.usa_poverty_latest.toLocaleString() + '%</td><td>' + key.usa_poverty_prev.toLocaleString() + '%</td><td>' + ((key.usa_poverty_change > 0) ? "+" : "-") + ((key.usa_poverty_change > 0) ? key.usa_poverty_change.toFixed(1) : (key.usa_poverty_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'

                        // Eighth section

                        gridsquares += '<img src="img/commute.svg"><p class="crit">Avg. Commute Time</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">' + key.meantime_latest.toLocaleString() + ' min.' + ((key.meantime_latest_moe_per > 0.10) ? "*" : "") + '</td><td class="bolded">' + key.meantime_prev.toLocaleString() + ' min.' + ((key.meantime_prev_moe_per > 0.10) ? "*" : "") + '</td><td class="bolded">' + ((key.time_change > 0) ? "+" : "-") + ((key.time_change > 0) ? key.time_change.toFixed(1) : (key.time_change.toFixed(1) * -1)) + '%' + ((key.meantime_prev_moe_per > 0.10 || key.meantime_latest_moe_per > 0.10) ? "*" : "") + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">' + key.nj_time_latest.toLocaleString() + '</td><td class="separate2">' + key.nj_time_previous.toLocaleString() + '</td><td class="separate2">' + ((key.nj_time_change > 0) ? "+" : "-") + ((key.nj_time_change > 0) ? key.nj_time_change.toFixed(1) : (key.nj_change.toFixed(1) * -1)) + '%</td></tr><tr><td class="separate">US</td><td>' + key.us_time_latest.toLocaleString() + '</td><td>' + key.us_time_previous.toLocaleString() + '</td><td>' + ((key.us_time_change > 0) ? "+" : "-") + ((key.us_time_change > 0) ? key.us_time_change.toFixed(1) : (key.us_time_change.toFixed(1) * -1)) + '%</td></tr></tbody></table>'


                        gridsquares += '</div>'


                        thegrid.html(gridsquares);

                        thegrid.imagesLoaded(function() {
                            pymChild.sendHeight();
                        });




                    } else if (btn_value == key.County && btn_value + " County" != key.GEOdisplaylabel) {



                        var townoption = $('<option value="' + key.ledgerstyle + '">' + key.ledgerstyle + '</option>');

                        thedropdown.append(townoption);



                    }




                    dropdown_county2.trigger('chosen:updated');
                    dropdown_county1.trigger('chosen:updated');

                    dropdown_town1.trigger("chosen:updated");
                    dropdown_town2.trigger("chosen:updated");

                })

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