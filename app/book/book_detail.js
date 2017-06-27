/*
 图书详情

 实现功能：展示图书详情，包括：图书信息、图书简介、作者简介

 包含组件：基本组件、BookItem(图书信息使用BookItem展示)

 外部传入：

 需要使用的字段：
 *图书详情
 *image 图书缩略图
 * title 图书名称
 * publisher 出版社
 * author 作者
 * price 价格
 * pages 图书总页数
 * summary 图书简介
 * author_intro 作者简介
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

let ServiceUrl = require("./../common/service");
let BookItem = require("./book_item");
let Header = require("./../common/header");
let Util = require("./../common/utils");

let BookDetail = React.createClass({
    getInitialState: function () {
        return {
            bookData: null//图书对象详情信息
        }
    },
    render: function () {
        return (
            <ScrollView
                style={styles.container}
            >
                {
                    this.state.bookData ?
                        <View>
                            <Header
                                navigator={this.props.navigator}
                                initObj={{backName: "图书", barTitle: this.state.bookData.title}}
                            />
                            <BookItem
                                book={this.state.bookData}
                            />
                            <View>
                                <Text style={styles.title}>图书简介</Text>
                                <Text style={styles.text}>{this.state.bookData.summary}</Text>
                            </View>

                            <View style={{marginTop: 10}}>
                                <Text style={styles.title}>作者简介</Text>
                                <Text style={styles.text}>{this.state.bookData.author_intro}</Text>
                            </View>
                            <View style={{height: 55}}/>
                        </View> : Util.loading
                }
            </ScrollView>
        );
    },
    getData: function () {
        let that = this;
        let url = ServiceUrl.book_detail_id + this.props.bookID;
        Util.getRequest(url, (data) => {
            //请求成功
            that.setState({
                bookData: data
            })
        }, (error) => {
            //请求失败
            alter(error);
        })
    },
    componentDidMount: function () {
        //请求图书详情
        this.getData();
    }
});

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    title: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: "bold"
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        color: "#CCC"
    }
});
module.exports = BookDetail;