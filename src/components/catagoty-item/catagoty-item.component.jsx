import './catagoty-item.styles.scss'

const CatagotyItem = ({catagory}) =>{
    const {title,imageUrl} = catagory;
    return(
        <div className='category-container'>
          <div className='background-image' style={{
            backgroundImage:  `url(${imageUrl})` 
          }}></div>
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
    )
}

export default CatagotyItem;