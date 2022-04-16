import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';

const AudioSetting = ({mute=false, onMute = f => f}) => {
  const [muted, setMuted] = useState(mute);

  return (
      <TouchableOpacity
        onPress={() => {setMuted(!muted); onMute(!muted);}}>
        <Image
          style={{ width: 24, height: 24 }}
          source={muted ? require('../assets/mute.png') : require('../assets/unmute.png')}
        />
      </TouchableOpacity>
  );
}

export default AudioSetting;
