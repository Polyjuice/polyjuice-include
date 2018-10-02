const isWebkit = navigator.vendor && navigator.vendor.indexOf("Apple") > -1;
const useShadowDOMV1 = Boolean(Element.prototype.attachShadow && Node.prototype.getRootNode);

const REFERENCE_CUSTOM = useShadowDOMV1 ? `customComposition!<slot></slot>` : `customComposition!<content select=":not([slot]),[slot=\'\']"></content>`;
const REFERENCE_DEFAULT = useShadowDOMV1 ?  `<h2>Default Shadow DOM presentation</h2>
        <slot name="my-slot"></slot>` : `<h2>Default Shadow DOM presentation</h2>
        <content select="[slot=\'my-slot\']" name="my-slot"></content>`;
const REFERENCE_PARENT = useShadowDOMV1 ?  `<h2>Parent Shadow DOM composition</h2>
        <slot></slot>` : `<h2>Parent Shadow DOM composition</h2>
        <content></content>`;
const REFERENCE_FALLBACK = useShadowDOMV1 ? `<style>:host{display:block;}</style><slot></slot>` : `<style>:host{display:block;}</style><content select=":not([slot]),[slot=\'\']"></content>`;

function partialWithCustom() {
    return {
        "BlendingProvider_0": {
            "PartialId": "given PartialId",
            "Composition$": "customComposition!<slot></slot>"
        },
        "App": {
            "Html": "template_w_declarative-shadow-dom.html",
            "doesItWork": "works!"
        }
    }
}

function partialWithDefault() {
    return {
        "BlendingProvider_0": {
            "PartialId": "given PartialId",
            "Composition$": ""
        },
        "App": {
            "Html": "template_w_declarative-shadow-dom.html",
            "doesItWork": "works!"
        }
    }
}

function partialWithFallback() {
    return {
        "BlendingProvider_0": {
            "PartialId": "given PartialId",
            "Composition$": ""
        },
        "App": {
            "Html": "templateToInclude.html",
            "doesItWork": "works!"
        }
    }
}
