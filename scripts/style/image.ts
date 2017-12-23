var imageRegex = /url\([\'\"](\S*?\.png)[\'\"]\)/g;
var pathUtil = require('path');
let fs = require('fs');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');

export async function cssImage(css: string, file: string) {
    css = css.toString();
    // 检查图片并转换base64
    if (imageRegex.test(css)) {
        let contentTemp = css.toString().replace(imageRegex, function (match, fileName) {
            fileName = fileName.replace("'", '');
            fileName = fileName.replace("'", '');
            fileName = fileName.replace('"', '');
            fileName = fileName.replace('"', '');
            let filePath = pathUtil.resolve(pathUtil.dirname(file), fileName);
            let content = fs.readFileSync(filePath);
            let base64 = 'url(data:image/png;base64,' + content.toString("base64") + ')';
            return base64;
        });
        css = contentTemp;
    }
    css.replace(/\\e/g, function (match, e) {
        // 对content中的类似'\e630'中的\e进行处理
        return '\\\\e';
    }).replace(/\\E/g, function (match, e) {
        // 对content中的类似'\E630'中的\E进行处理
        return '\\\\E';
    }).replace(/\\20/g, function (match, e) {
        // 对content中的类似'\20'中的\20进行处理
        return '\\\\20';
    }).replace(/`/g, function (match, e) {
        // 处理css中`符号
        return "'";
    }).replace(/\/\*[\s\S]*?\*\//g, function (match, e) {
        // 去掉注释
        return "";
    }).replace(/\s*/g, function (match, e) {
        return "";
    });
    let output = await postcss([ autoprefixer ]).process(css)
    // autofix
    return output.css;
}