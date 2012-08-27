var minWidth = 60;
var maxWidth = 180;
var minHeight = 60;
var maxHeight = 180;
var INTEREST_SORT = 0;
var FRIENDS_SORT = 1;
var visSortBy = INTEREST_SORT;
var newPage = {
	"page_id" : "",
	"page_name" : ""
};
var newInterest = {
	"text" : "",
	"pages_array" : [],
	"color" : "#eeeeee"
};
var newPerson = {
	"user_id" : "",
	"user_name" : "",
	"user_picture" : "",
	"interest_array" : []
};
var newFriend = {
	"user_id" : "",
	"user_name" : "",
	"user_picture" : "",
	"person_array" : [],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var visInput = {
	"friend_array" : []
};