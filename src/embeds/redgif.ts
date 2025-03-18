import { HTMLElement, parse as parseHTML } from 'node-html-parser';
import { RedditPost } from '../reddit/types';
import { CACHE_CONFIG } from '../cache';

export async function externalRedgifEmbed(post: RedditPost, link: string, head: HTMLElement) {
    const html = await fetch(link, { ...CACHE_CONFIG }).then(r => r.text()).then(parseHTML);
    const clipEmbed = html.querySelector('meta[property="og:video"]')?.getAttribute('content');
    const thumbnail = html.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
    if (thumbnail) {
        head.image(thumbnail, post.resolution?.width, post.resolution?.height);
    }
    if (clipEmbed) {
        head.video(clipEmbed.replace('-silent', ''), post.resolution?.width, post.resolution?.height, 'video/mp4');
    }
}