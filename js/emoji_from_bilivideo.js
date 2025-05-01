let result = new Map();

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
    return
    if (reply.length === 2) {
        reply = reply[0].shadowRoot.children[0].children[0].children[1].shadowRoot;
        console.log(reply);
    }
});

function biliReplyEmojis(host) {
    host?.querySelectorAll('img')?.forEach((img) => {
        let {alt, src} = img;
        if (alt.includes('Ave Mujica_') || alt.includes('Mygo表情包_') || alt.includes('颂乐人偶_')) {
            let url = src.slice(0, src.indexOf('@'));
            let name = alt.slice(1, -1) + '.png';
            result.set(name, url);
        }
    });
}

console.log(result);
