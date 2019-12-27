import React, { useState } from 'react';
import { withFirebase } from '../Firebase/context';
import { useAuthContext } from '../Sessions/context';
import shortid from 'shortid';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { storage } from 'firebase';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImageUploader = ({
  onRequestSave,
  onRequestClear,
  defaultFiles = [],
  firebase
}) => {
  const [files, setFiles] = useState(defaultFiles);
  const authUser = useAuthContext();
  const id = authUser.authUser.uid;

  const server = {
    process: (fieldName, file, metaData, load, error, progress, abort) => {
      const task = firebase.storageRef.child('images/' + id).put(file, {
        contentType: 'image/jpeg' || 'image/png'
      });

      task.on(
        firebase.stateChanged,
        snap => {
          progress(true, snap.bytesTransferred, snap.totalBytes);
        },
        err => {
          error(err.message);
        },
        () => {
          load(id);
          onRequestSave(id);
        }
      );
    },

    // *** Loads an already uploaded image to firebase
    load: (source, load, error, progress, abort) => {
      progress(true, 0, 1024);

      firebase.storageRef
        .child('images/' + source)
        .getDownloadURL()
        .then(url => {
          let xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            let blob = xhr.response;
            load(blob);
          };
          xhr.open('GET', url);
          xhr.send();
        })
        .catch(err => {
          error(err.message);
          abort();
        });
    }
  };
  return (
    <div>
      <FilePond
        files={files}
        allowMultiple={false}
        maxFiles={1}
        onupdatefiles={fileItems => {
          if (fileItems.length === 0) {
            onRequestClear();
          }
          setFiles(fileItems.map(fileItem => fileItem.file));
        }}
        server={server}
      />
    </div>
  );
};

export default withFirebase(ImageUploader);
