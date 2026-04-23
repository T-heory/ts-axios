// transformRequest和transformResponse属性来自定义请求和响应的转换函数  转换函数是在配置中编写

function f1() {
    const url = 'https://echo.apifox.com/post';
    // 创建实例时，只能进行内部配置，而不能发送请求，必须以实例对象的身份去请求
    const instance = axios.create();
    instance.post(url, {
        name: 'kingx3'
    },
        {
            headers: {
                token: 'king-token',
                "Content-type": 'application/json'
            },
            params: {
                name: 'kingx2'
            },
            transformRequest: [(data, headers) => {
                console.log('data', data);
                console.log('headers', headers);
                data.age = '20';
                return JSON.stringify(data);
            }]
        }).then(res => {
            console.log('res:', res);
        })
}
f1()

// 拦截器和