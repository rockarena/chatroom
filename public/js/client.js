(function($, bars) {
  var Chatroom = {
    controls: {
    	send: '#send',
      message: '#textMessage',
    	template: '#entry-template',
      view: '#direct-chat-messages'
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

      Chatroom.bindControlls();

      window.chatroom = Chatroom;
    },

    messages:{},

    getMessasges: function() {
      return $.get(Chatroom.config.apiUrl + '/allmessages')
    },
    loadMessages: function(data){
        console.log(data);
      Chatroom.messages = data.messages;
    	Chatroom.showMessages()
    },

    postMessage: function(message, user) {
    	var payload = {message: message, user:user};
    	$.post(Chatroom.config.apiUrl + '/message',payload, function(res){
    		Chatroom.addMessageToView(res)
    	})
    	.fail(function(err){
    		console.log(err)
    	})
    },
    addMessageToView: function(message) {
      Chatroom.messages.push(message);
      Chatroom.controls.message.val('');
      Chatroom.showMessages();
    },
    showMessages: function(){
      var source = Chatroom.controls.template.html();
      var template = bars.compile(source);
      Chatroom.controls.view.html(template({messages:Chatroom.messages}));
    	// Chatroom.controls.view.html(template(Chatroom.messages));
    },
    getElements: function(){
    	for (var control in Chatroom.controls) {
    		Chatroom.controls[control] = $(Chatroom.controls[control])
    	}
    },
    getUser: function(){
    	var params = document.location.search.split('?user=');
    	return params[params.length-1]
    },
    bindControlls: function(){
    	Chatroom.controls.send.on('click',function(e){
    		e.preventDefault();
        var message = Chatroom.controls.message.val();
    		var user = Chatroom.getUser();
    		Chatroom.postMessage(message, user);
    	});
    }
  }

	$(function(){
		Chatroom.init();
	})

})(jQuery, Handlebars)
