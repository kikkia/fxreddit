import { HTMLElement, parse as parseHTML } from 'node-html-parser';
import { RedditPost } from '../reddit/types';
import { isDefined } from 'remeda';
import { CACHE_CONFIG } from '../cache';

export async function externalImgurEmbed(post: RedditPost, link: string, head: HTMLElement) {
    if (link.endsWith('.gif') || link.endsWith('.gifv')) {
        const html = await fetch(link, { ...CACHE_CONFIG }).then(r => r.text()).then(parseHTML);
        const clipEmbed = html.querySelector('meta[name="twitter:player"]')?.getAttribute('content');
        const thumbnail = html.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
        console.log('here123', thumbnail, link);
        console.log('w/h', post.resolution?.width, post.resolution?.height);
        if (thumbnail) {
            head.image(thumbnail, post.resolution?.width, post.resolution?.height);
        }
        if (clipEmbed) {
            head.video(clipEmbed, post.resolution?.width, post.resolution?.height, 'video/mp4');
        }
    } else {
        console.log('here456 %s', post);
        if (isDefined(post.preview_image_url)) {
            head.image(post.preview_image_url, post.resolution?.width, post.resolution?.height, 'large');
        }
    }
}