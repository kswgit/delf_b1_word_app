import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {
  Icon
} from 'react-native-elements'
import Swiper from 'react-native-swiper'
import { combine, shuffle } from './word'
import axios from 'axios'
const { width } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    backgroundColor: '#2b382e',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    borderRadius:100,
    // backgroundColor: '#123456'
  },

  text: {
    color: '#c0c0c0',
    fontSize: 48,
    fontWeight: 'bold'
  },

  pagination: {
    backgroundColor: '#2b382e',
    color: '#c0c0c0',
    textAlign: 'right',
  },

  image: {
    width,
    flex: 1
  }
}

const pagination = (idx, total) => <Text style={styles.pagination}>{
  `${Math.floor(idx/2+1)}/${Math.floor(total/2)}`
}</Text>

export default class Swipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      french: [],
      korean: [],
      wordset: [],
      rerender: false,
    }
  }
  componentWillMount() {
    Promise.all([
      axios.get("https://raw.githubusercontent.com/kswgit/wordset/master/delf_b1_fr.json"),
      axios.get("https://raw.githubusercontent.com/kswgit/wordset/master/delf_b1_ko.json")
    ])
    .then(e => this.setState({
      french: e[0].data,
      korean: e[1].data,
      wordset: combine(e[0].data, [e[1].data]),
      totalpg: e[0].data.length,
      rerender: !this.state.rerender
    }))
  }
  onPressShuffle() {
    this.setState({
      wordset: combine(shuffle(this.state.french), [this.state.korean]),
      rerender: !this.state.rerender
    })
  }
  render () {
    const {
      wordset,
      rerender
    } = this.state
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={200} horizontal={true} renderPagination={pagination} key={rerender}>
          {
            wordset.map((e, idx) => 
              <View style={styles.slide1} key={idx}>
                <Text style={styles.text}>{e.w}</Text>
              </View>)
          }
        </Swiper>
        <TouchableOpacity style={styles.button}  onPress={() => this.onPressShuffle()}>
          <Icon
            reverse
            name='shuffle'
            type='shuffle'
            color='#517fa4'
            size={30}
          />
        </TouchableOpacity>
      </View>
    )
  }
}