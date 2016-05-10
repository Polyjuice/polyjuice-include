chai.Assertion.addChainableMethod('descendant', function (selector) {
    var descendant,
        obj = chai.util.flag(this, 'object');

    expect(obj, 'element should be instance of object').to.be.instanceof(Object);
    expect(obj, 'element should respond to `querySelector`').to.respondTo('querySelector');
    descendant = obj.querySelector(selector);
    expect(descendant, 'element should have descendant matching `' + selector + '`').to.be.not.null;

    chai.util.flag(this, 'object', descendant);
});

chai.Assertion.addProperty('clearImportedTemplate', function () {
    var obj = chai.util.flag(this, 'object');

    new chai.Assertion(obj.model, '`imported-template` should have falsy model property').to.be.falsy;
    expect(obj.hasAttribute("content"), '`imported-template` should not have `content` attribute set').to.be.false;
    // new chai.Assertion(obj.content, 'should have falsy content property').to.be.falsy;
});
