import Sound from 'react-native-sound';

const PlaySound = (sound) => {
    try {
      const click = new Sound(sound, error => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(
          'duration in seconds: ' +
            click.getDuration() +
            'number of channels: ' +
            click.getNumberOfChannels(),
        );
        click.play(success => {
          success
            ? console.log('sound played')
            : console.error('sound did not play');
        });
    });
    click.release()
    // click.reset()
    } catch (e) {
      console.error(e);
    }
  };

export default PlaySound;