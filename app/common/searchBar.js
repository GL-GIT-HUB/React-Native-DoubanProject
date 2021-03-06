/*
 实现功能：封装搜索栏组件，包括文本输入框和搜索按钮

 包含组件：

 外部传入：
 输入框和按钮的属性设置由外部传入：例如：placeholder/onPress/onChangeText
 使用...this.props将外部传入的属性设置给TextInput和TouchableOpacity

 注意：指定高度、边框颜色、边框线宽
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

let SearchBar = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} {...this.props}/>
                </View>
                <TouchableOpacity style={styles.btn} {...this.props}>
                    <Text style={styles.search}>搜索</Text>
                </TouchableOpacity>
            </View>
        );
    }
});

let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        height: 44,
        marginTop: 10
    },
    inputContainer: {
        flex: 1,
        marginTop: 5
    },
    input: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#CCC",
        paddingLeft: 5
    },
    btn: {
        width: 55,
        height: 44,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "#23BEFF",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    search: {
        flex: 1,
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 33
    }
});

module.exports = SearchBar;