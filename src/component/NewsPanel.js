import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
//import { Button, Card } from 'react-native-material-design';

/*
  TODO match this up to the bullitin project as far as itterating the
  data that exist and setting up all that. Then we will take all those
  ids and push them through react-native-router <3 Should be easy!
  */
export default class NewsPanel extends Component {

    constructor(props) {
        super(props)

        this.state ={
            modalVisible:false,
        }
    }

    componentDidMount() {
    }

    clickEventListener = (item) => {
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    render() {
        return (
  <View style={styles.container}>
   <FlatList
     style={styles.userList}
     columnWrapperStyle={styles.listContainer}
     data={[this.props]}
     keyExtractor= {(item) => {
       return item.id;
     }}
     renderItem={({item}) => {
     return (
       <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
         <View style={styles.cardContent}>
           <Text style={styles.name}>{item.game}</Text>
           <Text style={styles.position}>{item.deck}</Text>
           <TouchableOpacity style={styles.followButton} onPress={()=> this.setModalVisible(true)}>
             <Text style={styles.followButtonText}>Read More</Text>
           </TouchableOpacity>
         </View>
       </TouchableOpacity>
     )}}/>

   <Modal
     animationType={'fade'}
     transparent={true}
     onRequestClose={() => this.setModalVisible(false)}
     visible={this.state.modalVisible}>

     <View style={styles.popupOverlay}>
       <View style={styles.popup}>
         <View style={styles.popupContent}>
           <ScrollView contentContainerStyle={styles.modalInfo}>
               <Text style={styles.name}>{this.props.game}</Text>
               <Text style={styles.position}>{this.props.deck}</Text>
               <Text style={styles.position}>{this.props.description}</Text>
           </ScrollView>
         </View>
         <View style={styles.popupButtons}>
           <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
             <Text style={styles.txtClose}>Close</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   </Modal>
 </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:200,
    width:200,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },



  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '100%',
    padding: 10,
    flexDirection:'row',
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:16,
    flex:1,
    alignSelf:'center',
    color:"#696969",
    height: 100
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});
