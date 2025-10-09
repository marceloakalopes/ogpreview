/**
 * Get OG data from local host url (e.g. http://localhost:3000, 127.0.0.1, etc.)
 * @param url - The url to get the OG data from
 * @returns The OG data
 */
export async function getOGData(url: string) {
  try {
    if (url.includes("localhost") || url.includes("127.0.0.1")) {
      url = `http://${url}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
