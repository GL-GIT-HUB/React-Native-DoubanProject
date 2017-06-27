/*
 图书列表模块：搜索栏、图书列表
 图书列表内容：通过调用图书搜索接口获取更多的图书数据
 图书列表Item是单独封装的
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    ScrollView
} from 'react-native';

let Util = require("./../common/utils");
let SearchBar = require("./../common/searchBar");
let ServiceUrl = require("./../common/service");
let BookItem = require("./book_item");
let BookDetail = require("./book_detail");

let BookList = React.createClass({
    getInitialState: function () {
        let ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow) => oldRow !== newRow
        });
        return {
            //dataSource
            dataSource: ds,
            //网络请求状态
            show: false,
            //搜索关键字
            //作用：1、搜索接口需要设置搜索内容2、点击搜索按钮时，修改关键字
            keywords: "React"
        }
    },
    _showDetail: function (bookID) {
        let detailRoute = {
            component: BookDetail,
            passProps: {
                bookID: bookID
            }
        };
        this.props.navigator.push(detailRoute);
    },
    render: function () {
        return (
            <ScrollView>
                <SearchBar
                    placeholder="请输入图书名称"
                    onPress={this._searchPress}
                    onChangeText={this._changeText}
                />
                {
                    //请求数据时，显示loading 成功后显示listView
                    this.state.show ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            initialListSize={10}
                            renderseparator={this._renderSeparator}
                        />
                        : Util.loading
                }
                <View style={{height: 55}}/>
            </ScrollView>
        );
    },

    getData: function () {
        //开启loading 每次搜索时需重新显示数据
        this.setState({
            show: false
        });
        //请求数据
        let that = this;
        let url = ServiceUrl.book_search + "?count=20&q=" + this.state.keywords;
        Util.getRequest(url, (data) => {
            //请求成功
            /*
             如果没相关书籍，使用alter
             {“count”:0,"start":0,"total":0,"books":[]}
             */
            if (data === null || !data.books || data.books.length === 0) {
                return alert("未查到相关书籍");
            }

            //设置下载状态和数据源
            let ds = new ListView.DataSource({
                rowHasChanged: (oldRow, newRow) => oldRow !== newRow
            });

            that.setState({
                show: true,
                dataSource: ds.cloneWithRows(data.books)
            })
        }, (error) => {
            //请求失败
            alert(error);
        })
    },
    componentDidMount: function () {
        //请求数据
        this.getData();
    },
    _renderRow: function (book) {
        return <BookItem
            onPress={this._showDetail.bind(this,book.id)}
            book={book}/>
    },
    _renderSeparator: function (sectionID: number, rowID: number) {
        let styles = {
            height: 1,
            backgroundColor: "black"
        };

        return <View style={styles} key={sectionID + rowID}/>
    },
    //TextInput的onTextChangeText事件处理方法
    _changeText: function (text) {
        this.setState({
            keywords: text
        })
    },
    _searchPress: function () {
        this.getData();
    }
});

module.exports = BookList;