// from: https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
export async function copyToClipboard(textToCopy) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}

// from: https://stackoverflow.com/questions/5002111/how-to-strip-html-tags-from-string-in-javascript
export function cleanHtml(txt) {
    return txt.replace(/<\/?[^>]+>/g, "");
}
