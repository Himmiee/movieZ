
import { View, Text, StyleSheet, Pressable ,ScrollView ,FlatList, Image , Button, TouchableHighlight, Modal} from "react-native";
import { useState , useEffect} from "react";
import axios from "axios";
import QRCODE from "../components/Qrcode";

const Event = () => {

  const img_300 = "https://image.tmdb.org/t/p/w300";
  const img_500 = "https://image.tmdb.org/t/p/w500";
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

  const [data , setData] = useState([])
  const initialItemState = {
    title : "Moviez",
    release_date : "2022-02-02"
  }
  const [selected, setSelected] = useState({})
  
  const [item, setItem] = useState(initialItemState);
  const [productQRref, setProductQRref] = useState();
  
  // const [loading, setLoading] = useState(true)

  // const url = "http://localhost:3000/movies"
  

  // useEffect(() => {
  //   fetch(url)
  //   .then((response) => response.json())
  //   .then((json) => setData(json))
  //   .catch((error) => console.log(error))
  //   .finally(() => setLoading(false))
  // },[])

  const fetchMovies = async() => {
    const { data } = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=1610ef802f862118fd0e001e9f943229&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false"
      );
      // console.log(data);
      setData(data.results);
      
}
const openPopup = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1610ef802f862118fd0e001e9f943229&language=en-US`
  );
  let details = data
  // console.log(details)
  setSelected(details)
}

useEffect(() => {

    fetchMovies();
  
  }, []);

  return(
    <ScrollView>
      <View style={styles.home}>
      <Text style={styles.main}>Upcoming Events</Text>
      {
          data.map((post) => (
            <View key={post.id} style={styles.item}>
              {/* <Image source={ post.poster_path ? {uri : require(`${img_300}${post.poster_path}`)} : unavailable} style={styles.images}/> */}
              
              <Text style={styles.title}>{post.title}  %% Release Date -- {post.release_date} %% </Text>
              {/* <Text style={styles.release}></Text>        */}
              <Button color="#445565"  title="Add Event" onPress={() => openPopup(post.id)}></Button>
              
            </View>
            
          )
        )
      }
     
    </View>
    <Modal 
    animationType="fade"
    transparent={false}
    visible={(typeof selected.title != "undefined")}
    >
     <View style={styles.popup}>
      <Text style={styles.poptitle}>Event Details</Text>
      <Text style={styles.tit}>Latest Information on {selected.title} Movie</Text>
   <QRCODE 
      value={JSON.stringify({
       title: selected.title,
       release_date: selected.release_date,
      })}
      getRef={(c) => setProductQRref(c)}/>

      <Text style={styles.tagline}>Tagline : {selected.tagline}</Text>
      <Text style={styles.release_date}>Release Date : {selected.release_date}</Text>
      <Text style={styles.release}>Status : {selected.status}</Text>
      <Text style={styles.info}>{selected.overview}</Text>
     </View>
     <TouchableHighlight
     onPress={() => setSelected({})}
     >
     <Text style={styles.closeBtn}>Close</Text>
     </TouchableHighlight>
    </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    home:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        padding: 10,
        backgroundColor: "#223343" 
    },
    images: {
      flex: 1,
      width: 300,
      height: 300
    },
    title: {
      backgroundColor: "#fff",
      padding: 2,
      margin: 5,
      fontWeight: 500,
      textAlign: "center",
      justifyContent: "space-between",
      fontSize: 15
    },
    tit: {
      backgroundColor: "#fff",
      padding: 6,
      margin: 20,
      fontWeight: 500,
      textAlign: "center",
      justifyContent: "space-between",
      fontSize: 15
    },
    release: {
      backgroundColor: "#223343",
      padding: 2,
      margin: 5,
      justifyContent: "space-between",
      fontSize: 15
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      margin: "auto",
      color: "#fff",
      padding: 10,
      fontWeight: 700,
      fontSize: 32,
      marginBottom: 20,
      
    },
    tagline : {
     display: "flex",
     justifyContent: "center",
     color: "#fff",
     padding: 2,
     paddingTop: 40,
    },
    release_date : {
      display: "flex",
      justifyContent: "center",
      color: "#fff",
      padding: 2
     },
     item:{
      display: "flex",
      width: "98%",
      backgroundColor: "#fff",
      margin: 5,
      border: "1px solid #fff"
 
    },
    popup: {
      padding: 10,
      backgroundColor: "#445565",
      paddingTop: 5,
      display: "flex",
      height: "93%",
      justifyContent: "center",
      alignItems: "center",
    },
    poptitle: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 5,
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      margin: "auto"
    },
     release: {
     fontWeight: 400,
     fontSize: 18,
     color: "#fff",
     display: "flex",
     justifyContent: "center",
     marginBottom: 20,
     padding: 5
    },
    closeBtn: {
      padding: 20,
      paddingTop: 20,
      fontWeight: 20,
      fontWeight: 700,
      backgroundColor:"#445565",
      color: "#fff",
      border: "1px solid #fff"
    },
    info: {
      color: "#fff",
      fontSize: 16,
      padding: 15
    }
    
})

export default Event;