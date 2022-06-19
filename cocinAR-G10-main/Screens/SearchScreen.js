import React, { Component } from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Touchable,
} from "react-native";
import _ from "lodash";
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({ loading: true });

    this.getUsers(2, this.state.query)
      .then((users) => {
        this.setState({
          loading: false,
          data: users,
          fullData: users,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }, 250);

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, (user) => {
      return this.contains(user, formattedQuery);
    });
    this.setState({ data, query: text }, () => this.makeRemoteRequest());
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Buscar"
        lightTheme
        round
        onChangeText={this.handleSearch}
        value={this.state.query}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  getUsers = (limit = 2, query = "") => {
    return new Promise((resolve, reject) => {
      if (query.length === 0) {
        resolve(_.take(users, limit));
      } else {
        const formattedQuery = query.toLowerCase();
        const results = _.filter(users, user => {
          return contains(user, formattedQuery);
        });
        resolve(_.take(results, limit));
      }
    });
  };

  contains = ({ nombre }, query) => {
    const { first } = nombre;
    if (first.includes(query)) {
      return true;
    }
  
    return false;
  };

  render() {
    const { postId, users } = this.props.route.params;
    return (

      <SafeAreaView>
        <StatusBar style="light-content" />
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <Avatar style={styles.avatar} source={{ uri: item.receta.foto }} rounded />
              <ListItem.Content >
                <ListItem.Title style={styles.content}>{`${item.receta.nombre}`}</ListItem.Title>
                <ListItem.Subtitle>{item.creatorNickname}</ListItem.Subtitle>
              </ListItem.Content>
              <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Recetas', {
                screen: 'SearchScreen',
                params: {recetass: item.receta }, pasos: item.pasos, usuario: item.creatorNickname
              });
            }}>
              <ListItem.Chevron size={35} color="pink" />
              
              </TouchableOpacity>
              
            </ListItem>
          )}
          keyExtractor={(item) => item.receta.idReceta}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    content:{
        fontSize: 30
    },
    avatar:{
        width: 100,
    }
})

export default SearchScreen;