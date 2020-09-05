import React ,{setState}from 'react';
import { ScrollView ,Text,View,ActivityIndicator,Picker,StyleSheet} from 'react-native';
import {StyledText} from '../components/StyledText'
import { TouchableOpacity } from 'react-native-gesture-handler';
import  * as WebBrowser from 'expo-web-browser'

export default function HomeScreen({navigation}) {

    const [api,setApi] = React.useState({confirmed:{"value":23292},recovered:{"value":16292},deaths:{"value":30292}});
    const [loaded,setLoaded] = React.useState(false);
    const [countryLoaded,setCountryLoaded] = React.useState(false);
    const [countriesLoaded,setCountriesLoaded] = React.useState(false);
    const [selectedCountry,setSelectedCountry] = React.useState("kenya");
    const [country,setCountry] = React.useState({});
    const [countries,setCountries] = React.useState([]);



    React.useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/countries/${selectedCountry}`)
        .then((resp) =>  { resp.text()
            .then((text) => {
                
                setCountry(JSON.parse(text));
                setCountryLoaded(true)
            })
        }); 

        fetch("https://covid19.mathdro.id/api/")
        .then((resp) =>  { resp.text()
            .then((text) => {
                setApi(JSON.parse(text))
                setLoaded(true)
            })
        });  

        
        fetch(`https://covid19.mathdro.id/api/countries`)
        .then((resp) =>  { resp.text()
            .then((text) => {
                const countriesArray = JSON.parse(text).countries
                setCountries(countriesArray)
                setCountriesLoaded(true)
            })
        }); 

    },[]);


    const LinkText = ({text,link}) => {
        return (
        <TouchableOpacity  onPress={() => WebBrowser.openBrowserAsync(link)}>
            <View>
                <StyledText style={{color:"#89b4f8",textDecorationStyle:"solid",textDecorationLine:"underline",textDecorationColor:"#89b4f8",fontSize:16}}>{text}</StyledText>
            </View>
        </TouchableOpacity>
        )
    }
    
    const InfoCard = ({heading,value}) => {
        return (<View style={{backgroundColor:"#5f6267",borderRadius:1,padding:8,marginBottom:16}}>
                <StyledText style={{color:"#89b4f8"}}>{heading}</StyledText>
                <StyledText style={{color:"#89b4f8",fontSize:24,paddingLeft:10}}>{value}</StyledText>
            </View>)
    }
    
    
    const Summary = () => {
        return (
        <View style={styles.view}>
            <StyledText style={{fontSize:12,color:"#5f6267"}}>OVERVIEW</StyledText>
            <StyledText style={{fontSize:20,color:"#fff",marginVertical:24}}>Here's the information on COVID-19 globally</StyledText>
            <InfoCard heading="CONFIRMED" value={api.confirmed.value}/>
            <InfoCard heading="RECOVERED" value={api.recovered.value}/>
            <InfoCard heading="DEATHS" value={api.deaths.value}/>
        </View>
        )
    }
    
    const CountryWise = () => {
        if(!countryLoaded){
            return null;
        }else{
            return (
            <View style={styles.view}>
                <StyledText style={{fontSize:12,color:"#5f6267"}}>COUNTRYWISE</StyledText>
                <StyledText style={{fontSize:20,color:"#fff",marginVertical:24}}>The following are the values within Kenya</StyledText>
                <InfoCard heading="CONFIRMED" value={country.confirmed.value}/>
                <InfoCard heading="RECOVERED" value={country.recovered.value}/>
                <InfoCard heading="DEATHS" value={country.deaths.value}/>
            </View>
            )
        }
    }
    
    const Resources = () => {
        return (
        <View style={[styles.view,{paddingBottom:40,marginBottom:20}]}>
            <StyledText style={{fontSize:12,color:"#5f6267"}}>RESOURCES</StyledText>
            <StyledText style={{fontSize:20,color:"#fff",marginVertical:24}}>You can get more info about COVID-19 from: </StyledText>
            <LinkText text="World Health Organization" link="https://who.int/health-topics/coronavirus"/>
            <LinkText text="Ministry of Health" link="http://www.health.go.ke/covid-19/"/>
            <LinkText text="Dial *719# for  information"/>
            <StyledText style={{fontSize:16,color:"#fff",marginVertical:24}}>You can view statistics of other countries by selecting a country from below: </StyledText>
            <View style={{borderRadius:2,borderWidth:1,borderColor:"#8ab6f7",paddingLeft:10}}>
                <Picker 
                    style={{color:"#fff",}}
                    itemStyle={{backgroundColor:"#5f6267"}}
                    selectedValue={selectedCountry}
                    onValueChange={(value, index) => {
                        navigation.navigate('Country Statistics',{confirmed:"con",recovered:"rec",deaths:"de",state:value})
                    }}>
                    <Picker.Item  label="Select Country" value={null} />
                    {countries.map(item => <Picker.Item key={item.name} label={item.name} value={item.name} />)}
                </Picker>
            </View>
            <StyledText style={{fontSize:16,color:"#8ab6f7",marginVertical:24}}>Please stay safe by following the recommended practices. </StyledText>
            <StyledText style={{fontSize:16,color:"#8ab6f7",marginVertical:24}}>#weareinthistogether</StyledText>
        </View>
        )
    }

    return !loaded && !countryLoaded ? (
        <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center",flex:1}} style={{backgroundColor:"#202125"}}>
            <ActivityIndicator size="large" color="#8ab6f7"/>
        </ScrollView>
        ):
        (
            <ScrollView style={{backgroundColor:"#202125",paddingBottom:20}}>
                <Summary/>
                <CountryWise/>
                <Resources/>
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
