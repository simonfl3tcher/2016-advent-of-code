Object.defineProperty(Object.prototype, 'andThen', {
  value: function (transform) { return transform(this); }
});
