import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { plants } from "../plants";

function ProductList() {
  const dispatch = useDispatch();

  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <div className="product-list">
      <h1>Our House Plants</h1>

      {categories.map((category) => (
        <section className="plant-section" key={category}>
          <h2>{category}</h2>

          <div className="products-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />

                  <div className="plant-info">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="price">${plant.price.toFixed(2)}</p>

                    <button
                      onClick={() => dispatch(addToCart(plant))}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
