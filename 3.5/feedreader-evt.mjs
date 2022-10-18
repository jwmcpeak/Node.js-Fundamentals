import { getLinks, saveLinks } from './feed-manager.mjs';
import { rl, close } from './rl.mjs';
import axios from 'axios';
import Parser from 'rss-parser';
import {EventEmitter} from 'events';

const feeds = await getLinks();
const parser = new Parser();
const emitter = new EventEmitter();


function prompt() {
    rl.setPrompt('Enter command (list, add, del, read, quit): ');
    rl.prompt();
}

rl.on('line', (input) => {
    let cmdParts = input.trim().split(' ');

    emitter.emit(cmdParts[0], cmdParts[1]);
});

emitter.on('quit', async () => {
    await saveLinks(feeds);
    close();
});

emitter.on('list', async () => {
    feeds.forEach((url, index) => console.log(`${index}\t${url}`));

    prompt();
});

emitter.on('add', async (url) => {
    if (url === undefined) {
        console.log('Please include the URL with the add command.');
    } else {
        feeds.push(url);
    }

    prompt();
});

emitter.on('del', async (index) => {
    if (index === undefined) {
        console.log('Please include the index of the URL to delete.');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            feeds.splice(index, 1);
        } else {
            console.log('The provided index is out of range.');
        }
    }
    
    prompt();
});

emitter.on('read', async (index) => {
    if (index === undefined) {
        console.log('Please include the index of the URL to reads.');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            if (index > -1 && index < feeds.length) {
                let {data} = await axios.get(feeds[index]);

                let feed = await parser.parseString(data);

                feed.items.forEach(item => console.log(item.title));
            } else {
                console.log('The provided index is out of range.');
            }
        } else {
            console.log('The provided index is out of range.');
        }
    }
    
    prompt();
});

prompt();



// while (input != 'quit') {
    
//     let cmd = cmdParts[0];

//     if (cmd === 'list') {
//         feeds.forEach((url, index) => console.log(`${index}\t${url}`));
//     }

//     if (cmd === 'add') {
//         if (cmdParts.length < 2) {
//             console.log('Please include the URL with the add command.');
//         } else {
//             feeds.push(cmdParts[1]);
//         }
//     }

//     if (cmd === 'del') {
//         if (cmdParts.length < 2) {
//             console.log('Please include the index of the URL to delete.');
//         } else {
//             let index = parseInt(cmdParts[1], 10);

//             if (index > -1 && index < feeds.length) {
//                 feeds.splice(index, 1);
//             } else {
//                 console.log('The provided index is out of range.');
//             }
//         }
//     }

//     if (cmd === 'read') {
//         if (cmdParts.length < 2) {
//             console.log('Please include the index of the URL to read.');
//         } else {
//             let index = parseInt(cmdParts[1], 10);

//             if (index > -1 && index < feeds.length) {
//                 let {data} = await axios.get('https://www.reddit.com/r/node.rss');

//                 let feed = await parser.parseString(data);

//                 feed.items.forEach(item => console.log(item.title));
//             } else {
//                 console.log('The provided index is out of range.');
//             }
//         }
//     }

//     input = await question('Enter command (list, add, del, read, quit): ');
// }