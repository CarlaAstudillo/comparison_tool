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

Make sure the dataset is in a nice spreadsheet with unique column names. Make sure that you have the two levels (in this case, county and town) in seperate columns. 


Try to do as many calculations as possible in the spreadsheet. For example, the sample spreadsheet includes the percent change of the latest vs. previous in its own unique column. In addition, if you want to include margin of error asterisks, calculate the margin of error percentage as it's own unique column. 

**Note:** The actual numbers themselves can be either strings or integers. However, if you're planning on putting a column through any kind of function (adding an moe asterisk or a plus/minus sign), make sure these numbers are integers. 

**2. Open up init.js and change some things**

*Change csv link to the correct csv name

	```var url = "data/ultimate_census_data.csv"```

*Change customize Margin of Error text. This text will be featured at the top of each card. You can move the position later on in the javascript.

	```var moe_text = "<small>* Margin of Error is larger than 10 percent of the total value due to small sample size. Discretion is advised when interpreting data.</small>"```	



Keep in mind, you can even though you can very easily write function that will calculate  
// County Town js
// MOE function or plus-minus fuction or any other fuction
// If numbers are strings, you can add Commas
// Write HTML write up


##Possible Errors

Some data mixture of strings and integers

