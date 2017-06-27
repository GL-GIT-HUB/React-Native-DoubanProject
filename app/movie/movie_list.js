/*
 电影列表模块：搜索栏、电影列表
 电影列表的内容：通过调用电影搜索接口获得更多的电影数据
 电影列表item单独封装的
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
let MovieItem = require("./movie_item");
let MovieWebView = require("./../common/customWebView");

let MovieList = React.createClass({
    render: function () {
        return (
            <ScrollView>
                <SearchBar placeholder="请输入电影名称"
                           onPress={this._searchPress}
                           onChangeText={this._changeText}
                />
                {
                    this.state.show ?
                        <ListView dataSource={this.state.dataSource}
                                  renderRow={this._renderRow}
                                  renderSeparator={this._renderSeparator}
                                  initialListSize={10}/>
                        : Util.loading
                }

            </ScrollView>
        );
    },
    getInitialState: function () {
        let ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow) => oldRow !== newRow
        });
        return {
            dataSource: ds,
            show: false,
            keywords: "速度激情"
        };
    },
    getData: function () {
        this.setState({
            show: false
        });
        let that = this;
        let url = ServiceUrl.movie_search + "?count=20&q=" + this.state.keywords;
        Util.getRequest(url, (data) => {
            //请求成功
            if (!data.subjects || data.subjects.length == 0) {
                return alert("未找到先关电影");
            }

            let ds = new ListView.DataSource({
                rowHasChanged: (oldRow, newRow) => oldRow !== newRow
            });

            let movies = data.subjects;
            that.setState({
                show: true,
                dataSource: ds.cloneWithRows(movies)
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
    _renderRow: function (movie) {
        return <MovieItem
            onPress={this._showDetail.bind(this, movie.title, movie.alt)}
            movie={movie}/>
    },
    _renderSeparator: function (sectionID: number, rowID) {
        let style = {
            height: 1,
            backgroundColor: "black"
        };
        return <View style={style} key={sectionID + rowID}/>
    },
    _changeText: function (text) {
        this.setState({
            keywords: text
        })
    },
    _showDetail: function (title, url) {
        let detailRoute = {
            component: MovieWebView,
            passProps: {
                backName: "电影",
                barTitle: title,
                url: url
            }
        };
        this.props.navigator.push(detailRoute);
    }
});

let styles = StyleSheet.create({});
module.exports = MovieList;