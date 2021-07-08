<template>
    <div class="box">
        <el-carousel height="576px">
          <el-carousel-item v-for="item in 4" :key="item" >
            <img src="../assets/1.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
    .box {
        width: 1024px;
        height: 576px;
        margin: 30px auto;
    }
    img {
      width: 1024px;
      height: 576px;
    }
</style>