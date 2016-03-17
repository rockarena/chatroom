(function($) {
  var Chatroom = {
    controls: {
    	send: '#send',
    	message: '#message'
    },
    config: {
    	apiUrl:'http://localhost:3000'
    },

    init: function() {
      Chatroom.getElements();
      Chatroom.getMessasges()
      .then(Chatroom.loadMessages)
      .fail(function(err){
    		console.log(err)
    	});
    },

    messasges:[],

    getMessasges: function() {
    	return $.get(Chatroom.config.apiUrl + '/allmessages')
    },
    loadMessages: function(data){
        console.log(data);
    	data.forEach(function(row){
    		Chatroom.messages
    		.push({user: row.name, message: row.message})
    	});
    	Chatroom.showMessages()
    },

    postMessage: function(message, user) {
    	var payload = {messge: message, user:user};
    	$.post(Chatroom.config.apiUrl + '/message',payload, function(res){
    		Chatroom.addMessasgeToView(res)
    	})
    	.fail(function(err){
    		console.log(err)
    	})
    },
    addMessasgeToView: function() {

    },

    showMessages: function(){
    	var html = '';
    	return html
    },
    getElements: function(){
    	for (var control in Chatroom.controls) {
    		Chatroom.controls[control] = $(Chatroom.controls[control])
    	}
    },
    getUser: function(){
    	var params = document.location.pathname.split('/?user=');
    	return params[params.length-1]
    },
    bindControlls: function(){
    	Chatroom.controls.send.on('click',function(){
    		var message = Chatroom.controls.message.val();
    		var user = Chatroom.getUser();
    		Chatroom.postMessage(message, user);
    	});
    }
  }

	$(function(){
		Chatroom.init();
	})

})(jQuery)
