/* Safari re-orders attribs, that's why we need a little smarter way to compare HTML strings */
function compareHTMLStrings(a, b) {
  const parser = new DOMParser();
  // parse strings into two docs
  const docA = parser.parseFromString(a, 'text/html');
  const docB = parser.parseFromString(b, 'text/html');

  // flatten nodes
  const childrenA = docA.body.querySelectorAll('*');
  const childrenB = docB.body.querySelectorAll('*');
    
  // compare children length
  if (childrenA.length != childrenB.length) {
    return false;
  }

  // compare children themselves
  for (let i = 0; i < childrenA.length; i++) {
    const childA = childrenA[i];
    const childB = childrenB[i];

    // compare each child's node name
    if (childA.localName !== childB.localName) {
      return false;
    }

    // sort each child's attributes alphabetically
    const sortedChildAttributesA = Array.prototype.map
      .call(childA.attributes, attrib => {
        return { name: attrib.name, value: attrib.value };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const sortedChildAttributesB = Array.prototype.map
      .call(childB.attributes, attrib => {
        return { name: attrib.name, value: attrib.value };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    // compare attribs counts
    if (sortedChildAttributesA.length != sortedChildAttributesB.length) {
      return false;
    }

    // compare each child attribs
    for (let j = 0; j < sortedChildAttributesA.length; j++) {
      const attribChildA = sortedChildAttributesA[j];
      const attribChildB = sortedChildAttributesB[j];
      // compare each attrib's name case-insensitively
      if (attribChildA.name.toLowerCase() != attribChildB.name.toLowerCase()) {
        return false;
      }
      // compare each attrib's value case-sensitively
      if (attribChildA.value != attribChildB.value) {
        return false;
      }
    }
  }
  return true;
}
