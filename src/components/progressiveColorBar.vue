<template>
    <div>
        <span v-for="i in gradientColors.length" :key="i" :style="'width:'+pieceWidth+'%;display:inline-block;border:'+barThickness+'px solid '+gradientColors[i]"></span>
    </div>
</template>

<script>
    export default {
        name: "progressiveColorBar",
        computed: {
            pieceWidth: function () {
                if (this.gradientColors.length > 0) {
                    return 100 / this.gradientColors.length
                } else {
                    return 0
                }
            }
        },
        props: {
            allColor: Array,
            barThickness: Number,
        },
        data() {
            return {
                gradientColors: [],
                showBar: false
            }
        },
        created: function () {
            this.gradientColors = getBarColors(this.allColor);
        },
    }

    // rgb to hex
    function rgbToHex(r, g, b) {
        var hex = ((r << 16) | (g << 8) | b).toString(16);
        return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
    }

    // hex to rgb
    function hexToRgb(hex) {
        var rgb = [];
        for (var i = 1; i < 7; i += 2) {
            rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
        }
        return rgb;
    }

    function gradient(startColor, endColor, step = 10) {
        // 将 hex 转换为rgb
        var sColor = hexToRgb(startColor),
            eColor = hexToRgb(endColor);

        // 计算R\G\B每一步的差值
        var rStep = (eColor[0] - sColor[0]) / step;
        let gStep = (eColor[1] - sColor[1]) / step;
        let bStep = (eColor[2] - sColor[2]) / step;

        var gradientColorArr = [];
        for (var i = 0; i < step; i++) {
            // 计算每一步的hex值
            gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
        }
        return gradientColorArr;
    }

    function getBarColors(allColor) {
        let gradient_colors = [];
        for (let i = 0; i < allColor.length - 1; i++) {
            gradient_colors = gradient_colors.concat(gradient(allColor[i], allColor[i + 1], 10))
        }
        return gradient_colors;
    }
</script>

<style scoped>

</style>
