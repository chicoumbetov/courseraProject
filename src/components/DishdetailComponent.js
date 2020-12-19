import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalBody, ModalHeader, FormGroup, Label,
    Row, Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//receives value and checks if value is greater than 0
//const required = (val) => (val) && (val.length >= 0);
//receives lenth as a parameter and value. 
//This will check and make sure that entered length is below or above of specified length.
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

const RenderDish = ({ dish }) => {
    console.log("renderDish")
    return (
        <div className="col-12 col-md-5 m-1">
            <Card  >
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
};

function RenderComments({ comments, addComment, dishId }) {
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
                <CommentForm dishId={dishId} addComment={addComment} />

            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment )
        console.log("Current State is: " + JSON.stringify(values))
        //alert("Current State is: " + JSON.stringify(values))
    }

    render() {
        return (

            <div className="container">
                <div className="row row-content">
                    <div >
                        <Button outline onClick={this.toggleModal}
                            type="submit" color="primary"
                        > Submit Comment</Button>

                        <Modal isOpen={this.state.isModalOpen}
                            toggle={this.toggleModal}
                        >

                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                                    <FormGroup>
                                        <Label htmlFor="author">Your Name</Label>
                                        <Col md={13}>
                                            <Control.text model=".author" id="author" name="author"
                                                placeholder="Your name"
                                                className="form-control"
                                                validators={{
                                                    minLength: minLength(3), maxLength: maxLength(15)
                                                }} />

                                            <Errors className="text-danger" model=".author"
                                                id="author"
                                                show="touched" messages={{
                                                    minLength: "Must be greater than 3 characters",
                                                    maxLength: "Must be 15 characters or less"
                                                }}
                                            />

                                        </Col>
                                    </FormGroup>



                                    <FormGroup>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".contactType" name="contactType"
                                            className="form-control"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </Control.select>
                                    </FormGroup>

                                    <FormGroup className="form-group">
                                        <Label htmlFor="comment" >Comment</Label>
                                        <Col md={13}>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="6" className="form-control" placeholder="Comment"
                                            />
                                        </Col>
                                    </FormGroup>

                                    <Row className="form-group">
                                        <Col md={{ size: 10 }}>
                                            <Button type="submit" color="primary">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>

                                </LocalForm>
                            </ModalBody>

                        </Modal>

                    </div>
                </div>
            </div>

        )
    }
}

const DishDetail = (props) => {
    console.log("Dishdetail render invoked")

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.dish != null) {
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
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
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