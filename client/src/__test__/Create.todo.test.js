import { render, screen, fireEvent } from "@testing-library/react";
import MakeTodo from "../components/MakeTodo";
import axios from "axios";
import "@testing-library/jest-dom"


jest.mock("axios");

describe("MakeTodo Component", () => {
  const mockSetShowInput = jest.fn();
  const mockSetTodoValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with all elements", () => {
    render(
      <MakeTodo
        setShowInput={mockSetShowInput}
        setTodoValue={mockSetTodoValue}
      />
    );


    expect(screen.getByText("Create your Todo")).toBeInTheDocument();


    expect(screen.getByPlaceholderText("Enter the title")).toBeInTheDocument();


    expect(
      screen.getByPlaceholderText("Enter your Description")
    ).toBeInTheDocument();


    expect(screen.getByRole("button", { name: "Create Todo" })).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    render(
      <MakeTodo
        setShowInput={mockSetShowInput}
        setTodoValue={mockSetTodoValue}
      />
    );

    const titleInput = screen.getByPlaceholderText("Enter the title");
    const descriptionTextarea = screen.getByPlaceholderText(
      "Enter your Description"
    );


    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    expect(titleInput.value).toBe("Test Title");


    fireEvent.change(descriptionTextarea, {
      target: { value: "Test Description" },
    });
    expect(descriptionTextarea.value).toBe("Test Description");
  });

  test("calls the API and updates state on form submission", async () => {
    const newTodo = { id: 1, title: "Test Title", description: "Test Description" };
  
    // Mock the axios post request
    axios.post.mockResolvedValue({
      data: {
        success: true,
        data: newTodo,
      },
    });
  
    render(
      <MakeTodo
        setShowInput={mockSetShowInput}
        setTodoValue={mockSetTodoValue}
      />
    );
  
    const titleInput = screen.getByPlaceholderText("Enter the title");
    const descriptionTextarea = screen.getByPlaceholderText("Enter your Description");
    const submitButton = screen.getByRole("button", { name: "Create Todo" });
  
    // Fill out the form
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionTextarea, { target: { value: "Test Description" } });
  
    // Simulate form submission
    fireEvent.click(submitButton);
  
    // Ensure the API call was made with the correct payload
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/todo/createTodo",
      {
        todo: {
          title: "Test Title",
          description: "Test Description",
          status: "Active",
        },
      }
    );
  
    // Wait for async state updates
    await screen.findByText("Create your Todo");
  
    // Capture the function passed to mockSetTodoValue
    const capturedFunction = mockSetTodoValue.mock.calls[0][0];
    const updatedState = capturedFunction([]); // Simulate invoking with empty initial state
  

    expect(updatedState).toEqual([newTodo]);
  
    
    expect(mockSetShowInput).toHaveBeenCalledWith(false);
  });
  

  test("closes the modal on close icon click", () => {
    render(
      <MakeTodo setShowInput={mockSetShowInput} setTodoValue={mockSetTodoValue} />
    );
  

    const closeButton = screen.getByTestId("close-icon");
  

    fireEvent.click(closeButton);
  

    expect(mockSetShowInput).toHaveBeenCalledWith(false);
  })
})
  
