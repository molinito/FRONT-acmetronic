import React, { useState } from "react";
import "./Reviews.css";
import image from "../../Assets/rate.png";
import { postComments,} from "../../redux/actions";
import { useDispatch } from "react-redux";

function Reviews(product) {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        id: product.product,
        comments: ""
    })
    const handleChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        
    }
    function handleSubmit(e) {
        dispatch(postComments(state))

        setState({
            id: "",
            comments: ""
        })
    }
    return (

        <div className="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" >
                    <div className="text-right cross"> <i class="fa fa-times mr-2"></i> </div>
                    <div className="card-body text-center"> <img src={image} height="100" width="100" />
                        <div className="comment-box text-center">
                            <h4>Add a comment</h4>
                            <div className="rating"> <input type="radio" name="rating" value="5" id="5" /><label for="5">☆</label> <input type="radio" name="rating" value="4" id="4" /><label for="4">☆</label> <input type="radio" name="rating" value="3" id="3" /><label for="3">☆</label> <input type="radio" name="rating" value="2" id="2" /><label for="2">☆</label> <input type="radio" name="rating" value="1" id="1" /><label for="1">☆</label> </div>
                            <div className="comment-area"> <textarea onChange={(e) => handleChange(e)} name="comments" className="form-control" placeholder="what is your view?" rows="4"></textarea> </div>

                            <div className="text-center mt-4"> <button onClick={(e) => handleSubmit(e)} className="btn btn-success send px-5" style={{ width: "100%" }}><a href={`/shop/${product.product}`}>Send message</a> <i className="fa fa-long-arrow-right ml-2"></i></button>
                                <p>By clicking on the button, you agree to our <a href="#">Terms and Conditions</a></p>
                                <br></br>
                                <button  style={{ width: "100%", height: "100%", fontSize: "20px" }}><a href={`/shop`}>Back to Shop</a></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Reviews;

