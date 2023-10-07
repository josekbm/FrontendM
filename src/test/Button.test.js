import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react';
import { Button, StatusButton } from '../Components/Button'
import 'jest-styled-components';
import renderer from 'react-test-renderer';



describe('Button', () => {
  

  test('renders with background color red for delete', () => {
    
    const tree = renderer.create(<Button type="delete"/>).toJSON()
    expect(tree).toHaveStyleRule('background-color', '#E23428')

  });

  test('renders with background color green the other cases', () => {

    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toHaveStyleRule('background-color', 'rgb(19, 88, 70)')

  });

});

describe('StatusButton', () => {
    
  
  test('renders with green colors for CHECK IN', () => {

    const tree = renderer.create(<StatusButton status="CHECK IN"/>).toJSON()
    expect(tree).toHaveStyleRule('color', 'rgb(90, 208, 122)')
    expect(tree).toHaveStyleRule('background-color', 'rgb(232, 255, 238)')
    
  });

  test('renders with red colors for CHECK OUT', () => {

    const tree = renderer.create(<StatusButton status="CHECK OUT"/>).toJSON()
    expect(tree).toHaveStyleRule('color', '#E23428')
    expect(tree).toHaveStyleRule('background-color', '#FFEDEC')
    
  });

  test('renders with yellow colors for IN PROGRESS', () => {

    const tree = renderer.create(<StatusButton status="IN PROGRESS"/>).toJSON()
    expect(tree).toHaveStyleRule('color', '#ebd90d')
    expect(tree).toHaveStyleRule('background-color', '#fffeeb')
    
  });


});