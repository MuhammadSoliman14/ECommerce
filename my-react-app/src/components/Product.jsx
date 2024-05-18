  import styled from "styled-components";
  

  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
    &:hover{
        background-color:#F8F0E3
    }
  `;
  
  const Product = ({ item }) => {
    return (
      <Container>
        <Circle />
        <Image src={item.img} />
        
      </Container>
    );
  };
  
  export default Product;