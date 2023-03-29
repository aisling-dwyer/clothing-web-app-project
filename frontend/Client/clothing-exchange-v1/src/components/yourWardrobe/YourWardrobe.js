import {useEffect, useRef, userRef} from "react";
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ClothingItem from "../clothingItem/ClothingItem";

import React from 'react';


const YourWardrobe = ({getUserData, user, clothingItems, setClothingItemToBeAdded}) => {

    const revText = useRef();
    let params = useParams();
    const itemId = params.id;

    useEffect(() => {
        getUserData(id);

    }, [])

    const addClothingItem = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post("/clothingitems/addclothingitem", {type: rev.value, id: id})
            const updatedClothingItems = [...clothingItems, {type:revText.value}];
    
            rev.value = "";
    
            setClothingItems(updatedClothingItems);
        }
        catch(err) {
            console.error(err);
        }
      
    }

    return (
        <Container>
            <Row>
                <Col><h3>Clothing Items</h3></Col>
            </Row>
            <Row className = "mt-2">
                <Col>
                    <img src={clothingItems?.url}></img>
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ClothingItem handleSubmit={addClothingItem} revText={revText} labelText="Add A Clothing Item To Your Wardrobe"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        clothingItems?.map((clothingItem) => {
                            return(
                                <>
                                    <Row>
                                        <Col>{clothingItem.type}</Col>
                                        {/* <Col>{clothingItem.size}</Col>
                                        <Col>{clothingItem.colour}</Col>
                                        <Col>{clothingItem.available}</Col>
                                        <Col>{clothingItem.url}</Col> */}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default YourWardrobe;