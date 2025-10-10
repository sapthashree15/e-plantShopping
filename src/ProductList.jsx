import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Calculate total quantity in cart
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  // Update total quantity when cart changes
  useEffect(() => {
    setTotalQuantity(calculateTotalQuantity());
  }, [cartItems]);

  // Handle navigation clicks
  const handleHomeClick = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowPlants(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowPlants(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Handle Add to Cart functionality
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const reactivateAddButton = (product) => {
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: false,
    }));
  };

  const checkDisabled = (name) => addedToCart[name] === true;

  // Plant categories
  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
        { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop', description: 'Calming scent, used in aromatherapy.', cost: '$20' },
        { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop', description: 'Sweet fragrance, promotes relaxation.', cost: '$18' },
      ],
    },
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '500px',
  };

  const styleA = {
    color: 'white',
    fontSize: '20px',
    textDecoration: 'none',
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={styleObj}>
        <div className="brand">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="logo"
            style={{ height: '50px', marginRight: '10px' }}
          />
          <h3>Paradise Nursery</h3>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handleHomeClick} style={styleA}>
              Home
            </a>
          </div>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              Cart ({totalQuantity})
            </a>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {!showCart && (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={checkDisabled(plant.name)}
                    >
                      {checkDisabled(plant.name) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCart && (
        <CartItem
          addedToCart={addedToCart}
          reactivateAddButton={reactivateAddButton}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
}

export default ProductList;
