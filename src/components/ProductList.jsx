import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import { plants } from "../plants";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const isInCart = (plantId) =>
    cartItems.some((item) => item.id === plantId);

  return (
    <main className="product-list">
      <h1>Our House Plants</h1>

      {categories.map((category) => {
        const categoryPlants = plants.filter(
          (plant) => plant.category === category
        );

        return (
          <section className="plant-section" key={category}>
            <h2>{category}</h2>

            <div className="products-grid">
              {categoryPlants.map((plant) => {
                const addedToCart = isInCart(plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                    />

                    <div className="plant-info">
                      <h3>{plant.name}</h3>

                      <p>{plant.description}</p>

                      <p className="price">
                        ${plant.price.toFixed(2)}
                      </p>

                      <button
                        type="button"
                        onClick={() => dispatch(addItem(plant))}
                        disabled={addedToCart}
                      >
                        {addedToCart
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default ProductList;
