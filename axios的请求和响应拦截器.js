// 拦截器
// 拦截器.use接收两个参数，类似于promise的res和rej，但是这两个参数用, 逗号隔开   而promise是使用链式调用,直接在then后面接上.catch
//拦截器不能在发送请求时的内部配置中创建，必须在外部
function f1() {
    const url = 'https://echo.apifox.com/get';
    axios.interceptors.request.use((request) => {
        console.log('全局请求拦截器执行');
        request.headers['token'] = 'kingx-token1';
        return request;
    }, (error) => {
        console.log('err:', error);
        return Promise.reject(error)
    }
    );

    axios.post(url);

    const instance = axios.create();
    instance.interceptors.request.use((request) => {
        console.log('实例请求拦截器执行');
        request.headers['token'] = 'kingx-token2';
        return request;
    })

    instance.post(url);

    // 实例请求和全局请求是互相独立的，
}
// f1()

function f2() {
    const url = 'https://echo.apifox.com/get';
    axios.interceptors.response.use((response) => {
        console.log('全局响应拦截器执行');
        if (response.status === 200) {
            return response.data;
        }
    }), (error) => {
        console.log("error:", error);
        return Promise.reject(error);
    };
    axios.post(url).then((response) => {
        console.log(('resonse:', response));
    })
}
// f2()

// 请求相应拦截器的经典案例，针对请求错误码做通用的处理
/* 
优先执行响应拦截器的代码
执行promise.reject()将错误返回到最外层
axios的catch()方法捕获抛出的异常
*/

function f3() {
    const url = 'https://echo.apifox.com/status/200,401,403,404,500';
    const interceptors1 = axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const status = error.response.status;
        switch (status) {
            case 401:
                console.log('未授权');
                break;
            case 403:
                console.log('拒绝访问');
                break;
            case 404:
                console.log('资源未找到');
                break;
            case 500:
                console.log('服务端异常');
                break;
            default:
                console.log('未知错误');
        }
        return Promise.reject(error);
    }
    )
    axios.interceptors.response.eject(interceptors1);
    axios.post(url).then(res => {
        console.log(res);
    }).catch(error => {
        console.log('error:', error);
    })
}
// f3()

// 移除拦截器，以f3为例，请求和响应拦截器在创建时一定有个返回值，可以创建个变量接收它,语法 axios.interceptors.response/request.eject(变量名)

// 同时 请求和响应拦截器的config(即res,rej)同样具有返回值，一定要返回，否则无法构建正确的数据结构

console.log('————————————————————');
// 添加多个拦截器时，请求拦截器和响应拦截器执行顺序不一样
/* 
请求拦截器 按照添加的顺序从后往前，类似栈结构，先进后出
响应拦截器 按照添加的顺序从前往后，类似队列结构，先进先出

同时存在请求 响应拦截器时，执行顺序永远都是 1 执行请求拦截器  2 网络请求  3 执行响应拦截器 
*/

function f4() {
    const url = 'https://echo.apifox.com/status/200';
    axios.interceptors.response.use(res => {
        console.log('请求拦截器1');
        return res;
    }), (err => {
        console.log(err);
        return Promise.reject(err);
    });

    axios.interceptors.response.use(res => {
        console.log('请求拦截器2');
        return res;
    }), (err => {
        console.log(err);
        return Promise.reject(err);
    })

    axios.post(url).then(res => {
        console.log("res:", res);
    });
}
f4()