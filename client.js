(function($) {
  var ChatRoom = {
    init: function() {
      Chatroom.getMessasges()
      .then(Chatroom.loadMessages)
      .fail(function(err){
    		console.log(err)
    	})
    },

    messasges:[],

    getMessasges: function() {
    	return $.get('/allmessages')
    },
    loadMessages: function(data){
    	data.forEach(function(row){
    		Chatroom.messages
    		.push({user: row.name, message: row.message})
    	});
    	Chatroom.showMessages()
    },

    postMessage: function(message, user) {
    	$.post('/message',{messge: message, user:user} function(res){
    		addMessasgeToView(res)
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
    }
  }

	$(function(){
		Chatroom.init();
	})

})(jQuery)
