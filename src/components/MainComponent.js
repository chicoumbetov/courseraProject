import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import { DISHES } from "../shared/dishes";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
        console.log("onDishSelect")
    }

    render() {

        const HomePage = () => {
            return(
                <Home/>
            )
        }

        return (

            <div >
                <Header />
                <Switch>
                    < Route path="/home" component={HomePage} />
                    < Route exact path="/menu" component={() => < Menu dishes={this.state.dishes} />} />
                    <Redirect to="/home" />
                </Switch>

                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}
                />
                <Footer />

            </div>

        );
    }

}

export default Main;
