import React from 'react';
import { StyleSheet, Image, Modal, StatusBar } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Colors } from '../../consts/theme';
import { windowHeight, windowWidth } from '../../consts/app';

interface SourceRenderProps {
  onOpen: () => void;
}

interface Props {
  src: string;
  sourceRender: (props: SourceRenderProps) => React.ReactNode;
}

const ImageViewer: React.FC<Props> = (props) => {
  const { sourceRender, src } = props;
  const [show, setShow] = React.useState(false);

  const handleClose = React.useCallback(() => {
    StatusBar.setHidden(false, 'slide');
    setShow(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    StatusBar.setHidden(true, 'slide');
    setShow(true);
  }, []);

  return (
    <>
      {sourceRender({ onOpen: handleOpen })}
      {show && (
        <Modal visible={show} onRequestClose={handleClose} animationType="fade">
          <ImageZoom
            style={styles.imageZoom}
            useNativeDriver
            swipeDownThreshold={150}
            onSwipeDown={handleClose}
            cropWidth={windowWidth}
            cropHeight={windowHeight}
            enableSwipeDown
            imageWidth={windowWidth}
            imageHeight={windowHeight}>
            <Image source={{ uri: src }} style={styles.image} />
          </ImageZoom>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageZoom: {
    backgroundColor: Colors.Black,
  },
  image: {
    opacity: 1,
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'contain',
  },
});

export default ImageViewer;
