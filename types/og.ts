/**
 * OG Preview Props
 * @description OG Preview Props
 * @property {string} title - The title of the OG Preview
 * @property {string} description - The description of the OG Preview
 * @property {string} image - The image of the OG Preview
 * @property {string} link - The link of the OG Preview
 */
export type OG = {
  name: string;
  title: string;
  description: string;
  image: string;
  logo?: string;
  link: string;
  type?: "website" | "article" | "profile";
  social?: "twitter" | "facebook" | "linkedin" | "instagram" | "youtube" | "tiktok" | "pinterest" | "reddit" | "snapchat" | "twitch" | "discord" | "telegram" | "whatsapp" | "email" | "sms" | "other";
}