/*
 实现功能：封装Header，在头部显示标题和返回按钮

 包含组件：

 外部传入：
 navigator 点击返回上一级页面
 initObj（backName,barTitle）返回按钮的名称、标题
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
//导入 左侧按钮
let Icon = require("./left_icon");

let Header = React.createClass({
    render: function () {
        //获取obj对象，包括：backName barTitle
        let headerContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={this._pop}
                    style={styles.left_btn}>
                    <Icon/>
                    <Text style={styles.btn_text}>{headerContent.backName}</Text>
                </TouchableOpacity>

                <View style={styles.title_container}>
                    <Text style={styles.title} numberOfLines={1}>{headerContent.barTitle}</Text>
                </View>
            </View>
        );
    },

    //返回按钮事件处理
    _pop:function () {
        this.props.navigator.pop();
    }
});

let styles = StyleSheet.create({
    header: {
        height: 44,
        backgroundColor: "#3497FF",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    },
    left_btn: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    },
    btn_text: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "bold",
    },
    title_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    title: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 18,
        width: 200
    }
});

module.exports = Header;