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
	"user_picture" : "http://2.bp.blogspot.com/_2Wu8I8m7mt4/SjQQTUSKDSI/AAAAAAAAB5o/RQGiQmah88w/s400/Las%2BMujeres%2BBellas%2Batontan%2Ba%2Blos%2BHombres.jpg",
	"interest_array" : [ interest2 ]
};
var person2 = {
	"user_id" : "002",
	"user_name" : "Luisa",
	"user_picture" : "http://3.bp.blogspot.com/_EZ16vWYvHHg/S8i6giSWMJI/AAAAAAAAKcY/Jx68RoB4fi4/s1600/Mujeres-Hermosas.jpg",
	"interest_array" : [ interest1, interest2, interest3 ]
};
var person3 = {
	"user_id" : "003",
	"user_name" : "America",
	"user_picture" : "http://sinfoniafantastica.files.wordpress.com/2007/06/hermosa.jpg",
	"interest_array" : [ interest1, interest2 ]
};
var person4 = {
	"user_id" : "004",
	"user_name" : "Ruby",
	"user_picture" : "http://t1.gstatic.com/images?q=tbn:ANd9GcQBcn_Iga1hftUgvIULB90uYfS0jTEd4wWvHvk3QDha8byhly_9jQ&t=1",
	"interest_array" : [ interest3 ]
};
var friend1 = {
	"user_id" : "201",
	"user_name" : "Magdalena",
	"user_picture" : "http://seduccionpeligrosav.com/wp-content/uploads/2011/12/tips-para-ligar-mujeres-hermosas.jpg",
	"person_array" : [ person1 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend2 = {
	"user_id" : "202",
	"user_name" : "Clodomira",
	"user_picture" : "http://globedia.com/imagenes/noticias/2012/2/29/jovencita-oriental-dice-haber-logrado-convertirse-barbie-version-humana_6_1114612.jpg",
	"person_array" : [ person2 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend3 = {
	"user_id" : "203",
	"user_name" : "Panfila",
	"user_picture" : "http://4.bp.blogspot.com/-LqSNS4PE264/UBGKmx0Jw1I/AAAAAAAACf8/WK5M_6B7Kws/s1600/bab.jpg",
	"person_array" : [ person3 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend4 = {
	"user_id" : "204",
	"user_name" : "Tomasa",
	"user_picture" : "http://www.garuyo.com/uploads/2012/3/mujeres-hermosas-del-mundo_114611.jpg_20444.670x503.jpg",
	"person_array" : [ person1, person2, person3 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend5 = {
	"user_id" : "205",
	"user_name" : "Loquenda",
	"user_picture" : "http://sinfoniafantastica.files.wordpress.com/2008/09/dani.jpg",
	"person_array" : [ person1, person3 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};
var friend6 = {
	"user_id" : "206",
	"user_name" : "Penelope",
	"user_picture" : "http://2.bp.blogspot.com/_J0NDYdehCds/TG7w5oQHT7I/AAAAAAAAQaY/4l3iYmpj7Zs/s400/chicas%2Bhermosas.jpg",
	"person_array" : [ person1, person2, person3, person4 ],
	"interest_array" : [],
	"interest_count" : 0,
	"person_count" : 0,
	"rank" : 0
};

var inputData = { "friend_array" : [ friend1, friend2, friend3, friend4, friend5, friend6 ] };

function loadFriends(data)
{
	$(".container").first().hide("fast", function showNext() {
		$(this).next(".container").hide("fast", showNext);
	});
	var friends = data["friend_array"];
	if(friends.length > 0)
	{
		friends = evaluateFriends(friends);
		friends = sortFriends(friends);
		for(var i in friends)
		{
			var box = createBox({friend:friends[i],hidden:true});
			$("#divFriends").append(box);
		}
		$(".container").first().show("fast", function showNext() {
			$(this).next(".container").show("fast", showNext);
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
				<img id="optionsItem_'+id+'_0" src="./resources/images/addFriend.png" class="optionsItem optionsItem-'+rank+'"> \
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
					<img id="interestItemImg_'+id+'_'+i+'" src="./resources/images/transparent.png" alt="'+interest['text']+'" class="interestItemImg interestItemImg-'+rank+'"> \
				</a> \
			</div> \
		';
	}
	element += '\
		</div> \
		<div id="pictureArea_'+id+'" class="pictureArea pictureArea-'+rank+'"> \
			<a href="#"> \
				<img id="pictureItem_'+id+'_0" src="'+pic+'" class="pictureItem pictureItem-'+rank+'" alt="'+name+'"> \
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
					<img id="personItemImg_'+id+'_'+i+'" src="'+person["user_picture"]+'" alt="'+person["user_name"]+'" class="personItemImg personItemImg-'+rank+'"> \
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