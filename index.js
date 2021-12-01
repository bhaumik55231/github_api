const manageAuthentication = async () => {
    const parameters = getParameters(location.href);

    if(parameters && parameters.code) {
        await getAccessToken(parameters.code);
        return;
    }
    const url = `https://github.com/login/oauth/authorize?client_id=d7682f6c5aaf483f79e8&type=user_agent&redirect_uri=${location.origin}${location.pathname}&scope=user,public_repos`
    const btn = document.getElementById('login');
    btn.addEventListener('click', () => {
        location.href = url;
    })
}

const getAccessToken = async (code) => {
    let obj = {
        client_id: 'd7682f6c5aaf483f79e8',
        client_secret: '7f92b156ab24c58014f393f86c5daffc372dba26',
        code: code,
        accept: 'json'
    }
    let data = new FormData()
    data.append('client_id', 'd7682f6c5aaf483f79e8')
    data.append('client_secret', '7f92b156ab24c58014f393f86c5daffc372dba26')
    data.append('code', code)
    const url = `https://github.com/login/oauth/access_token?client_id=d7682f6c5aaf483f79e8&client_secret=7f92b156ab24c58014f393f86c5daffc372dba26&code=${code}`
    const url2 = 'https://github.com/login/oauth/access_token'
    const response = await fetch(url2, {
        method: 'POST',
        body: data,
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    debugger
}

const getParameters = (URL) => {
    const hash = decodeURIComponent(URL);
    const index = hash.indexOf('?');
    if(index !== -1){
        let query = hash.slice(index+1, hash.length);
        query = query.replace(/#\?/g, "&")
        if(query.indexOf('#') !== -1) query = query.slice(0, query.indexOf('#'))
        const array = query.split('&');
        let obj = {};
        array.forEach(value => {
            if(value.split('=')[1].trim() === "") return;
            obj[value.split('=')[0]] = value.split('=')[1];
        });
        return obj;
    }
    else{
        return null;
    }
}

window.onload = () => {
    manageAuthentication();
}