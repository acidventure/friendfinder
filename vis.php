<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="./resources/css/vis.css">
	</head>
	<body>
		<script type="text/javascript" src="./resources/js/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="./resources/js/taffy.js"></script>
		<script type="text/javascript" src="./resources/js/shared.js"></script>
		
		<script type="text/javascript" src="./resources/js/vis.js"></script>
		<input value="Order by Interest" type="button" onclick="visSortBy = INTEREST_SORT;loadFriends(inputData)">
		<input value="Order by Contacts" type="button" onclick="visSortBy = FRIENDS_SORT;loadFriends(inputData)">
		<div id="divFriends" class="principal"></div>
	</body>
</html>