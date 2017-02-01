# libguides-cms-api
Basic API calls to LibGuides CMS to display database and subject lists.

This is a quick post to GitHub as an example was requested. The documentation (and code) is not polished but is in production on our library website (www.stthomas.edu/libraries). Copy and use the code for your own means to get your own API calls to LibGuides CMS up and running.

Make sure to update all instances of the following:
//yourlibguides.edu with your libguides domain
[yourkey] with your LibGuides API key
[yoursiteID] with your LibGuides Site ID

NOTE: within the function getLibGuideFilteredSubjectList() there is a regex (re = /^(21275|21274)$/ ) that will filter out subjects with those two IDs. Change this to meet your criteria. To filter one: /^(21275)$/ To filter two: /^(21275|21274)$/ To filter three: /^(21275|21274|76355)$/ These are regular expressions and you should begin to see the pattern, just separate the list by a pipe "|" symbol.

In the JS code the first three functions (xhrSuccess, xhrError, loadFile) are the core and are to be used within any custom function you create. In the comments there are two sample functions (generatePageElement() and getSomeData()) that can be used as templates as you make your own code. 

There are then some working, example functions listed in the code.

So, update the code, place it on the web, add the script tag, and add the HTML from libguides-cms-api.html to your page (you can customize it, of course). The example code in the HTML document uses the generateDbSubjectList().

Again, this was just a quick and dirty post, hopefully the comments in the code helps. 
