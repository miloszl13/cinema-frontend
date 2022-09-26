import styled from 'styled-components';

export const StyledButton = styled.button`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    justify-content: center;
    background-color: #9d1111;
    height: 50px;
    width: 180px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    margin-left: 2%;
    margin-bottom: 2%;
  
  
  &:hover {
    background-color: #dae1e7;
    color: black;
    cursor:pointer;
    transition: 0.3s ease-in;
  }
  
`