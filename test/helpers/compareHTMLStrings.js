/* Safari re-orders attribs, that's why we need a little smarter way to compare HTML strings */
chai.Assertion.addChainableMethod('sameHTMLString', function (ref) {
    const parser = new DOMParser();
    const obj = chai.util.flag(this, 'object');
    expect(obj, 'value should be a string').to.be.a('string');
    expect(ref, 'reference value should be a string').to.be.a('string');

    // parse strings into two docs
    const docObj = parser.parseFromString(obj, 'text/html');
    const docRef = parser.parseFromString(ref, 'text/html');
    // flatten nodes
    const childrenObj = docObj.body.querySelectorAll('*');
    const childrenRef = docRef.body.querySelectorAll('*');

    assert(childrenObj.length === childrenRef.length, 'have different number of elements');

    const join = Array.prototype.join;
    // compare children themselves
    for (let i = 0; i < childrenObj.length; i++) {
        const childObj = childrenObj[i];
        const childRef = childrenRef[i];

        // compare each child's node name
        assert(childObj.localName === childRef.localName, `have different descendants,
            expected ${childObj.localName} to equal ${childRef.localName}`);

        // sort each child's attributes alphabetically
        const sortedChildAttributesObj = Array.prototype.map
          .call(childObj.attributes, attrib => {
            return { name: attrib.name, value: attrib.value };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        const sortedChildAttributesRef = Array.prototype.map
          .call(childRef.attributes, attrib => {
            return { name: attrib.name, value: attrib.value };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        // compare attribs counts
        assert(sortedChildAttributesObj.length === sortedChildAttributesRef.length, `descendants have different number of attributes,
            expected ${sortedChildAttributesObj.length} to equal ${sortedChildAttributesRef.length} for ${childObj.outerHTML} like ${childRef.outerHTML}`);

        // compare each child attribs
        for (let j = 0; j < sortedChildAttributesObj.length; j++) {
          const attribChildA = sortedChildAttributesObj[j];
          const attribChildB = sortedChildAttributesRef[j];
          assert(attribChildA.value === attribChildB.value, `descendants have different attributes,
              expected ${attribChildA.value} to equal ${attribChildB.value}`);
        }
        // check recursively
        expect(childObj.innerHTML).to.be.sameHTMLString(childRef.innerHTML);
      }

});
