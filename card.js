function Card(props) {
  const { useState } = React
  const [ImageValue, setImageValue] = useState(true)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <button className={ImageValue ? 'active' : 'disable'} onClick={handleClick}>{`Hello ${
      props.text
    }  ${ImageValue}`}</button>
  )
}
