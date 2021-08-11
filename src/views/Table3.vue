<template>
    <div id="container"></div>
</template>


<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default{
    mounted() {
    AMapLoader.load({
    "key": "88c17c713cd24a59ad64b7e256449d1a",              // 申请好的Web端开发者Key，首次调用 load 时必填
    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "plugins": ['AMap.Scale','AMap.ToolBar','AMap.CitySearch','AMap.MapType'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
    let map = new AMap.Map('container');
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar());
    map.addControl(new AMap.MapType());
    map.add(new AMap.Marker({
            position:map.getCenter()
        }));
    //实例化城市查询类
    const citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
                let citybounds = result.bounds;
                map.setBounds(citybounds);
            }
        }
    });
    }).catch(e => {
        console.log(e);
    });
},

}
</script>

<style scoped>
    body {
            margin: 0;
            padding: 0
        }

    html,
    body,
    #container {
        width: 100%;
        height: 100%;
    }
</style>