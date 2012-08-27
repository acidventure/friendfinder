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
    
    <link rel="stylesheet" href="resources/css/token-input.css" type="text/css" />
    <link rel="stylesheet" href="resources/css/token-input-facebook.css" type="text/css" />
    
	<script type="text/javascript" src="resources/js/jquery-1.8.0.min" charset="utf-8"></script>  
	<script type="text/javascript" src="resources/js/jquery-ui-1.8.17.custom.min" charset="utf-8"></script>  
    
    <script type="text/javascript" src="resources/js/tag-it.js" charset="utf-8"></script>
    <script type="text/javascript" src="resources/js/jquery.tokeninput.js" charset="utf-8"></script>

</head>
<body>
	<div id="fb-root"></div>
    
	<header>
		<h1>Friend Finder</h1>
	</header>
    
	<section style="width: 700px;">
    	<article id="not-available" style="display:block;"> 
                <a id='fb-login' href="#" class="">Ingresar</a>
                <hr>
                <video id="first_video" width="500" height="400" controls>
                    <source src="video.mp4" type="video/mp4" codec='avc1, mp4a' />
                    <source src="video.webm" type="video/webm" codec='vp8,vorbis' />
                </video>        
        </article>
		<article id="available" style="display:none;">
		    
            Palabra clave:
            <ul id="tags"></ul>
            Personas clave:
            <input type="text" id="key-friends" name="Key Friend List" />
            
		</article>
	</section>
                

	<!--<footer>
		Footer
	</footer>
    -->
    
    
    <script>
	    $(function(){

            // Inicializa las Etiquetas que se buscaran
			var keyTags = $('#tags');
            keyTags.tagit({
			    itemName: 'item',
			    fieldName: 'tags',
				allowSpaces: true,
				onTagAdded: function(event, tag) {
					pages=[];
					getPages(keyTags.tagit('tagLabel', tag));
					//$("#mytags").tagit("assignedTags");//metodo para extraer todas las tags
				}
		    });
			
			//Obtiene los IDs de las paginas
			function getPages(tag){
				var pages_tmp;
				console.log('se agrego: '+ tag);
				FB.api('/search', {q: tag, type: 'page'}, function(response) {
					//Response nos trae un arreglo con los resultados de la busqueda
					//console.log();					
					$.each(response.data, function(i, element){
						//console.log('nombre:' + element.name + ' - ID: '+element.id);
						pageFriend(element);
						
					});
					//pages_tmp = pages;
					interests.push({"text":tag, "color": '#003366', "pages_array": pages})
				});
				
			}
			// /tags
			            
	    });
    
    <!-- - - - - - - - - - - - - - - - - - - - - -  Facebook Scripts - - - - - - - - - - - - - - - - - - - -->
       
        var uid; //Id del usuario
	    var accessToken; //token de acceso
		var userProfile;	//perfil del usuario
		var allFriends;		//Lista de amigos
		
		
		var pages = [];
		var interests = [];
		
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
							switchStyles(true);
						} else {
							//si el usuario cancelo o no garantizo su coneccion
							switchStyles(false);
						}
					}, {scope:'<?php echo $fbconfig['scope']; ?>'});  	
				}); 
				console.log(response.status);
				
				//Revisa estado del login	
			  	if (response.status === 'connected') {
					uid = response.authResponse.userID;
					accessToken = response.authResponse.accessToken;
					initLogged();
					switchStyles(true);
				// Si el usuario no esta logueado en Facebook.
			  	} else if (response.status === 'not_authorized') {
				 	switchStyles(false);
			  	} else {
					switchStyles(false);
					
			  	}		  
			});
			
			//Iniciar acciones si el usuario esta logueado
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
						initFriendInput();
					}
				});
			}		
		}//end fb qsync function
		
		function switchStyles(is_valid){
			if(is_valid){
				$('#not-available').css('display', 'none');
				$('#available').css('display', 'block');
			}else{
				$('#not-available').css('display', 'block');
				$('#available').css('display', 'none');
			}
			console.log('swicheo');	
		}
		
		function initFriendInput(){
			$("#key-friends").tokenInput(allFriends, {
				theme: "facebook",
				tokenValue: 'id',
				preventDuplicates: true,
				propertyToSearch: "name",
				hintText: "Selecciona el contacto",
				noResultsText: "Sin resultados",
				searchingText: "Buscando...",
				onAdd: function (item) {
					$('.error').css('display','none');
				},
				resultsFormatter: function(item){ 
				oneName = (item.location && item.location != null) ? ""+item.location.name : "-" ;
				return "<li>" + "<img src='https://graph.facebook.com/" + item.id + "/picture' title='" + item.name + "' class='uiProfilePhotoMedium' />" + "<div style='display: inline-block; padding-left: 10px;'><div class='full_name'>" + item.name + "</div><div class='location'>" + oneName + "</div></div></li>" },
			});	
		}
		
		function pageFriend(element){
			var control_repeat=0;
			var tmp_id;
			FB.api({
					method: 'fql.query',
					query: 'SELECT uid FROM page_fan WHERE page_id = '+element.id+' AND uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
				},function(result) {
					//Result regresa el id del amigo que tiene like en esa pagina	
					//console.log('Page Name: '+element.name);
					//console.log(result);
					$.each(result, function(i, element_f){
						
						$.each(allFriends, function(i_n, friend_element){
							
							//si ID del usuario que trae la pagina corresponde al ID de uno de mis amigos
							if(friend_element.id == element_f.uid){
								
								if(control_repeat==0){
									pages.push( {"page_id":element.id, "page_name": element.name});
									tmp_id=element.id;
									control_repeat=1;
								}else if(tmp_id == element.id){
									control_repeat=1;
								}else{
									control_repeat=0;
								}
								
								
								//console.log("page_id" + element.id);
								
								//console.log('usr_id::::'+element_f.uid+' Name: '+friend_element.name);
								$("#key-friends").tokenInput("add", {"id":friend_element.id, "name": friend_element.name});
								return false;
							}
						});
					});

				});		
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