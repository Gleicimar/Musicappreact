import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity, LogBox } from 'react-native';
import {Audio} from 'expo-av';
import React,{useState,useEffect} from 'react';
import {AntDesign} from "@expo/vector-icons";
import Player from "./Player.js"
 LogBox.ignoreAllLogs=true;
export default function App() {
  const [audioIndex,setarAudioIndex]= useState(0);
  const [playing,setPlaying]=useState(false);
  const [audio,setarAudio]=useState(null);
  const [musicas,setarMusicas]= useState([
    {
      id:'1',
      nome:'Sweet child of Mine',
      artista:'Guns N Rose',
      playing:false,
      file:require('./mp3/Guns N Roses - Sweet Child of Mine.mp3'),
    },
   
    { 
      id:'2',
      nome:'Memories',
      artista:'Maroon 5',
      playing:false,
      file:require('./mp3/Memories-Maroon-5.mp3'),
    },
    {
      id:'3',
      nome:'Knock knock on heavens door',
      artista:'Guns N Rose',
      playing:false,
      file:'',
    },
    
  ]);

const changeMusic =async (id)=>{
  let curlFile = null;
  let newMusics = musicas.filter((val,k)=>{
      if(id == k){
        musicas[k].playing= true;
        curlFile=musicas[k].file;
        setPlaying(true)
      }else{
        musicas[k].playing= false;

      }
      return musicas[k]

  })
  if(audio != null){
    audio.unloadAsync()
  }
  let curlAudio = new Audio.Sound();
  try{
    await curlAudio.loadAsync(curlFile);
    await curlAudio.playAsync()
  }catch(error){}

  setarAudio(curlAudio);
  setarMusicas(newMusics);
}

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        <StatusBar hidden />

    <View style={styles.header}>
      <Text style={styles.titulo}>M Play</Text>
    </View>
    <View style={styles.table}>
<Text  style={styles.musica}>Musica</Text>
      <Text style={styles.musica}>Artista</Text>
    </View>
    {
      musicas.map(function(val,k){
        if(val.playing){
          return(
            <View style={styles.table}>
            <TouchableOpacity onPress={()=>changeMusic(k)}  style={{width:'100%',flexDirection:'row'}}>
            <Text style={styles.playing}key={val.id} ><AntDesign name="play" size={18} color="#1DB954" marginRight={5}/> {val.nome}</Text>
            <Text style={styles.playing}>{val.artista}</Text>
            </TouchableOpacity>
        </View>
          )
          
        }else{
          return(
        <View style={styles.table}>
              <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%',flexDirection:'row'}}>
                 <Text style={styles.Noplaying}><AntDesign name="play" size={18} color="white"/> {val.nome}</Text>
                <Text style={styles.Noplaying}> {val.artista}</Text>
                </TouchableOpacity>
            </View>
          );
        }

      })
    }
<View style={{padding:200}}></View>
    </ScrollView>
<Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio} ></Player>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:{
    backgroundColor:'#1DB954',
    padding:10,
width:'100%'
  },
titulo:{
  fontSize:25,
  textAlign:'center',
  color:'white',
},
table:{
  flexDirection:'row',
  borderBottomColor:'rgba(120,120,120,0.3)',
  borderBottomWidth:1,
  padding:10
},
musica:{
  width:'50%',
  color:'rgba(200,200,200,0.2)',
  fontSize:20,
},

playing:{
  color:'#1DB954',
  fontSize:18,
  padding:10
},
Noplaying:{
  color:'rgba(250,250,250,0.2)',
  fontSize:15,
  
  padding:10
}



});
