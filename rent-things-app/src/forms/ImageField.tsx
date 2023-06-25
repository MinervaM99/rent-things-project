import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

import { InputLabel } from "@mui/material";

export default function ImageField(props: imageFieldProps) {
  const [imgBase64, setImgBase64] = useState("");
  const [imgURL, setImgURL] = useState(props.imgURL);
  const {values} = useFormikContext<any>();

  const divStyle = {marginTop: '10px'};
  const imgStyle = {width:"450px"};

  const handleOnChange = (eventsArgs: ChangeEvent<HTMLInputElement>) => {
    if (eventsArgs.currentTarget.files) {
      const file = eventsArgs.currentTarget.files[0];
      if (file) {
        toBase64(file)
          .then((base64Representeation: string) =>
            setImgBase64(base64Representeation))
          .catch((error) => console.log(error));
          values[props.field] = file;
          setImgURL('');
      } else {
      }
    }
  };

  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="mb-5">
      <InputLabel>{props.displayName}</InputLabel>
      <div>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
      </div>
      {imgBase64 ?
        <div>
          <div style={divStyle}>
            <img style={imgStyle} src={imgBase64} alt="selected"/>

          </div>
        </div> : null}
        {imgURL ?
        <div>
          <div style={divStyle}>
            <img style={imgStyle} src={imgURL} alt="selected"/>
          </div>
        </div> : null}
    </div>
  );
}

interface imageFieldProps {
  displayName: string;
  imgURL: string;
  field: string;
}

ImageField.defaultProps = {
  imgURL: ''
}

