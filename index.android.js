/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    // TabBarIOS, //IOS组件 android 替代组件==> tabNavigator
} from 'react-native';
//引用第三方组件 tabNavigator
import TabNavigator from 'react-native-tab-navigator';
//隐藏状态栏
// StatusBar.setHidden(true);
//TabBarIOS管理两个模块：图书、电影
import BookList from "./app/book/book_list";
import MovieList from "./app/movie/movie_list";
import Navigation from "./app/common/navigation";

let DoubanProject = React.createClass({
    getInitialState: function () {
        return {
            selectedTab: "图书"
        }
    },
    render: function () {
        return (
            <TabNavigator tabBarStyle={{height: 90}}>
                <TabNavigator.Item
                    titleStyle={{fontSize: 20}}
                    tabStyle={{borderRightWidth: 1, borderColor: "black"}}
                    selected={this.state.selectedTab === '图书'}
                    title="图书"
                    renderSelectedIcon={() => <Image style={{height: 50, width: 50, resizeMode: 'cover'}}
                                                     source={require("./images/book_selected.png")}/>}
                    renderIcon={() => <Image style={{height: 50, width: 50, resizeMode: 'cover'}}
                                             source={require("./images/book_unselected.png")}/>}
                    // badgeText="1"
                    onPress={() => this.setState({selectedTab: '图书'})}>
                    <Navigation component={BookList}/>
                    {/*<View style={{backgroundColor: "cyan", flex: 1}}/>*/}
                </TabNavigator.Item>
                <TabNavigator.Item
                    titleStyle={{fontSize: 20}}
                    selected={this.state.selectedTab === '电影'}
                    title="电影"
                    renderSelectedIcon={() => <Image style={{height: 50, width: 50, resizeMode: 'cover'}}
                                                     source={require("./images/movie_slected.png")}/>}
                    renderIcon={() => <Image style={{height: 50, width: 50, resizeMode: 'cover'}}
                                             source={require("./images/movie_unslected.png")}/>}
                    onPress={() => this.setState({selectedTab: '电影'})}>
                    <Navigation component={MovieList}/>
                    {/*<View style={{backgroundColor: "yellow", flex: 1}}/>*/}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
});

AppRegistry.registerComponent('DoubanProject', () => DoubanProject);
