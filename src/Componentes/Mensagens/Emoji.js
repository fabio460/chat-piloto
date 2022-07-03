import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { useDispatch } from 'react-redux';

const Emoji = ({hendleEmoji}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const dispath = useDispatch()
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    dispath({
      type:"emoji",
      payload:{emoji:emojiObject.emoji}
    })
    hendleEmoji()
  };
  
  return (
    <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default Emoji