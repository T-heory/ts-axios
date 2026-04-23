
let reqNum = 0;

function f1() {
    const url = 'https://echo.apifox.com/get';
    axios.interceptors.request.use((config) => {
        console.log('请求reqNum次数:', reqNum);
        console.log('——————————');
        if (reqNum === 0) {
            console.log('loading 开始');
        }
        reqNum++;
        return config;
    })

    axios.interceptors.response.use((response) => {
        console.log('响应reqNum次数:', reqNum);
        reqNum--;
        if (reqNum === 0) {
            console.log('loading 结束');
        }
        return response;
    }, (error => {
        reqNum = 0;
        console.log('loading 结束');
        return Promise.reject(error);
    }))

    const req1 = axios.get(url);
    const req2 = axios.get('https://echo.apifox.com/123');
    const req3 = axios.get(url);

    axios.all([req1, req2, req3])
        .then(axios.spread((req1, req2, req3) => {
            const mergeData = {
                data1: req1.data,
                data2: req2.data,
                data3: req3.data
            }
            console.log('mergeData:', mergeData);
            return mergeData;
        }))
        .catch(error => {
            console.log('error:', error);
        })
}
f1();