// axios也提供与promise一致的api

// axios.all([])   可以并行发送多个请求, 这些请求的返回值都为resolve时，会生成一个新的promise，且以数组的形式保存,再使用.then来调用
// axios.spread() 将多个结果进行合并   多个resolve返回结果时 axios.spread((结果1，结果2，结果3))  结果命名自定义
function f1() {
    //  监听请求/响应 返回的结果一定要使用拦截器
    // 拦截器代码的执行顺序也是从上到下的，当拦截器创建在捕获异常后，只会捕获之后的异常
    axios.interceptor.response.use((res => {
        return res;
    }), (err) => {
        console.log('interceptor 拦截到响应异常', err);
        Promise.reject(err);
    })
    const urlRequest = generateRequest({ key: 'user' });
    const articleRequest = generateRequest({ key: 'article' });
    const commentRequest = generateRequest({ key: 'comment' });


    axios
        .all([urlRequest, articleRequest, commentRequest])
        .then(
            axios.spread((userResp, articleResp, commentResp) => {
                const mergedData = {
                    userList: userResp.data,
                    articleList: articleResp.data,
                    commentList: commentResp.data
                };
                console.log('mergedData', mergedData);
            })
        )
        .catch(err => {
            console.log('error', err);
        })
    // 当遇到多个错误时，axios只能捕获第一个异常，可以搭配响应拦截器，不管请求成功还是失败，响应拦截器都会执行
}

function generateRequest(data) {
    const url = 'https://echo.apifox.com/get';
    return axios.get(url, { params: data });
}

f1();
