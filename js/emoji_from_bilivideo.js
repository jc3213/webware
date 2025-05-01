let keyword = ['Ave Mujica', 'Mygo表情包', '颂乐人偶'];
let result = new Map();
let regexp = new RegExp(keyword.join('|'), 'i');

[...document.getElementById('commentapp').children[0].shadowRoot.children[1].children[1].children].forEach((host) => {
    let [post, reply] = host.shadowRoot.children;
    post = post.shadowRoot.children[0].children[1].children[1].children;
    post = post[post.length - 1].shadowRoot;
    biliReplyEmojis(post);
    reply = [...reply.children[0].shadowRoot.children[0].children[0].children];
    reply.slice(0, -1).forEach((host) => {
        let reply = host.shadowRoot.children[0].children[0].children[1].shadowRoot;
        biliReplyEmojis(reply);
    });
});

function biliReplyEmojis(host) {
    host?.querySelectorAll('img')?.forEach((img) => {
        let {alt, src} = img;
        if (regexp.test(alt)) {
            let url = src.slice(0, src.indexOf('@'));
            let name = alt.slice(1, -1) + url.slice(url.lastIndexOf('.'));
            result.set(name, url);
        }
    });
}

console.log(result);

let params = [...result].map(( [out, url] ) => ( {url, options: {out}} ) );
window.postMessage( {aria2c: 'aria2c_jsonrpc_call', params} );
