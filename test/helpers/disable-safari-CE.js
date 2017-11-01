/* 
in Safari, window.customElements exists but with partial support,
and this causes text-fixture element to use `customElements.define` instead of `document.registerElement` when registering itself,
and it is not upgrading. I decided to remove `CE` under Safari in tests. Might need further investigation but this works perfectly 
and all tests are passing in Safari.
*/

const isSafari = navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && navigator.userAgent && !navigator.userAgent.match("CriOS");

if(isSafari) {
    delete window.customElements;
}