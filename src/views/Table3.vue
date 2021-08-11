<template>
    <div id="container"></div>
    <div class="info">
</div>
</template>


<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default{
    mounted() {
    AMapLoader.load({
    "key": "88c17c713cd24a59ad64b7e256449d1a",              // 申请好的Web端开发者Key，首次调用 load 时必填
    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "plugins": ['AMap.Scale','AMap.ToolBar','AMap.Geolocation','AMap.MapType'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
    let map = new AMap.Map('container',{
        resizeEnable: true
    });
    let geolocation = new AMap.Geolocation({
    enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: false,        //显示定位按钮，默认：true
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar());
    map.addControl(new AMap.MapType());
    map.add(new AMap.Marker({
            position:map.getCenter()
        }));
    geolocation.getCurrentPosition();
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