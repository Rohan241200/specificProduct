import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

class ProductItemDetails extends Component {
  state = {similarProducts: []}

  componentDidMount() {
    this.getProductsDetails()
  }

  getProductsDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      `http://localhost:3000/products/${id}`,
      options,
    )
    console.log(response)

    const data = await response.json()
    const updatedData = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      price: data.price,
      description: data.description,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
    }
    console.log(data)
    console.log(updatedData)
  }

  render() {
    const {similarProducts} = this.state
    return (
      <>
        <Header />
        <div className="products-details-container">
          <div>
            <img src="" alt="" />
            <div>
              <h1>Name</h1>
              <p>Rs</p>
              <div>
                <p>rating</p>
                <p>review</p>
              </div>
              <p>Description</p>
              <p>
                Available : <span>In</span>
              </p>
              <p>
                Brand : <span>A</span>
              </p>
              <br />
              <div>
                <i type="button" data-testid="plus" className="itembtn">
                  <BsDashSquare className="icon" />
                </i>
                <p>1</p>
                <i type="button" data-testid="minus" className="itembtn">
                  <BsPlusSquare className="icon" />
                </i>
              </div>
              <button type="button">ADD TO CART</button>
            </div>
          </div>
          <h1>Similar Products</h1>
          {similarProducts}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
