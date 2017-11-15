const isWebkit = navigator.vendor && navigator.vendor.indexOf("Apple") > -1;
const useShadowDOMV1 = !isWebkit && Boolean(Element.prototype.attachShadow && Node.prototype.getRootNode);

const REFERENCE_EXPLICIT = useShadowDOMV1 ? `explicit<slot></slot>` : `explicit<slot></slot>`;
const REFERENCE_CUSTOM = useShadowDOMV1 ? `customComposition!<slot></slot>` : `customComposition!<content select=":not([slot]),[slot=\'\']"></content>`;
const REFERENCE_DEFAULT = useShadowDOMV1 ? `<h2>Custom Shadow DOM composition</h2>
        <slot name="my-slot"></slot>` : `<h2>Custom Shadow DOM composition</h2>
        <content select="[slot=\'my-slot\']" name="my-slot"></content>`;
const REFERENCE_FALLBACK = useShadowDOMV1 ? `<style>:host{display:block;}</style><slot></slot>` : `<style>:host{display:block;}</style><content select=":not([slot]),[slot=\'\']"></content>`;

function partialWithCustom() {
    return {
        "CompositionProvider": {
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
        "CompositionProvider": {
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
        "CompositionProvider": {
            "PartialId": "given PartialId",
            "Composition$": ""
        },
        "App": {
            "Html": "templateToInclude.html",
            "doesItWork": "works!"
        }
    }
}