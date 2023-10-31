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

/*      understand/
 * capitalize first letter if all in lowercase
 */
export function cap(txt) {
    if(!txt) return txt;
    if(txt.toLowerCase() != txt) return txt;
    return txt.substring(0,1).toUpperCase() + txt.substring(1);
}


/*      understand/
 * make a string safe for use with RegExp by escaping all special characters
 */
export function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

/*      understand/
 * try to make a valid search regular expression from the string
 * otherwise return it as a regular expression of just the string
 */
export function rx_ify_or_str(search) {
  if(!search) return null;
  const numberRegex = /^\d+$/;
  if(numberRegex.test(search)) {
    try { return new RegExp(`\\b${search}\\b`, 'i'); } catch(e) { /* ignore */ }
  }
  try { return new RegExp(search, 'i'); } catch(e) { /* ignore */ }
  try { return new RegExp(escapeRegex(search), 'i'); } catch(e) { /* ignore */ }
  return null;
}

