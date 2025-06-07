E-commerce system project ---TypeScript and Object-Oriented Progrmming---

Project Reflections:
Developing the e-commerce system using TypeScript and Object-Oriented Programming (OOP) proved to be both challenging and rewarding. I encountered some initial difficulties while implementing the Product class with private properties and getter methods, but this ultimately led to a better understanding of encapsulation and data hiding.
Creating interfaces for ProductData provided valuable insights into the data structure from the API, allowing the project to be more aligned with the output. In this process, TypeScript's type checking feature played a crucial role in identifying and correcting errors arising from inaccessible or non-existent properties.
The use of static methods in ApiService was a valuable lesson in maintaining structured organization of API calls without the need for instances. This experience emphasized the significance of proper code organization and architecture.
A notable learning experience came from working with enums for ErrorSeverity, which demonstrated the advantages of clean code over string constants. Additionally, creating custom error classes (ApiError, ValidationError) required research into extending the Error class in TypeScript, resulting in a more organized error management system.
Handling asynchronous operations was complex, but overcoming promise resolution issues and understanding async/await resulted in a deeper understanding of promise chains and error handling.
One specific challenge involved coordinating multiple async operations in the main file. By adopting a trial-and-error approach, I gained a clearer understanding of the execution flow, ensuring each operation was completed before moving on to the next.
In conclusion, this project provided an opportunity to explore TypeScript and OOP concepts in-depth, allowing me to apply the knowledge gained to real-world challenges and better understand their practical implementation.

Acknowledgements and Resources:
Thank you to my instructors: Abraham E. Tavarez and Colton Wright; as well as my fellow 2025-RTT-23 students...
Resources:
TypeScript Features and OOP Implementation:
*TypeScript Documentation: The official TypeScript documentation https://www.typescriptlang.org/docs/ offers comprehensive information on language features, including classes, interfaces, and enums.
*Object-Oriented Programming in TypeScript: amazing repo on OOP in typescript https://github.com/jafari-dev/oop-expert-with-typescript

Challenges and Solutions:
*Extending the Error Class in TypeScript: https://www.webdevtutor.net/blog/typescript-extend-exception great resource on how to extend the Error class in TypeScript.
*Understanding Error Handling in TypeScript: https://codezup.com/error-handling-in-typescript-clean-code-guide/ This article explains how to handle errors effectively in TypeScript, including custom error classes and error bubbling.

Asynchronous Operations and Error Management:
*Async/Await Tutorial: https://javascript.info/async-await This tutorial provides a comprehensive guide to using async/await in JavaScript, which can also be applied to TypeScript.
*Error Handling with Async/Await in TypeScript: https://www.webdevtutor.net/blog/typescript-error-handling-async-await#google_vignette This blog post offers insights into handling errors in asynchronous code using async/await in TypeScript.

In addition to these resources, online courses, Stack Overflow, and other community forums are super valuable sources of information and guidance when researching these topics.

Plan for build:
E-Commerce System Project Plan
1. API Research & Analysis Phase
   Objective: Understand the DummyJSON Products API structure and capabilities
   •	Study API Documentation 
   o	Identify all available endpoints (products, categories, search, single product)
   o	Understand the data structure returned by each endpoint
   o	Note required parameters and optional query strings
   o	Test endpoints using browser or Postman to see actual responses
•	Analyze Product Data Structure 
  o	List all fields returned in product objects (id, title, price, discountPercentage, etc.)
  o	Identify which fields are always present vs optional
  o	Understand data types for each field
  o	Note special considerations (e.g., discountPercentage is already calculated)
•	Identify API Limitations 
 o	Check rate limits if any
 o	Understand pagination options
 o	Note any authentication requirements (none for DummyJSON)
 o	Identify missing data (e.g., no tax information provided)
2. Requirements Analysis Phase
 Objective: Map project requirements to technical implementation
 •	Core Feature Requirements 
 o	Product display with all details
 o	Discount calculations using API data
 o	Tax calculations (custom implementation since not in API)
 o	Search functionality
 o	Category filtering
 o	Error handling for failed requests
•	Technical Requirements 
 o	TypeScript implementation with proper typing
 o	OOP design with encapsulation
 o	Asynchronous operations using async/await
 o	Modular code structure
 o	Comprehensive error handling
3. Architecture Planning Phase
 Objective: Design the system structure before coding
•	Class Design 
 o	Product class: Properties matching API response, methods for calculations
 o	ApiService class: Static methods for all API interactions
 o	Error classes: Custom error types for different scenarios
•	Module Structure 
 o	Models: Product class definition
 o	Services: API communication layer
 o	Utils: Reusable calculations (discount, tax, error handling)
 o	Main: Application entry point and orchestration
•	Data Flow Planning 
 o	API → ApiService → Product instances → Display/calculations
 o	Error flow: API errors → Error handlers → User-friendly messages
 o	State management: How to store and update product data
4. Implementation Strategy Phase
 Objective: Define the order of implementation
•	Phase 1: Foundation 
 o	Set up TypeScript project structure
 o	Create basic types and interfaces
 o	Implement Product class with core properties
•	Phase 2: API Integration 
 o	Build ApiService with basic fetch functionality
 o	Implement error handling framework
 o	Test with simple API calls
•	Phase 3: Business Logic 
 o	Implement discount calculator
 o	Create tax calculator with category-based rules
 o	Add utility functions for price formatting
•	Phase 4: Application Assembly 
 o	Create main application class
 o	Implement demonstration methods
 o	Add comprehensive error handling examples
•	Phase 5: Testing & Refinement 
 o	Test all API endpoints
 o	Verify calculations are correct
 o	Ensure error handling works properly
5. Error Handling Strategy
 Objective: Plan for potential failure points
•	API-Related Errors 
 o	Network failures
 o	Invalid endpoints (404)
 o	Server errors (5xx)
 o	Malformed responses
 •	Business Logic Errors 
 o	Invalid price calculations
 o	Missing required data
 o	Category not found for tax calculation
•	User Experience 
  o	Graceful degradation
  o	Clear error messages
  o	Recovery options
--------------------
STill in implementation phase:
7. Optional UI Planning
 Objective: Design user interface if time permits
•	Core Features 
 o	Product grid display
 o	Search functionality
 o	Category filter dropdown
o	Product detail view
 •	Technical Approach 
 o	Single HTML file with embedded styles
 o	Vanilla JavaScript for interactivity
 o	Responsive design
 o	Loading states and error displays
8. Testing Strategy
 Objective: Ensure reliability
 *	Unit Testing Approach 
 o	Test calculations independently
 o	Verify API response parsing
 o	Test error handling paths
•	Integration Testing 
 o	Full flow from API to display
 o	Error scenarios
 o	Edge cases (empty results, invalid IDs)
9. Documentation Planning
 Objective: Make code maintainable
•	Code Documentation 
 o	JSDoc comments for all public methods
 o	Inline comments for complex logic
 o	Type definitions for all data structures
•	Project Documentation 
 o	README with setup instructions
 o	API usage examples
 o	Architecture overview



