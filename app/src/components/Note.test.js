import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const component = render(<Note note={note} />)

    component.getByText('This is a test')
    component.getByText('make not important')
    //component.debug()
    //expect(component.container).toHaveTextContent(note.content)
})

test('clicking the button calls event hanler once', () =>{
    const note = {
        content: 'This is a test',
        important: true
    }

    const mockHandle = jest.fn()
    const component = render(<Note note={note} toggleImportance={mockHandle} />)

    const button = component.getByText('make not important')
    
    fireEvent.click(button) 
    fireEvent.click(button) 

    expect(mockHandle).toHaveBeenCalledTimes(2)
})