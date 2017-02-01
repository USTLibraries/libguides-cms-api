/*  ============================================================================================
    ********************************************************************************************
        CUSTOM API FUNCTIONS
    ********************************************************************************************
	
	The first section (XML REQUEST FUNCTIONS) provides the core request and is called by 
	"getSomeData" functions. Leave it as is and add custom functions below (documentation follows)
	
*/

	//  ****************************************************************************************
	//  BEGIN XML REQUEST FUNCTIONS - TRY NOT TO MODIFY - ADD CUSTOM FUNCTIONS IN SECTION BELOW
	//  https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
	
	function xhrSuccess () { this.callback.apply(this, this.arguments); }
	
	function xhrError () { console.error(this.statusText); }
	
	function loadFile (sURL, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
		var oReq = new XMLHttpRequest();
		oReq.callback = fCallback;
		oReq.arguments = Array.prototype.slice.call(arguments, 2);
		oReq.onload = xhrSuccess;
		oReq.onerror = xhrError;
		oReq.open("get", sURL, true);
		oReq.send(null);
	}
	
	//  END XML REQUEST FUNCTIONS - TRY NOT TO MODIFY - ADD CUSTOM FUNCTIONS IN SECTION BELOW
	//  ****************************************************************************************
	
	//  ****************************************************************************************
	//  ADD CUSTOM API FUNCTIONS BELOW THIS COMMENT BLOCK:
	
	/**
	 * ASYNCHRONOUS CUSTOM FUNCTIONS for APIs
	 *
	 * The functions use callbacks so that processing is not held up as we wait on data requests.
	 * Since we want to reuse filteredSubjectLists and the like, this creates a data handoff procedure.
	 * 
	 * EXAMPLE of our hand-off/callback functions:
	 *
	 * generatePageElement();
	 *   --> calls getSomeData(display) and defines and passes it the display function to call when data requests and processing done
	 *
	 * getSomeData()
	 *   --> calls loadFile(url, process, data) and defines and passes it the processing function and also display function to call after requested data is received
	 *
	 * TEMPLATES
	 * 
	 * Use the template code below to follow the callback format:
	 
	   function generatePageElement() {
		 var display = function() {
			 // code to generate html/display format
		 };
		 
		 getSomeData(display);
	   }
	   
	   function getSomeData(display) {
		   var url = "https://api.example.com/clients";
		   var process = function(callback) {
			   var jsontext = JSON.parse(this.responseText);
			   // any additional processing here (optional)
			   
			   callback(jsontext);
		   };
		   
		   loadFile(url, process, display);
		   
	   }
	 */
	 
	//  ****************************************************************************************
	// CUSTOM FUNCTIONS BELOW:
	
	/**
	 * getLibGuideFilteredSubjectList - a "getSomeData" function
	 *
	 * Reusable function to request a filtered Subject List from LibGuides to be displayed by a function (callback)
	 * 
	 * Makes the request to loadFile() and passes along the next two functions to hand data off to
	 * 
	 */
	function getLibGuideFilteredSubjectList(display) {
		// The URL we use to request API data
		var url = "https://lgapi.libapps.com/1.1/subjects?site_id=[yoursiteID]&key=[yourkey]&guide_published=2";
		
		// Define the function we want to use to process the data, accepting a callback function as a parameter (which will be pased to it later)
		var process = function(callback) {
			var jsontext = JSON.parse(this.responseText);
			var data = [];
			var re = /^(21275|21274)$/;	// Subject IDs to filter out: 21275 - Citing Sources, 21274 - Course Guides - Add new ones to the regex as needed, separate with |
	
			// iterate through and filter out the ones we don't want
			if (jsontext.length > 0) {
				for (i = 0; i < jsontext.length; i++) {
					if ( !re.test(jsontext[i].id) ) {
						data.push(jsontext[i]);
					}
				}
			}
			
			callback(data);
		}; // end callback processing function
		
		// The actual call to the loadFile, passing the two functions we wish to execute
		loadFile (url, process, display /*, argumentToPass1, argumentToPass2, etc. */)
	}
	
	/**
	 * generateDbSubjectList - a "generatePageElement" function
	 * 
	 * Function that calls upon getLibGuideFilteredSubjectList and hands it the function to use to display in the end
	 *
	 */
	
	function generateDbSubjectList() {
		
		// Define the function we will callback to actually display the HTML formatted data in the end
		var display = function(data) {
			var div = document.getElementById("dbSubjectList"); // this is where it goes on the page, must have a placeholder ready
			var ul = document.createElement("UL"); // start the UL structure
			
			// go through and add the LI > A elements to UL
			if( data.length > 0) {
				for (i = 0; i < data.length; i++) {
					var li = document.createElement("LI");
					var a = document.createElement("A");
					li.appendChild(a);
					
					a.href = "http://yourlibguides.edu/az.php?s="+data[i].id;
					a.setAttribute("data-category","Library Resource");                   // this attribute is used for site analytics tracking
					a.setAttribute("data-action","Library Discovery Tool");               // this attribute is used for site analytics tracking
					a.setAttribute("data-label","Library Db Subject ("+data[i].name+")"); // this attribute is used for site analytics tracking
					a.setAttribute("target","_blank");
					a.innerHTML = data[i].name;
					
					ul.appendChild(li);
				}
			}
			
			// place the UL in the page within the placeholder
			div.appendChild(ul);
			
		}; // end callback display function
		
		// The actual call to get things started
		getLibGuideFilteredSubjectList(display); // in the end, give the data to display function (defined above)
	}	
	
	// DATABASES

	/**
	 * getDatabases - a "getSomeData" function
	 *
	 * Reusable function to request the list of databases to be used by a function (callback)
	 * 
	 * Makes the request to loadFile() and passes along the next two functions to hand data off to
	 * 
	 */
	function getDatabases(display) {
		// The URL we use to request API data
		var url = "https://lgapi.libapps.com/1.1/assets?site_id=[yoursiteID]&key=[yourkey]&asset_types=10";
		
		// Define the function we want to use to process the data, accepting a callback function as a parameter (which will be pased to it later)
		var process = function(callback) {
			var jsontext = JSON.parse(this.responseText);
			var data = [];
			//var re = /^(21275|21274)$/;	// Subject IDs to filter out: 21275 - Citing Sources, 21274 - Course Guides - Add new ones to the regex as needed, separate with |
	
			// iterate through and filter out the ones we don't want
			if (jsontext.length > 0) {
				for (i = 0; i < jsontext.length; i++) {
					/* if ( !re.test(jsontext[i].id) ) { // filtering
						data.push(jsontext[i]);
					} */
					data.push(jsontext[i]); // not filtering
				}
			}
			
			callback(data);
		}; // end callback processing function
		
		// The actual call to the loadFile, passing the two functions we wish to execute
		loadFile (url, process, display /*, argumentToPass1, argumentToPass2, etc. */)
	}
	
	/**
	 * generateDatabaseList - a "generatePageElement" function
	 * 
	 * Function that calls upon getDatabases and hands it the function to use to display in the end
	 *
	 */
	
	function generateDatabaseList() {
				
		// Define the function we will callback to actually create the array the end
		var display = function(data) {

			  var dbInfo = function ( dbName, dbLink, dbDesc ) { 
				  this.label = dbName; 
				  this.value = dbLink; 
				  this.description = dbDesc; 
			  }  
			
			// go through and add the LI > A elements to UL
			if( data.length > 0) {
				for (i = 0; i < data.length; i++) {
					
					var dbName = data[i].name;	
					var dbLink = "http://yourlibguides.edu/go.php?c="+data[i].id;
					var dbDesc = data[i].description;
		
					dbArray.push (new dbInfo(dbName,dbLink,dbDesc));

				}
			}
			
			
		}; // end callback display function
		
		// The actual call to get things started
		getDatabases(display); // in the end, give the data to display function (defined above)
	}	
	
/*  ********************************************************************************************
        END -- CUSTOM API FUNCTIONS
    ********************************************************************************************
    ============================================================================================ 
*/