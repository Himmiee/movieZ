
import { View, Text, StyleSheet, Pressable, Modal ,ScrollView ,FlatList, Image , TouchableHighlight} from "react-native";
import { useState , useEffect} from "react";
import axios from "axios";

const Home = () => {

  const img_300 = "https://image.tmdb.org/t/p/w300";
  const img_500 = "https://image.tmdb.org/t/p/w500";
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

  const [data , setData] = useState([])
  const [selected, setSelected] = useState({})

  const fetchMovies = async() => {
    const { data } = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=1610ef802f862118fd0e001e9f943229&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      );
      // console.log(data);
      setData(data.results);
      
}

const openPopup = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1610ef802f862118fd0e001e9f943229&language=en-US`
  );
  let details = data
  console.log(details)
  setSelected(details)
}

useEffect(() => {

    fetchMovies();
  
  }, []);

  return(
  
    <ScrollView>
      <View style={styles.home}>
      <Text style={styles.main}>My Moviez</Text>
      {
          data.map((post) => (
            <TouchableHighlight 
            style={styles.item}
            key={post.id}
            onPress={() => openPopup(post.id)}>
            <View key={post.id} >
            <Image source={{uri : "https://image.tmdb.org/t/p/w300/kuf6dutpsT0vSVehic3EZIqkOBt.jpg"}} style={styles.images} />
              {/* <Image source={ post.poster_path ? {uri : require(img_300 + post.poster_path)} : unavailable} style={styles.images} /> */}
              <Text style={styles.title}>{post.title}</Text>
            </View>
            </TouchableHighlight>
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
       <View style={styles.container}>
        <Text style={styles.poptitle}>{selected.title}</Text>
        <Text style={styles.rating}>Rating : {selected.vote_average} </Text>
        <Text style={styles.release}>{selected.status}</Text>
        <Text style={styles.info}>{selected.overview}</Text>
       </View>
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
  container:{
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 50
   
  },
  images: {
    flex: 1,
    width: 300,
    height: 300
  },
  title: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    // width: 350,
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
    
  }, item:{
    width: "98%",
  },
  rating: {
   fontWeight: 400,
   paddingTop: 40,
   fontSize: 18,
   color: "#fff",
   display: "flex",
   justifyContent: "center",
   padding: 5,
 
  
   
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
  popup: {
    padding: 5,
    backgroundColor: "#445565",
    paddingTop: 0,
    height: "93.5vh"
   
  },
  poptitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    margin: "auto"
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

export default Home;