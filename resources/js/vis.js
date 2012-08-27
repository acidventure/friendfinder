var page1 = {
	"page_id" : "101",
	"page_name" : "Pagina del poli"
};
var page2 = {
	"page_id" : "102",
	"page_name" : "Pagina de la unam"
};
var page3 = {
	"page_id" : "103",
	"page_name" : "Pagina del ESCOM"
};
var interest1 = {
	"text" : "POLI",
	"pages_array" : [ page1 ],
	"color" : "#003366"
};
var interest2 = {
	"text" : "UNAM",
	"pages_array" : [ page2 ],
	"color" : "#6699cc"
};
var interest3 = {
	"text" : "ESCOM",
	"pages_array" : [ page3 ],
	"color" : "#feefbb"
};
var person1 = {
	"user_id" : "001",
	"user_name" : "Maria",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"interest_array" : [ interest2 ]
};
var person2 = {
	"user_id" : "002",
	"user_name" : "Luisa",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"interest_array" : [ interest1, interest2, interest3 ]
};
var person3 = {
	"user_id" : "003",
	"user_name" : "America",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"interest_array" : [ interest1, interest2 ]
};
var person4 = {
	"user_id" : "004",
	"user_name" : "Ruby",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"interest_array" : [ interest3 ]
};
var friend1 = {
	"user_id" : "201",
	"user_name" : "Magdalena",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"person_array" : [ person1 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend2 = {
	"user_id" : "202",
	"user_name" : "Clodomira",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"person_array" : [ person2 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend3 = {
	"user_id" : "203",
	"user_name" : "Panfila",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"person_array" : [ person3 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend4 = {
	"user_id" : "204",
	"user_name" : "Tomasa",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"person_array" : [ person1, person2, person3 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend5 = {
	"user_id" : "205",
	"user_name" : "Loquenda",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"person_array" : [ person1, person3 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend6 = {
	"user_id" : "206",
	"user_name" : "Penelope",
	"user_picture" : "http://www.boomer-ezine.com/images/Mexico-Map.jpg",
	"person_array" : [ person1, person2, person3, person4 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};

var inputData = { "friend_array" : [ friend1, friend2, friend3, friend4, friend5, friend6 ] };

function loadFriends(data)
{
	$(".container").removeClass("container").addClass("oldContainer");
	$(".oldContainer").first().hide("fast", function showNext() {
		var next = $(this).next(".oldContainer");
		$(this).detach();
		next.hide("fast", showNext);
	});
	var friends = data["friend_array"];
	if(friends.length > 0)
	{
		friends = evaluateFriends(friends);
		friends = sortFriends(friends);
		for(var i in friends)
		{
			var box = createBox({friend:friends[i],hidden:false});
			$("#divFriends").append(box);
		}
		$(".container").first().show("fast", function showPrev() {
			$(this).next(".container").show("fast", showPrev);
		  });
	}
}

function createBox(data)
{
	var friend = data["friend"];
	var rank = parseInt(friend["rank"]*10);
	var id = friend["user_id"];
	var name = friend["user_name"];
	var pic = friend["user_picture"];
	var element = ' \
	<div style="'+(typeof data["hidden"] == 'undefined'?'':data["hidden"]?'display:none':'')+'" id="container_'+id+'" class="container container-'+rank+'"> \
		<div id="optionsArea_'+id+'" class="optionsArea optionsArea-'+rank+'"> \
			<a href="javascript:addFriend('+id+');"> \
				<img width="30" height="30" id="optionsItem_'+id+'_0" src="./resources/images/addFriend.png" class="optionsItem optionsItem-'+rank+'"> \
			</a> \
		</div> \
		<div id="interestArea_'+id+'" class="interestArea interestArea-'+rank+'"> \
		';
	for(var i in friend["interest_array"])
	{
		var interest = friend["interest_array"][i];
		element += '\
			<div id="interestItem_'+id+'_'+i+'" class="interestItem interestItem-'+rank+'" style="background-color:'+interest['color']+'"> \
				<a href="#"> \
					<img width="30" height="30" id="interestItemImg_'+id+'_'+i+'" src="./resources/images/transparent.png" alt="'+interest['text']+'" class="interestItemImg interestItemImg-'+rank+'"> \
				</a> \
			</div> \
		';
	}
	element += '\
		</div> \
		<div id="pictureArea_'+id+'" class="pictureArea pictureArea-'+rank+'"> \
			<a href="#"> \
				<img height="'+((friend["rank"]*(maxHeight-minHeight))+minHeight)+'" id="pictureItem_'+id+'_0" src="'+pic+'" class="pictureItem pictureItem-'+rank+'" alt="'+name+'"> \
			</a> \
		</div> \
		<div id="personArea_'+id+'" class="personArea personArea-'+rank+'"> \
		';
	for(var i in friend["person_array"])
	{
		var person = friend["person_array"][i];
		element += '\
			<div id="personItem_'+id+'_'+i+'" class="personItem personItem-'+rank+'" > \
				<a href="#"> \
					<img width="30" height="30" id="personItemImg_'+id+'_'+i+'" src="'+person["user_picture"]+'" alt="'+person["user_name"]+'" class="personItemImg personItemImg-'+rank+'"> \
				</a> \
			</div> \
		';
	}
	element += '\
		</div> \
	</div> \
	';
	return element;
}

function evaluateFriends(friends)
{
	for(var i in friends)
	{
		var arrInterest = {};
		var friend = friends[i];
		friend["person_count"] = 0;
		friend["interest_count"] = 0;
		friend["interest_array"] = [];
		friend["person_count"] = friend["person_array"].length;
		for(var j in friend["person_array"])
		{
			var person = friend["person_array"][j];
			for(var k in person["interest_array"])
			{
				var interest = person["interest_array"][k];
				if(typeof arrInterest[interest["text"]] == 'undefined')
				{
					arrInterest[interest["text"]] = true;
					friend["interest_array"].push(interest);
				}
			}
		}
		friend["interest_count"] = friend["interest_array"].length;
		friends[i] = friend;
	}
	return friends
}

function sortFriends(friends)
{
	var db = new TAFFY(friends);
	var max = 0;
	var min = 0;
	if(visSortBy == INTEREST_SORT)
	{
		friends = db().order("interest_count desc, person_count desc").get();
		max = friends[0]["interest_count"];
		min = friends[friends.length-1]["interest_count"];
		for(var i in friends)
		{
			friends[i]["rank"] = friends[i]["interest_count"] / max;
		}
	}
	else if(visSortBy == FRIENDS_SORT)
	{
		friends = db().order("person_count desc, interest_count desc").get();
		max = friends[0]["person_count"];
		min = friends[friends.length-1]["person_count"];
		for(var i in friends)
		{
			friends[i]["rank"] = friends[i]["person_count"] / max;
		}
	}
	return friends;
}