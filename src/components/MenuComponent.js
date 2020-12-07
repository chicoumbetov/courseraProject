import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

class Menu extends Component {

    render() {
        const menu = this.props.dishes.map((dish) => {
            console.log("menu render")
            return (

                <div key={dish.image} className="col-12 col-md-5 m-1">
                    <Card key={dish.id}
                          onClick={() => this.props.onClick(dish.id)}>

                        <CardImg key={dish.image} width="100%"
                            src={dish.image}
                            alt={dish.name} />

                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>

                    </Card>
                </div>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        )

    }
}

export default Menu;