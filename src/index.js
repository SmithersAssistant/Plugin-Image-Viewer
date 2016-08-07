import React from 'react';
import {clipboard} from 'electron';
import {imageExists} from './helpers';
import actions from './actions';

const IMAGE_COMPONENT = 'com.robinmalfait.image-viewer';

export default robot => {
  const {Blank} = robot.cards
  const {A} = robot.UI

  const Image = ({ url, ...other }) => (
    <Blank
      {...other}
      title={<A target="_blank" href={url}>{url}</A>}
      actions={actions(robot, url)}
    >
      <div style={{textAlign: 'center'}}>
        <img style={{maxWidth: '100%'}} src={url}/>
      </div>
    </Blank>
  )

  robot.registerComponent(Image, IMAGE_COMPONENT);

  robot.listen(/^img (.*)$/, {
    description: "View an image",
    usage: 'img <img>'
  }, (res) => {
    const url = res.matches[1];
    imageExists(url, (exists) => {
      if (exists) {
        robot.addCard(IMAGE_COMPONENT, { url })
      } else {
        robot.notify("This does not look like a valid url...")
      }
    })
  })
}
