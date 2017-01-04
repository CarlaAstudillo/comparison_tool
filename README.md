#NJAM Compare Tool

When working with huge data dumps, one of our biggest challenges has always been in displaying all of the data in a way that’s both visually appealing and easy-to-understand while packing in as much data as possible. This can be especially challenging in mobile devices. 

At NJ Advance Media, we solved this by creating a comparison tool that will compare a specific town or a county to another town. 

Using javascript, we built the tool that were using a dropdown menu, the readers can filter out census data by county and by town on the left. Then, they can compare the data to another county or town in a second dropdown on the right. 

We have plans to repurpose this head-to-head comparison tool to compare all kinds of datasets: schools (which will have three tiers: county, districts and schools), crime, etc. We are actively working in automating as much of it as possible so our data team can quickly turn around the comparison tool so that readers have access to the data as soon as possible.

##Set up 

###Chrome Users: Start a simple local server

**Note: In order to test the comparison tool on your computer using Chrome, you must do it on local a server. If you open up the local file on Chrome, it won't work on your local computer. **

You can create your own python-based server by going to your Terminal, changing directory to your project's folder (by inputting the cd command), and inputting "python -m SimpleHTTPServer"

Then open it up by putting http://0.0.0.0:8000/ on your browser. It will automatically open up the index.html file.  

###Two-Level Comparison

This version includes two levels of comparison: county-level and town-level.

We used the latest Census five-year dataset along with the previous data five-year data set (2005-2009) for this example. 

**1. Clean up the dataset**

Make it similar to this example [here](https://github.com/CarlaAstudillo/comparison_tool/blob/master/Census/head-to-head_census_cards/data/sample_census_data.csv).

Make sure the dataset is in a nice spreadsheet with unique column names. Make sure that you have the two levels (in this case, county and town) in seperate columns. There is also a 'ledger style' column that includes the clean-up, standardized names of all cities and towns. Consider adding this column to your spreadsheet so that it can display


Try to do as many calculations as possible in the spreadsheet. For example, the sample spreadsheet includes the percent change of the latest vs. previous in its own unique column. In addition, if you want to include margin of error asterisks, calculate the margin of error percentage as it's own unique column. 

**Note:** The actual numbers themselves can be either strings or integers. However, if you're planning on putting a column through any kind of function (adding an moe asterisk or a plus/minus sign), make sure these numbers are integers. 

**2. Open up init.js**
   Change csv link to the correct csv name

	var url = "data/ultimate_census_data.csv"
   Change customize Margin of Error text. This text will be featured at the top of each card. You can move the position later on in the javascript.

	var moe_text = "<small>* Margin of Error is larger than 10 percent of the total value due to small sample size. Discretion is advised when interpreting data.</small>"

   ![County Name Columns](img/github_img/county_name_columns.png)	
   This part of the javascript file gets all of the unique county names in the county column and populates the county dropdown menu. Make sure it's the correct column name ("County")

   

**3. Where the magic happens**
   a.k.a the function that populates each card.
   ![Populate Cards Function](img/github_img/populate_cards_function.png)

   Let's break it down a bit. Using the Papa Parser earlier in the script, we turned the csv into a JSON array called entry. This function loops through all of entry to find the option picked on the dropdown. For more info on how that works, read through the comments in the javascript.
	function populate_cards(btn_value, thegrid, thedropdown) {
                $.each(entry, function(index, key) {
   Next, we initiate the if statement which goes through every row and sees if the btn_value matches either the county or the town. 
   ![If Statement](img/github_img/if_statement.png)
   Let's break it down even further.
    (btn_value == key["County"] && btn_value + " County" == key["ledgerstyle"])
   This first part tries to match the btn_value to both the "County" and the "ledgerstyle" column. If the county that the reader picked matches any row with the same county name in the "County" and "ledgerstyle" columns, it will return only that row.

     (btn_value == key["ledgerstyle"] && county1value == key["County"]) || (btn_value == key["ledgerstyle"] && county2value == key["County"]))
   This second part tries to match the btn_value, if a town is picked, to the "ledgerstyle" column. It also takes the county picked earlier and matches it to the "County" column. This is done so that towns with the same name, but different counties get picked correctly.

    var gridsquares = '<div class="element-item">'
   Initializes the variable `gridsquares` which we will keep adding on to until the end where we appened it to the html.

    gridsquares += '<p class="name">' + key["ledgerstyle"] + '</p>' + moe_text
   We add the name of the county or town and then the margin of error text that we defined earlier. You can change the html and customize as you wish, just remember to do it after '<div class="element-item">'

    gridsquares += '<img src="img/median_income.svg"><p class="crit">Household Median Income</p><table><thead><tr><th></th><th>2011-2015</th><th>2005-2009</th><th>Change</th></tr></thead><tbody><tr><td></td><td class="bolded">$' + key["median_income_latest"].toLocaleString() + moe_asterisk(key["median_income_moe_latest_per"]) + '</td><td class="bolded">$' + key["median_income_prev"].toLocaleString() + moe_asterisk(key["median_income_moe_prev_per"]) + '</td><td class="bolded">' + plus_minus(key["median_income_change"]) + key["median_income_change"].toFixed(1) + '%' + moe_asterisk(key["median_income_moe_latest_per"], key["median_income_moe_prev_per"]) + '</td></tr><tr><td class="separate separate2">NJ</td><td class="separate2">$' + key["nj_median_income_latest"].toLocaleString() + '</td><td class="separate2">$' + key["nj_median_income_prev"].toLocaleString() + '</td><td class="separate2">' + plus_minus(key["nj_median_income_change"]) + key["nj_median_income_change"].toFixed(1) + '%</td></tr><tr><td class="separate">US</td><td>$' + key["usa_median_income_latest"].toLocaleString() + '</td><td>$' + key["usa_median_income_prev"].toLocaleString() + '</td><td>' + plus_minus(key["usa_median_income_change"]) + key["usa_median_income_change"].toFixed(1) + '%</td></tr></tbody></table>'
   This part adds the html necessary for the first section of the card. It looks like this. 
   [IMG HERE]
   Change corresponding column names to the ones in your csv. Don't forget the `.toLocaleString()` after to add commas, if it's an integer. If, for some reason, your numbers are a string, add the function `addCommas()` to add commas to a string. For example:
    addCommas(key["homevalue_latest"])

   This function calculates the margin of error. You can input up to two numbers.
    moe_asterisk(key["median_income_moe_latest_per"], key["median_income_moe_prev_per"])

   The function is defined earlier in the script. As you can see, it takes the latest and previous margin of error percentage numbers and if they are higher than 10, it adds an asterisk. You can customized the function to whatever number you want.
   ![MOE Asterisk function](img/github_img/moe_asterisk.png)

   This function adds a plus or minus sign in front of percent change.
    plus_minus(key["nj_median_age_change"])

   The function is defined earlier in the script. It takes the percent change, and if it's higher than 0, it adds a plus sign.
   ![Plus Minus function](img/github_img/plus_minus_fct.png)

   You can also write your very own function, and add it to the tool.

   **4. Change the Intro Text**
   Open up the index.html file and edit the introductory text enclosed in intro_text div.

   ![Intro Text](img/github_img/intro_text1.png)

   In order for the introductory text to not look like a huge wall of text in mobile, I added a second intro_text div at the bottom of the html file. You can customize as you wish.

   **5. Change the CSS for mobile use**

   Don't forget to change the table headers for mobile use. If you added more columns to the tables, make sure to add another `td:nth-of-type` in the css. 

   ![CSS Change](img/github_img/css_change.png) 




##Possible Errors

Some data mixture of strings and integers
Check for names that are the same for County

