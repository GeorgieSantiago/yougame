import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native';
import axios from 'axios'
import NewsPanel from './component/NewsPanel'

export default class Main extends Component {

    constructor() {
        super()

        this.state = {
            data: null,
            status: "false",
            limit: 0,
            resultLimit: 10
        }
    }

    async componentDidMount() {
        //TODO store local version of fetch and use that instead if nothing has changed
        await axios.get(`https://www.giantbomb.com/api/reviews/?api_key=e98d0b2b95ba3313917e5adf2e221860358ffeb7&format=json&limit=${this.state.resultLimit}`,{

        })
            .then(response => {
                if(response.data.error == "OK") {
                    this.setState({
                        data: [response.data],
                        status: response.data.error
                    })
                }
            })
            .catch(e => {
                console.error("error", e);
            });
    }

    checkNewsFeed = () => {
        if(this.state.status == "OK") {
            return true
        } else {
            return false
        }
    }

    renderNewsFeed = (data,i) => {
        let cleanText = data.description.replace(/<\/?[^>]+(>|$)/g, "");
          return (<NewsPanel
                key={i}
                id={i}
                deck={data.deck}
                score={data.score}
                game={data.game.name}
                description={cleanText}
                />
          )
          if(this.state.limit < this.state.resultLimit) {
            this.setState({
              limit: this.state.limit + 1
            })
          }
    }

    render() {
        let content
        if(this.state.status == "OK") {
            content = this.state.data[this.state.limit].results.map((data) => this.renderNewsFeed(data))
        } else {
            content = <Text>Loading...</Text>
        }
        return(
            <View>
                <Text style={styles.mainHeader}>Feed: </Text>
                {content}
            </View>
        )


    }
}
const styles = StyleSheet.create({
  mainHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 32,
  },
})
