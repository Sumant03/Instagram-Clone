import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import {storage,db} from "./firebase";



function ImageUpload({username}) {
    
    const [image,setImage]=useState(null);
    const [progress,setProgress]=useState(0);
    const [caption,setcaption]=useState('');

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

const handleUpload=()=>{
   const uploadTask=storage.ref(`images/${image.name}`).put(image);

       uploadTask.on(
           "state_changed",
           (snapshot)=>{
               //progress function .....
               const progress =Math.round(
               (snapshot.bytesTransferred/snapshot.totalBytes)*100
               );
               setProgress(progress);
            },
            (error)=>{
                //Error fucntion ....
                console.log(error);
                alert(error.message);
            },
            () =>{
                storage   
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                   db.collection("posts").add({
                       //    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
                        });

                        setProgress(0);
                        setcaption("");
                        setImage(null);
                    });
            }
       ) ;  

};
    return (
        <div>
            
       {/* I want to have .... */}
       {/*CAPTION*/}
       {/*fIEL PICKER*/}
       {/*pOST bUTTON*/}
       <progress value={progress} max="100"/>
       <input type="text" placeholder="Enter a caption" onChange={event=>setcaption(event.target.value)} value={caption}/>
       <input type="file" onChange={handleChange}/>
       <Button onClick={handleUpload}> Upload</Button>
                       
        </div>
    )
}

export default ImageUpload