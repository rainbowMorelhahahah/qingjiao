export default class MMUtil {
    // 获取路径
    getParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            queryString = window.location.search.split('?')[1] || '',
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
}
