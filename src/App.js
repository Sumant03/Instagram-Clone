import React ,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import image from './th.jpeg'; 
import Post from './Post.js';
import{ db,auth} from "./firebase";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import{Button,Input} from '@material-ui/core';
import ImageUpload from './ImageUpload.js';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const [posts,setPosts]=useState([
//     {username:"clever#Sumant" ,
//     caption:"instagram-clone huraaaay!!!" ,
//     imageUrl:"https://daviseford.com/blog/public/img/thumbnails/misc/react-logo.png"},
   
//     {username:"amaan#qazi-boi",
//      caption:"using node-js",
//     imageUrl:"https://www.hostingadvice.com/wp-content/uploads/2018/09/node-js-logo.jpg"},
 
//     {username:"ssssangha",
//   caption:"working out and building new clone",
//  imageUrl:"https://www.ionos.ca/digitalguide/fileadmin/DigitalGuide/Teaser/sass.jpg"}
 ]);
 const [open,setOpen]=useState(false);
  const classes=useStyles();
 const [openSignIn,setOpenSignIn]=useState(false);
 const[modalStyle]=useState(getModalStyle);
 const [username,setUsername]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [user,setUser]=useState(null);

//useeffect => run apiece of code on a specific condition
useEffect(()=>{
 db.collection('posts').orderBy('timestamp',).onSnapshot(snapshot=>{

  setPosts(snapshot.docs.map(doc=>doc.data()
  ));
 })
},[]);

useEffect(()=>{
const unsubscribe=auth.onAuthStateChanged((authUser)=>{
  if(authUser){
//user logged in
console.log(authUser);
setUser(authUser);
  }
 else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
//user logged out
setUser(null);  
  }
})

return() =>{
  unsubscribe();
}
},[user,username]);

const signUp=(event)=>{
event.preventDefault();

auth.createUserWithEmailAndPassword(email,password)
.then((authUser)=>{ 
 return authUser.user.updateProfile({
  displayName:username
})

})
.catch((error)=>alert(error.message))

setOpen(false);
}
const signIn=(event)=>{
  event.preventDefault();

  auth
      .signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error.message))

      setOpenSignIn(false);
          }
   
  return (
    <div className="app">
      {/* I want to have .... */}
       {/*CAPTION*/}
       {/*fIEL PICKER*/}
       {/*pOST bUTTON*/} 
       {user?.displayName?(
       <ImageUpload username={user.displayName}/>
       ):(
         <h3>Sorry,You need to login first</h3>
       )}
       


      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      
      >
        <div style={modalStyle} className={classes.paper}>
    <form className="app_signup">
    <center>
       <img className="app_headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" height="40px"/>
    </center>   
    <Input
    placeholder="username"
    type="text"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}/>
    <Input
       placeholder="email"
       type="text"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
    <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
    <Button  type="submit" onClick={signUp}>Sign Up</Button>
     
    </form>

    </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      
      >
        <div style={modalStyle} className={classes.paper}>
    <form className="app_signup">
    <center>
       <img className="app_headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" height="40px"/>
    </center>   
    
    <Input
       placeholder="email"
       type="text"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
    <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
    <Button  type="submit" onClick={signIn}>Sign In</Button>
     
    </form>

    </div>
      </Modal>
    <div className="app_header">
      <img  src={image} height="40px" className="app_headerImage"/>
       
    </div>
    {user?(
      <Button onClick={()=>auth.signOut()}>Log Out</Button>
    ):(
      <div className="app_loginContainer">
    <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
    <Button onClick={()=>setOpen(true)}>Sign Up</Button>   
   </div>
   )}
    <h1>Hello Clever Programmers</h1>
    {
    posts.map(post=>(
    <Post  username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
    ))
}
    
    {/*     Post      Posts */}
    </div>
  );
}

export default App;
