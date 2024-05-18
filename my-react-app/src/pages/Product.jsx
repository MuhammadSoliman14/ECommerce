import React from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar';

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`
const ImgContainer = styled.div`
    flex:1;
`
const Image = styled.img`
    width: 100%;
    height: 70vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`
const Title = styled.div`
    font-weight: 200;
`
const Desc = styled.div`
    margin:20px 0px;
`
const Price = styled.div`
    font-weight: 100;
    font-size: 40px;
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;


const AddContainer = styled.div`
width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  `;
  
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
  justify-content: space-between;
`;

const Amount = styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
`;

const Button = styled.button`
margin:20px
padding: 15px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
&:hover{
    background-color: #f8f4f4;
}
`;
    
const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
`;

const Filter = styled.div`
display: flex;
align-items: center;
`;
const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;
const FilterSizeOption = styled.option``;

const Add = styled.button`
padding: 5px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
&:hover{
    background-color: #f8f4f4;
}

`;
const Remove= styled.button`
padding: 5px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
&:hover{
    background-color: #f8f4f4;
}
`;

    const Product = () => {
        return (
            <Container>
        <Navbar/>
        <Wrapper>
        <ImgContainer>
        <Image src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" />
        </ImgContainer>
        <InfoContainer>
            <Title>Tshirt gamed</Title>
            <Desc>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur voluptatum porro adipisci minima nemo eos aut, impedit explicabo, error alias voluptate aliquam aliquid totam odio iure placeat corporis sed. Veritatis?</Desc>
            <Price>20</Price>
            <FilterContainer>
                <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                    <FilterSizeOption>XS</FilterSizeOption>
                    <FilterSizeOption>S</FilterSizeOption>
                    <FilterSizeOption>M</FilterSizeOption>
                    <FilterSizeOption>L</FilterSizeOption>
                    <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
                </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                <Remove>-</Remove>
                <Amount>1</Amount>
                <Add>+</Add>
                </AmountContainer>
                <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
        </Wrapper>
    </Container>
  )
}

export default Product