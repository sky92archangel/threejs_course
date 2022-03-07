

////16进制颜色 转换 为rbg
function ColorValueToColorArray(nColor, clrArray) {
    var r = (nColor & 0xff0000) >> 16;
    var g = (nColor & 0xff00) >> 8;
    var b = (nColor & 0xff);

    clrArray[0] = r / 255;
    clrArray[1] = g / 255;
    clrArray[2] = b / 255;
}

export {ColorValueToColorArray}