

function f1() {
    const url = 'https://echo.apifox.com/get';
    axios({
        method: 'GET',
        url
    })
}

// f1()

function f2() {
    const url = 'https://echo.apifox.com/get';
    // 请求头配置 
    const headers = {
        token: 'kingx-token'
    }
    // 传递参数结构 1 key value
    const params = {
        name: 'kingx'
    }
    // 结构2  URLSearchParams
    const searchParams = new URLSearchParams()
    searchParams.append('pwd', '123456');
    axios.get(url, {
        headers,
        params: searchParams
    });
}
// f2()

function f3() {
    const url = 'https://echo.apifox.com/post';
    const data = {
        name: 'kingx2'
    }
    const header = {
        token: 'kingx-token2'
    }
    axios.post(url, data, {
        header,
        timeout: 10
    }).then((res) => {
        console.log(res);
    }).catch((rej) => {
        console.log('rej:', rej);
    })
}
f3()
// 实例配置
function f4() {
    const instance = axios.create();
    // 创建axios实例
    instance.defaults.baseURL = 'https://echo.apifox.com'; //基础的URL前缀，与url参数组成完整的请求url
    instance.defaults.timeout = 10;//超时时间
    instance.get('/get');//这里定义的请求方式会拼接到链接上
}
f4()


// 请求配置的优先级
function f5() {
    const url = 'https://echo.apifox.com/get'
    axios.defaults.headers['token'] = 'kingx-token1';

    const instance = axios.create();
    instance.defaults.headers['token'] = 'kingx-token2';

    instance.get(url, {
        headers: {
            token: 'kingx-token3'
        }
    })
}
f5()

// 当配置都生效的情况下，请求配置>实例配置>全局配置

function f6() {
    const url = 'https://echo.apifox.com/get';
    axios.defaults.headers['token'] = 'kingx-token1';
    const instance = axios.create();

    // axios是一种基于promise的http库，请求的响应会返回一个promise
    instance.get(url).then(res => {
        if (res.status === 200) {
            console.log('res::', res);
        }
    }).catch(rej => {
        console.log(('rej:', rej));
    })
}
f6()

