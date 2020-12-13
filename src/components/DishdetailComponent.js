import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

const RenderDish = ({ dish }) => {
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
};


function RenderComments({ comments }) {
    console.log("renderComments invoked")

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

const DishDetail = (props) => {
    console.log("Dishdetail render invoked")

    if (props.dish != null) {
        return (
            <div className="container">

                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </Breadcrumb>
                </div>

                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>

            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default DishDetail;