$( function() {
  Vue.component('newtodo', {
    template: '#newtodo-template',
    data: function(){
      return {
        todo: {
          title: '',
          body: '',
          tags: [],
        },
        newtag: '',
        isSubmit: false,
      }
    },
    methods: {
      addTag: function(){
        this.todo.tags.push(this.newtag);
        this.newtag = '';
      },
      removeTag: function(tag) {
        var index = this.todo.tags.indexOf(tag);
        if(index !== -1) {
          this.todo.tags.splice(index, 1);
        }
      },
      createTodo: function(){
        var self = this;
        app.apiClient.post('todo', this.todo, function(err, response, headers){
          if(err) {
            return app.message = 'Failed to create new todo';
          }
          self.todo.title = '';
          self.todo.body = '';
          self.todo.tags.splice(0, self.todo.tags.length);
          self.$emit('newtodo', response);
        });
      }
    }
  });
  Vue.component('todo', {
    template: '#todo-template',
    data: function(){
      return {
        error: '',
        isEdit: false,
        isDelete: false,
        isSubmit: false,
        update: {},
        newtag: '',
      }
    },
    props: {
      todo: Object
    },
    created: function(){
      var self = this;
      self.update = self.todo;
    },
    watch: {
      todo: function(newValue){
        this.update = newValue;
      }
    },
    computed: {
      date: function() {
        var dt = new Date(this.todo.changed);
        return dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate()
        + ' ' + dt.getHours() + ':' + dt.getMinutes();
      }
    },
    methods: {
      updateTodo: function(){
        var self = this;
        self.isSubmit = true;
        app.apiClient.put('todo/' + this.todo.id, this.todo.token, this.update, function(err, response, headers){
          if(err) {
            return app.message = 'Failed to update todo';
          }
          self.isSubmit = false;
          self.cancelUpdate();
          self.$emit('updated', response);
        });
      },
      deleteTodo: function(){
        var self = this;
        self.isDelete=false;
        app.apiClient.delete('todo/' + self.todo.id, self.todo.token, function(err, response, headers){
          if(err) {
            return app.message = 'failed to delete todo';
          }
          self.$emit('deleted', response);
        });
      },
      cancelUpdate: function() {
        this.update = this.todo;
        this.isEdit = false;
        this.isDelete = false;
      },
      addTag: function(){
        this.update.tags.push(this.newtag);
        this.newtag = '';
      },
      removeTag: function(tag) {
        var index = this.update.tags.indexOf(tag);
        if(index !== -1) {
          this.update.tags.splice(index, 1);
        }
      },
    }
  });
  var app = new Vue({
    el: '#example-todo',
    data: {
      message: 'initiating',
      apiClient: false,
      todos: [],
      isnew: false,
      sort: false,
    },
    created: function(){
      var self = this;
      var clientSettings = {
        URL: "http://localhost:3100",
        secureKey: '524b8c2be918d408d8d9c89a6d5ce7e85e25e0efa412d8aa'
      }
      self.apiClient = new MicroserviceClient(clientSettings);
      self.apiClient.search('todo', {}, function(err, handlerResponse, headers){
        if(err) {
          self.message = err;
          return;
        }
        for (var todo of handlerResponse) {
          self.todos.push(todo);
        }
        self.message = 'connected';
      });
    },
    computed: {
      sortedTodo: function(){
        var todos = [];
        for(var todo of this.todos){
          todos.push(todo);
        }
        var sortFunction = false;
        if(this.sort) {
          sortFunction = function(a, b){
            if(a.changed < b.changed) {
              return -1;
            }
            if(b.changed < a.changed) {
              return 1;
            }
            return 0;
          }
        } else {
          sortFunction = function(a, b){
            if(a.changed > b.changed) {
              return -1;
            }
            if(b.changed > a.changed) {
              return 1;
            }
            return 0;
          }
        }
        todos.sort(sortFunction);
        console.log(todos);
        return todos;
      }
    },
    methods: {
      todoCreated: function(newTodo) {
        this.todos.unshift(newTodo);
        this.isnew = false;
      },
      removeTodo: function(todo){
        var index = false;
        for(var i in this.todos){
          if(this.todos[i].id == todo.id) {
            index= i;
            break;
          }
        }
        if(index) {
          return this.todos.splice(index, 1);
        }
        this.message = 'todo not found';
      },
      updateTodo: function(todo){
        var index = false;
        for(var i in this.todos){
          if(this.todos[i].id == todo.id) {
            index= i;
            break;
          }
        }
        if(index) {
          return this.todos.splice(index, 1, todo);
        }
        this.message = 'todo not found';
      }
    }
  })

} );