import {CSSProperties} from "react";
import CircleLoader from 'react-spinners/CircleLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
  color: 'red'
}

const Spinner = () => {
  return (
    <CircleLoader
      color={'red'}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}

export default Spinner;
