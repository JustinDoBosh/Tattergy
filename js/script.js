//global firebase reference
myFirebaseRef = new Firebase("https://tattergy.firebaseio.com/");


//******Create Users***************
function createStudent(){
	var f_name = $("#student_first_name").val();
	var l_name = $("#student_last_name").val();
	var university = $("#unversity").val();
	console.log("unversity" + unversity);
	var new_student_email = $("#student_email").val();
	var new_student_password = $("#student_password").val();
	var new_student_password_confirm = $("#student_password_confirm").val();

	if(new_student_password == new_student_password_confirm){
		myFirebaseRef.createUser({
		  email    : new_student_email,
		  password : new_student_password
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		   	saveStudentData(f_name, l_name, university, new_student_email);
		   	window.location.assign("index.html");
		  }
		});
	}else{
		alert("passwords don't match!");
	}
	
}
function createVenueOwner(){
	var f_name = $("#venue_owner_first_name").val();
	var l_name = $("#venue_owner_last_name").val();
	var venue_name = $("#venue_name").val();
	var new_venue_owner_email = $("#venue_owner_email").val();
	var new_venue_owner_password = $("#venue_owner_password").val();
	var new_venue_owner_password_confirm = $("#venue_owner_password_confirm").val();

	if(new_venue_owner_password == new_venue_owner_password_confirm){
		myFirebaseRef.createUser({
		  email    : new_venue_owner_email,
		  password : new_venue_owner_password
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		   	saveVenueOwnerData(f_name, l_name, venue_name, new_venue_owner_email);
		   	window.location.assign("index.html");
		  }
		});
	}else{
		alert("passwords don't match!");
	}
	
}


//********Login/Logout********************
function loginStudent(){
	var student_email = $("#student_email").val();
	var student_password = $("#student_password").val();

	myFirebaseRef.authWithPassword({
	  email    : student_email,
	  password : student_password
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    window.location.assign("student/index.html");
	  }
	});
}

function loginVenueOwner(){
	var venue_email = $("#venue_email").val();
	var venue_password = $("#venue_password").val();
	
	myFirebaseRef.authWithPassword({
	  email    : venue_email,
	  password : venue_password
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    window.location.assign("venue_owner/index.html");
	  }
	});
}

function isLoggedIn(){
	var authData = myFirebaseRef.getAuth();
	if (authData) {
	  console.log("User " + authData.uid + " is logged in with " + authData.provider);
	} else {
	  console.log("User is logged out");
	  window.location.assign("index.html");
	}
}

function logoutUser(){
	myFirebaseRef.unauth();
	window.location.assign("../index.html");
}


//**************Save user data*****************
function saveStudentData(f_name, l_name, university, email){
	var f_name = f_name;
	var l_name = l_name;
	var full_name = f_name + " " + l_name;
	var university = university;
	var email = email;

	var usersRef = myFirebaseRef.child("users");
	var studentRef = usersRef.child("students");
	studentRef.push({
	    first_name: f_name,
	    last_name: l_name,
	    school_name: university,
	    student_email: email
	});
}

function saveVenueOwnerData(f_name, l_name, venue_name, email){
	var f_name = f_name;
	var l_name = l_name;
	var full_name = f_name + " " + l_name;
	var venue_name = venue_name;
	var email = email;

	var usersRef = myFirebaseRef.child("users");
	var venueOwnersRef = usersRef.child("venue_owners");

	venueOwnersRef.push({
		    first_name: f_name,
		    last_name: l_name,
		    venue: venue_name,
		    venue_owner_email: email
	});
}


//*******Layout functionality****************
function show_student_form(){
	$("#venue_owner_register_form").removeClass("show_form");
	$("#venue_owner_register_form").addClass("hide_form");
	$("#student_register_form").removeClass("hide_form");
	$("#student_register_form").addClass("show_form");
	$("#venue_owner_register_link").removeClass("invertedBtn");
	$("#student_register_link").addClass("invertedBtn");
}

function show_venue_owner_form(){
	$("#student_register_form").removeClass("show_form");
	$("#student_register_form").addClass("hide_form");
	$("#venue_owner_register_form").removeClass("hide_form");
	$("#venue_owner_register_form").addClass("show_form");
	$("#student_register_link").removeClass("invertedBtn");
	$("#venue_owner_register_link").addClass("invertedBtn");
}

//*************Create New Event***********
function createNewEvent(){
	//Get Form Inputs
	var venue_name = $("#venue_name").val();
	var name = $("#event_name").val();
	var date = $("#event_date").val();
	var cover_girls = $("#event_cover_girls").val();
	var cover_guys = $("#event_cover_guys").val();
	var time_start = $("#event_time_start").val();
	var time_end = $("#event_time_end").val();
	var address = $("#event_address").val();
	var city = $("#event_city").val();
	var state = $("#event_state").val();
	var zipcode = $("#event_zipcode").val();
	var website = $("#event_website").val();
	var phone = $("#event_phone").val();
	var description = $("#event_description").val();

	var eventsRef = myFirebaseRef.child("events");
	eventsRef.push({
		event_venue_name: venue_name,
	    event_name: name,
	    event_date: date,
	    event_cover_girls: cover_girls,
	    event_cover_guys: cover_guys,
	    event_time_start: time_start,
	    event_time_end: time_end,
	    event_address: address,
	    event_city: city,
	    event_state: state,
	    event_zipcode: zipcode,
	    event_website: website,
	    event_phone: phone,
	    event_description: description
	});

	location.reload();
}

//**********display event data*************
function displayEvents(){
	var displayEventsRef = new Firebase("https://tattergy.firebaseio.com/events");

	displayEventsRef.on("value", function(snapshot) {
		var data = snapshot.val();
		var count = 0;
		for (var key in data) {
			count++;
		   if (data.hasOwnProperty(key)) {
		       var obj = data[key];
		        for (var prop in obj) {
		          // important check that this is objects own property 
		          // not from prototype prop inherited
		          if(obj.hasOwnProperty(prop)){
		            //console.log(prop + " = " + obj[prop]);
		            var event_prop = prop;
		            
		            switch (event_prop){
		            	
		               case 'event_venue_name': 
		               	var name = "#displayEventVenueName" + count;
		               	var str = "<option id='" + count + "' >" + obj[prop] + "</option>";
        				$("#guestListDropDown").append(str);
        				$("#VIPGuestListDropDown").append(str);
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_name': 
		               	var name = "#displayEventName" + count;
		              	$(name).text(obj[prop]);
		               break;
		            
		               case 'event_date': 
		               	var name = "#displayEventDate" + count;
		              	$(name).text(obj[prop]);
		               break;
		            
		               case 'event_cover_girls': 
		               	var name = "#displayEventCoverGirls" + count;
		              	$(name).text(obj[prop]);
		               break;
		            
		               case 'event_cover_guys': 
		               	var name = "#displayEventCoverGuys" + count;
		              	$(name).text(obj[prop]);
		               break;
		            
		               case 'event_time_start': 
		               	var name = "#displayEventStartTime" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_time_end': 
		               	var name = "#displayEventEndTime" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_address': 
		               	var name = "#displayEventAddress" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_city': 
		               	var name = "#displayEventCity" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_state':
		              	var name = "#displayEventState" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_zipcode': 
		               	var name = "#displayEventZipcode" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_website':
		               var name = "#displayEventWebsite" + count;
		              	$(name).text(obj[prop]);
		               break;

		               case 'event_phone':
		               	var name = "#displayEventPhone" + count;
		              	$(name).text(obj[prop]); 
		               break;

		               case 'event_description': 
		               	var name = "#eventDisplayDescription" + count;
		              	$(name).text(obj[prop]); 
		               break;

		               default:  
		               console.log("Error; prop not found!")
		            }//End Switch
		          }
		       }
		    }
		}//For loop to iterate through objects
	  //console.log(snapshot.val());
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}

//************Add Student to Guest List******
function guestList(){
	var f_name = $("#GuestList_f_name").val();
	var l_name = $("#GuestList_l_name").val();
	var venue_name_txt = $( "#guestListDropDown option:selected" ).text();

	var guestListRef = myFirebaseRef.child("guestList");
	guestListRef.push({
		venue_name: venue_name_txt,
		first_name: f_name,
		last_name: l_name
	});
	
}

//***********Add Student to VIP Guest List*****
function VIPGuestList(){
	var f_name = $("#VIPGuestList_f_name").val();
	var l_name = $("#VIPGuestList_l_name").val();
	var venue_name_txt = $( "#VIPGuestListDropDown option:selected" ).text();

	var VIPGuestListRef = myFirebaseRef.child("VIPGuestList");
	VIPGuestListRef.push({
		venue_name: venue_name_txt,
		first_name: f_name,
		last_name: l_name
	});
}



function createEventViewElements(){

	var eventContentWrapper = document.createElement("div");
	eventContentWrapper.className = "col-sm-6 col-md-4";
	eventContentWrapper.id = "eventContentWrapper";
	$("#displayEventContainer").append(eventContentWrapper);

	var eventContentThumbnail = document.createElement("div");
	eventContentThumbnail.className = "thumbnail";
	eventContentThumbnail.id = "eventContentThumbnail";
	$("#eventContentWrapper").append(eventContentThumbnail);

	var venueNameh4 = document.createElement("h4");
	venueNameh4.className = "text-center";
	venueNameh4.id = "venueNameheading4";
	$("#eventContentThumbnail").append(venueNameh4);

	var venueNameSpan = document.createElement("span");
	venueNameSpan.className = "label label-info";
	venueNameSpan.id = "displayEventVenueName2";
	$("#venueNameheading4").append(venueNameSpan);

	var eventDisplayImage = document.createElement("img");
	eventDisplayImage.className = "img-responsive";
	eventDisplayImage.id = "eventDisplayImage";
	eventDisplayImage.src = "http://placehold.it/650x450&text=Event Name";
	$("#eventContentThumbnail").append(eventDisplayImage);

	var eventDisplayCaption = document.createElement("div");
	eventDisplayCaption.className = "caption";
	eventDisplayCaption.id = "eventDisplayCaption";
	$("#eventContentThumbnail").append(eventDisplayCaption);

	var eventDisplayRow = document.createElement("div");
	eventDisplayRow.className = "row";
	eventDisplayRow.id = "eventDisplayRow";
	$("#eventDisplayCaption").append(eventDisplayRow);

	var eventDisplayContentLeft = document.createElement("div");
	eventDisplayContentLeft.className = "col-md-6 col-xs-6";
	eventDisplayContentLeft.id = "eventDisplayContentLeft";
	$("#eventDisplayRow").append(eventDisplayContentLeft);

	var eventDisplayContentGirlCover = document.createElement("p");
	eventDisplayContentGirlCover.id = "eventDisplayContentGirlCover";
	$("#eventDisplayContentLeft").append(eventDisplayContentGirlCover);

	var eventDisplayContentGirlCoverSpan = document.createElement("span");
	eventDisplayContentGirlCoverSpan.id = "displayEventCoverGirls2";
	$("#eventDisplayContentGirlCover").append(eventDisplayContentGirlCoverSpan);

	var eventDisplayContentGuyCover = document.createElement("p");
	eventDisplayContentGuyCover.id = "eventDisplayContentGuyCover";
	$("#eventDisplayContentLeft").append(eventDisplayContentGuyCover);

	var eventDisplayContentGuyCoverSpan = document.createElement("span");
	eventDisplayContentGuyCoverSpan.id = "displayEventCoverGuys2";
	$("#eventDisplayContentGuyCover").append(eventDisplayContentGuyCoverSpan);

	var eventDisplayWebsite = document.createElement("p");
	eventDisplayWebsite.id = "eventDisplayWebsite2";
	$("#eventDisplayContentLeft").append(eventDisplayWebsite);

	var eventDisplayPhone = document.createElement("p");
	eventDisplayPhone.id = "eventDisplayPhone2";
	$("#eventDisplayContentLeft").append(eventDisplayPhone);

	var eventDisplayContentRight = document.createElement("div");
	eventDisplayContentRight.className = "col-md-6 col-xs-6 price";
	eventDisplayContentRight.id = "eventDisplayContentRight";
	$("#eventDisplayRow").append(eventDisplayContentRight);

	var eventDisplayDate = document.createElement("p");
	eventDisplayDate.id = "eventDisplayDate";
	$("#eventDisplayContentRight").append(eventDisplayDate);

	var eventDisplayDateSpan = document.createElement("span");
	eventDisplayDateSpan.id = "displayEventDate2";
	$("#eventDisplayDate").append(eventDisplayDateSpan);

	var eventDisplayTime = document.createElement("p");
	eventDisplayTime.id = "eventDisplayTime";
	$("#eventDisplayContentRight").append(eventDisplayTime);

	var eventDisplayTimeStartSpan = document.createElement("span");
	eventDisplayTimeStartSpan.id = "displayEventStartTime2";
	$("#eventDisplayTime").append(eventDisplayTimeStartSpan);

	var eventDisplayTimeEndSpan = document.createElement("span");
	eventDisplayTimeEndSpan.id = "displayEventEndTime2";
	$("#eventDisplayTime").append(eventDisplayTimeEndSpan);

	var eventDisplayAddress = document.createElement("address");
	eventDisplayAddress.id = "eventDisplayAddress";
	$("#eventDisplayContentRight").append(eventDisplayAddress);

	var eventDisplayAddressInfo = document.createElement("span");
	eventDisplayAddressInfo.id = "displayEventAddress2";
	$("#eventDisplayAddress").append(eventDisplayAddressInfo);

	var eventDisplayAddressCity = document.createElement("span");
	eventDisplayAddressCity.id = "displayEventCity2";
	$("#eventDisplayAddress").append(eventDisplayAddressCity);

	var eventDisplayAddressState = document.createElement("span");
	eventDisplayAddressState.id = "displayEventState2";
	$("#eventDisplayAddress").append(eventDisplayAddressState);

	var eventDisplayAddressZipcode = document.createElement("span");
	eventDisplayAddressZipcode.id = "displayEventZipcode2";
	$("#eventDisplayAddress").append(eventDisplayAddressZipcode);

	var eventDisplayDescription = document.createElement("p");
	eventDisplayDescription.id = "eventDisplayDescription2";
	$("#eventDisplayRow").append(eventDisplayDescription);

	var eventDisplayBottomRow = document.createElement("div");
	eventDisplayBottomRow.className = "row";
	eventDisplayBottomRow.id = "eventDisplayBottomRow";
	$("#eventDisplayRow").append(eventDisplayBottomRow);

	var eventDisplayGuestListBtnContainer = document.createElement("div");
	eventDisplayGuestListBtnContainer.className = "col-md-6";
	eventDisplayGuestListBtnContainer.id = "eventDisplayGuestListBtnContainer";
	$("#eventDisplayRow").append(eventDisplayGuestListBtnContainer);

	var eventDisplayGuestListBtn = document.createElement("a");
	eventDisplayGuestListBtn.className = "btn btn-primary btn-product";
	eventDisplayGuestListBtn.id = "eventDisplayGuestListBtn";
	$("#eventDisplayGuestListBtnContainer").append(eventDisplayGuestListBtn);
	$("#eventDisplayGuestListBtn").text("Join Guest List");

	var eventDisplayVIPListBtnContainer = document.createElement("div");
	eventDisplayVIPListBtnContainer.className = "col-md-6";
	eventDisplayVIPListBtnContainer.id = "eventDisplayVIPListBtnContainer";
	$("#eventDisplayRow").append(eventDisplayVIPListBtnContainer);

	var eventDisplayVIPtListBtn = document.createElement("a");
	eventDisplayVIPtListBtn.className = "btn btn-success btn-product";
	eventDisplayVIPtListBtn.id = "eventDisplayVIPtListBtn";
	$("#eventDisplayVIPListBtnContainer").append(eventDisplayVIPtListBtn);
	$("#eventDisplayVIPtListBtn").text("Join VIP List");
}
































