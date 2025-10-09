/**
 * Remove the protocol from the url
 * @param url - The url to remove the protocol from
 * @returns The url without the protocol
 */
export function removeProtocol(url: string) {
  if (!url.startsWith("http")) {
    return url;
  }
  if (url.startsWith("//")) {
    return url.replace("//", "");
  }
  return url.replace(/^https?:\/\//, "");
}

/**
 * Add the protocol to the url
 * @param url - The url to add the protocol to
 * @returns The url with the protocol
 */
export function addProtocol(url: string) {
  if (url.startsWith("http")) {
    return url;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return `https://${url}`;
}

export function cleanUrl(url: string) {
  return removeProtocol(url).split("/")[0];
}