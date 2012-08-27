<?php
	include_once "fbmain-dev.php";
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Friend Finder</title>
    
    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/flick/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="resources/css/jquery.tagit.css">
    
	<script type="text/javascript" src="resources/js/jquery-1.8.0.min" charset="utf-8"></script>  
	<script type="text/javascript" src="resources/js/jquery-ui-1.8.17.custom.min" charset="utf-8"></script>  
    <script type="text/javascript" src="resources/js/tag-it.js" charset="utf-8"></script>

</head>
<body>
	<div id="fb-root"></div>
	<header>
		<h1>Friend Finder</h1>
	</header>
    
	<section>
    	<article id="not-available" style="display:block;"> 
                <a id='fb-login' href="#" class="">Ingresar</a>
                <video id="first_video" width="500" height="400" controls>
                    <source src="video.mp4" type="video/mp4" codec='avc1, mp4a' />
                    <source src="video.webm" type="video/webm" codec='vp8,vorbis' />
                </video>        
        </article>
		<article id="available" style="display:block">
			<form>
		    <ul id="tags"></ul>
	        <input type="submit" value="Submit">
	    	</form>
		</article>
	</section>
    
	<footer>
		Footer
	</footer>
    
    
    <script>
	    $(function(){

            // tags
			var keyTags = $('#tags');
            keyTags.tagit({
			    itemName: 'item',
			    fieldName: 'tags',
				allowSpaces: true,
				onTagAdded: function(event, tag) {
					getPages(keyTags.tagit('tagLabel', tag));
					//$("#mytags").tagit("assignedTags");//metodo para extraer todas las tags
				}
		    });
			
			//Obtiene los IDs de las paginas
			function getPages(tag){
				console.log('se agrego: '+ tag);
				FB.api('/search', {q: tag, type: 'page'}, function(response) {
					//Response nos trae un arreglo con los resultados de la busqueda
					console.log(response);
					$.each(response.data, function(i, element){
						console.log('nombre:' + element.name + ' - ID: '+element.id);
					});
				});
			}
			// /tags
            
	    });
	</script>
    
    <!-- - - - - - - - - - - - - - - - - - - - - -  Facebook Scripts - - - - - - - - - - - - - - - - - - - -->
     <script>
       
        var uid; //Id del usuario
	    var accessToken; //token de acceso
		var userProfile;	//perfil del usuario
		var allFriends;		//Lista de amigos
		
	    window.fbAsyncInit = function() {
			FB.init({
			 appId  : '<?php echo $fbconfig['appid']?>',
			 status : true, // check login status
			 cookie : true, // enable cookies to allow the server to access the session
			 xfbml  : true  // parse XFBML
		   	});
		   
		    FB.getLoginStatus(function(response) {	
				
				//Funcion para el boton de Logueo en caso de que no este registrado
				$('#fb-login').click(function (response) {
					FB.login(function(response) {
						if (response.authResponse) {
							uid = response.authResponse.userID;
							accessToken = response.authResponse.accessToken;
							initLogged();
							$('#not-available').css('display', 'none');
						} else {
							//si el usuario cancelo o no garantizo su coneccion
							$('#not-available').css('display', 'block');
						}
					}, {scope:'<?php echo $fbconfig['scope']; ?>'});  	
				}); 
				console.log(response.status);
				
				//Revisa estado del login	
			  	if (response.status === 'connected') {
					uid = response.authResponse.userID;
					accessToken = response.authResponse.accessToken;
					initLogged();
				 	$('#not-available').css('display', 'none');
					
				// Si el usuario no esta logueado en Facebook.
			  	} else if (response.status === 'not_authorized') {
				 	$('#not-available').css('display', 'block');
			  	} else {
					$('#not-available').css('display', 'block');
			  	}		  
			});
			
			//Star Actions if the user are logged 
			function initLogged(){
				getFriends();
				FB.api('/me', function(response) {
					if (!response || response.error) {
					} else {
					  userProfile = response;
					  console.log(userProfile.name);
					}
				});
			}
			
			//Funcion para obtener a todos los amigos
		    function getFriends(){
				FB.api('/me/friends', { fields: 'name,id' }, function(result) {
					if (!result || result.error) {
						// alert('Error occured');
						 getFriends();
					} else {
						 allFriends=result.data;
						 var j = 0;
						 $.each(allFriends, function(i, element){
							j++;
						});
						console.log("Numero de amigos: "+j);
					}
				});
			}		
		}
		
		function friendRequest(){
			FB.ui(
			 { 
			  method: 'friends.add', 
			  id: 664131721//,100002179112377] // assuming you set this variable previously...
			 }, 
			 function(param){
		
			  console.log(param);
			 }
			);
		}

		// Load the SDK Asynchronously
		(function(d){
		 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement('script'); js.id = id; js.async = true;
		 js.src = "//connect.facebook.net/es_ES/all.js";
		 ref.parentNode.insertBefore(js, ref);
		}(document));
    </script>
     
    
</body>
</html>