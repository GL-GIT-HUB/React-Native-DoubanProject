/*
 实现功能： 封装返回阿牛图标，不使用图片

 包含组件：

 外部传入：
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

let Icon = React.createClass({
    render: function () {
        return (
            <View>
                <View style={styles.go}></View>
            </View>
        );
    }
});

let styles = StyleSheet.create({
    go: {
        width: 15,
        height: 15,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: "#FFF",
        marginLeft: 10,
        transform: [{rotate: "45deg"}]  //讲一个矩形框 旋转45度

    }
});

module.exports = Icon;