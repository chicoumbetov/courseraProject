import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

//const DishDetail = (dish) => {
class DishDetail extends Component {

    renderDish(dish) {
        console.log("renderDish")
        return (
            <div className="col-12 col-md-5 m-1">
                <Card  >
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }


    renderComments(comments) {
        console.log("renderComments")
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p> ^_^ {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {

        if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDish(this.props.dish)}
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }


}

export default DishDetail;

//{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}