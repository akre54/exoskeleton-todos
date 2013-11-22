// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

define(['exoskeleton', 'underscore.template', 'models/todo_list', 'views/todo', 'text!templates/stats.html'], function(Backbone, _, TodoList, TodoView, statsTemplate) {

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: "#todoapp",

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(statsTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      // Create our app-wide collection of **Todos**.
      this.collection = new TodoList;

      this.input = this.find("#new-todo");
      this.allCheckbox = this.find("#toggle-all");

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

      this.footer = this.find('footer');
      this.main = this.find('#main');

      this.collection.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = this.collection.done().length,
          remaining = this.collection.remaining().length;

      if (this.collection.length) {
        this.main.style.display = 'block';
        this.footer.style.display = 'block';
        this.footer.innerHTML = this.statsTemplate({done: done, remaining: remaining});
      } else {
        this.main.style.display = 'none';
        this.footer.style.display = 'none';
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.find("#todo-list").appendChild(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.collection.forEach(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode !== 13) return;
      if (!this.input.value) return;

      this.collection.create({title: this.input.value});
      this.input.value = '';
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      this.collection.done().forEach(function(todo) {
        todo.destroy();
      });
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.collection.forEach(function (todo) { todo.save({'done': done}); });
    }

  });

  return AppView;
});
