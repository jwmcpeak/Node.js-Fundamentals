import { getLinks, saveLinks } from './feed-manager.mjs';
import { question, close } from './rl.mjs';
import axios from 'axios';
import Parser from 'rss-parser';

const feeds = await getLinks();
const parser = new Parser();

let input = await question('Enter command (list, add, del, read, quit): ');

while (input != 'quit') {
    let cmdParts = input.trim().split(' ');
    let cmd = cmdParts[0];

    if (cmd === 'list') {
        feeds.forEach((url, index) => console.log(`${index}\t${url}`));
    }

    if (cmd === 'add') {
        if (cmdParts.length < 2) {
            console.log('Please include the URL with the add command.');
        } else {
            feeds.push(cmdParts[1]);
        }
    }

    if (cmd === 'del') {
        if (cmdParts.length < 2) {
            console.log('Please include the index of the URL to delete.');
        } else {
            let index = parseInt(cmdParts[1], 10);

            if (index > -1 && index < feeds.length) {
                feeds.splice(index, 1);
            } else {
                console.log('The provided index is out of range.');
            }
        }
    }

    if (cmd === 'read') {
        if (cmdParts.length < 2) {
            console.log('Please include the index of the URL to read.');
        } else {
            let index = parseInt(cmdParts[1], 10);

            if (index > -1 && index < feeds.length) {
                let {data} = await axios.get('https://www.reddit.com/r/node.rss');

                let feed = await parser.parseString(data);

                feed.items.forEach(item => console.log(item.title));
            } else {
                console.log('The provided index is out of range.');
            }
        }
    }

    input = await question('Enter command (list, add, del, read, quit): ');
}

await saveLinks(feeds);
close();