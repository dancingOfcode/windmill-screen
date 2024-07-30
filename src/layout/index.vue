<template>
    <div class="layout">
        <div class="layout-header">
            {{ appName }}
            <div class="screen-btn" :class="isFullScreen ? 'exit-icon' : 'full-icon'" @click="toggleFullScreen"></div>
        </div>
        <div class="layout-main">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { useFullScreen } from '@/hooks'
const appName = '大型风力发电机监控平台'
const { isFullScreen, toggleFullScreen } = useFullScreen()

</script>
<style lang="scss" scoped>
.layout {
    width: 100vw;
    height: 100vh;
    background-color: #000;

    .layout-header {
        position: absolute;
        top: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 64px;
        padding-bottom: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        background: url('@/assets/images/header_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 64px;

        .screen-btn {
            position: absolute;
            width: 28px;
            height: 24px;
            top: 8px;
            right: 12px;
            z-index: 999;
            cursor: pointer;
            // 禁止focus 
            

            &.exit-icon {
                background: url('@/assets/images/exitFullScreen.png') no-repeat;
                background-size: 100% 100%;
            }

            &.full-icon {
                background: url('@/assets/images/fullScreen.png') no-repeat;
                background-size: 100% 100%;
            }
        }

    }

    .layout-main {
        width: 100vw;
        height: 100vh;
        background-image: linear-gradient(90deg, #01355059 1px, transparent 1px),
            linear-gradient(0deg, #01355059 1px, transparent 1px);
        background-size: 30px 30px, 30px 30px;
    }
}
</style>