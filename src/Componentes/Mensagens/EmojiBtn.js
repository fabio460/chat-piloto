import React, { useState } from 'react'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Emoji from './Emoji';
export default function EmojiBtn() {
    const [emojiVisible,setEmojiVisible]= useState(true)
    const hendleEmoji = ()=>{
        setEmojiVisible(!emojiVisible)
    }
  return (
    <div>
        <div style={{
            position:"absolute",
            height:"250px",
            background:"white",
            bottom:"162px",
            
            display:emojiVisible?"none":"block"
        }}><Emoji hendleEmoji={hendleEmoji}/></div>
        <SentimentVerySatisfiedIcon onClick={hendleEmoji}/>
    </div>
  )
}
