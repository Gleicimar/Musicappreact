import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity,LogBox } from 'react-native';
import React,{useState,useEffect} from 'react';
import {Audio} from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
LogBox.ignoreAllLogs=true;



export default  function Player(props){

    
const handleBack = async()=>{
    //console.log(volta uma musica)
    let newIndex =props.audioIndex - 1;
    if(newIndex < 0){
        newIndex =props.musicas.length -1;

    }
    props.setarAudioIndex(newIndex);
    let curFile = props.musicas[newIndex].file
    let newMusics = props.musicas.filter((val,k)=>{
        if(newIndex == k){
          props.musicas[k].playing = true;
          curFile = props.musicas[k].file;
        }else{
          props.musicas[k].playing= false;
  
        }
        return props.musicas[k]
  
    })
    if(props.audio != null){
        props.audio.unloadAsync()
        }else{
        let curAudio = new Audio.Sound();
        try{
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
        }catch(error){
            console.log('erro ao reproduzir')
        }
        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
        }
}

const handleNext = async()=>{
    //console.log("entrou no proximo")
    let newIndex = props.audioIndex + 1;
    if(newIndex >= props.musicas.length){
        newIndex = 0;
    }
    props.setarAudioIndex(newIndex);
    let curFile = props.musicas[newIndex].file
    let newMusics = props.musicas.filter((val,k)=>{
        if(newIndex == k){
          props.musicas[k].playing = true;
          curFile = props.musicas[k].file;
        }else{
          props.musicas[k].playing= false;
  
        }
        return props.musicas[k]
  
    })
    if(props.audio != null){
        props.audio.unloadAsync()
        }else{
        let curAudio = new Audio.Sound();
        try{
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
        }catch(error){
            console.log('erro ao reproduzir')
        }
        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
        }

    
}
const handlePlay = async()=>{
    //console.log(inicia o play)
    let curFile = props.musicas[props.audioIndex].file;
    let newMusics = props.musicas.filter((val,k)=>{
        if(props.audioIndex == k){
          props.musicas[k].playing= true;
          curFile=props.musicas[k].file;
        }else{
          props.musicas[k].playing= false;
  
        }
        return props.musicas[k]
  
    })
    try{
        if(props.audio != null){
        props.setPlaying(true);
        props.setarMusicas(newMusics);
        await props.audio.playAsync();
        }else{
        let curAudio = new Audio.Sound();
        try{
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
        }catch(error){
            console.log('erro ao reproduzir')
        }
        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
        }
    }catch(error){
    console.log('erro ao reproduzir')
    }


}
    const handlePause=async()=>{
if(props.audio!=null){
    props.audio.pauseAsync();
    }  
    props.setPlaying(false);

}


return(
    <View style={styles.player}>
        <View style={styles.playAlign}>
            <TouchableOpacity onPress={()=>handleBack()}>
            <AntDesign name="banckward" size={45} color="white" right={20} />
            </TouchableOpacity>
            {
                (!props.playing) ?
                <TouchableOpacity onPress={()=>handlePlay()}>
                <AntDesign name='playcircleo' size={45}  color="white" />
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=>handlePause()}>
                <AntDesign name='pausecircleo' size={45}  color="white" />
                </TouchableOpacity>  
            }
            <TouchableOpacity  onPress={()=>handleNext()}>
                <AntDesign name='forward' size={45} color="white" left={20}/>
            </TouchableOpacity>
        
        </View>
    </View>
        
);

}

const styles = StyleSheet.create({
    player: {
    width:'100%',
    position:'absolute',
    zIndex:999,
    height:100,
    bottom:0,
    left:0,
    
      backgroundColor: '#111',
    },
    playAlign:{
        flexDirection:'row',
        justifyContent:'center',
        top:20
    }

});