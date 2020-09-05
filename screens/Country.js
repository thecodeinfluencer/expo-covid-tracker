import React ,{setState}from 'react';
import { ScrollView ,Text,View,ActivityIndicator,Picker,StyleSheet} from 'react-native';
import {StyledText} from '../components/StyledText'
import { TouchableOpacity } from 'react-native-gesture-handler';
import  * as WebBrowser from 'expo-web-browser'


export default function Country ({navigation,route}) { 

    const [country,setCountry] = React.useState({})
    const [countryLoaded,setCountryLoaded] = React.useState(false)


    React.useEffect(()=> {
        fetch(`https://covid19.mathdro.id/api/countries/${route.params.state}`)
        .then((resp) =>  { resp.text()
            .then((text) => {
                
                setCountry(JSON.parse(text));
                setCountryLoaded(true)
            })
        }); 
    },[])

    const InfoCard = ({heading,value}) => {
        return (<View style={{backgroundColor:"#5f6267",borderRadius:1,padding:8,marginBottom:16}}>
                <StyledText style={{color:"#89b4f8"}}>{heading}</StyledText>
                <StyledText style={{color:"#89b4f8",fontSize:24,paddingLeft:10}}>{value}</StyledText>
            </View>)
    }

    const Summary = () => {
        if(!countryLoaded){
            return null;
        }else{
            return (
            <View style={styles.view}>
                <StyledText style={{fontSize:12,color:"#5f6267"}}>OVERVIEW</StyledText>
                <StyledText style={{fontSize:20,color:"#fff",marginVertical:24}}>Here's the information on COVID-19 in {route.params.state}</StyledText>
                <InfoCard heading="CONFIRMED" value={country.confirmed.value}/>
                <InfoCard heading="RECOVERED" value={country.recovered.value}/>
                <InfoCard heading="DEATHS" value={country.deaths.value}/>
            </View>
            )
        }
    }

    return !countryLoaded ? (
        <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center",flex:1}} style={{backgroundColor:"#202125",paddingBottom:20}}>
            <ActivityIndicator size="large" color="#8ab6f7"/>
        </ScrollView>
    ) : (
        <ScrollView style={{backgroundColor:"#202125",paddingBottom:20}}>
            <Summary/>
        </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    view:{
        marginVertical:8,
        marginHorizontal:8,
        paddingHorizontal:16,
        paddingVertical:16,
        borderRadius:4,
        borderColor:"#5f6267",
        borderWidth:1
    }
})
