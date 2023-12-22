# EMI Calculator Project

## Front-End (React with TypeScript)

### Installation & Setup

1. **Install Node.js**: Version 20.5.0 recommended.
2. **Install NPM**: Version 10.2.5 or higher.
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run Integration Tests**:
   ```bash
   npm run test
   ```
5. **Start the Application**:
   ```bash
   npm run start
   ```
   - The application will be available at `localhost:8080`. Note: This port might change if already in use.
6. **(Optional) Build for Production**:
   ```bash
   npm run build
   ```

### Features & Components

- **Tech Stack**: React with TypeScript, SASS & Tailwind for styling, Jest & Mocha/Chai for testing, Webpack for bundling.
- **Main Component**: `EmiCalculator.tsx` handles application state and form.
- **Validation**: Both front-end and API validation are implemented. Front-end shows red warnings for invalid inputs. API requests are halted until errors are resolved.
- **Testing Back-end Validation**: Modify `FormValidations.tsx` to send incorrect values and observe API responses or run the tests to see if it's working.
- **Images**: Sourced from free-to-use websites.

## Back-End (Java with Maven & Spring)

### Installation & Setup

1. **Java JDK**: Use/Install Java 17 JDK.
2. **Install Maven**.
3. **Install Dependencies**:
   ```bash
   mvn clean install
   ```
4. **Run Unit Tests**:
   ```bash
   mvn test
   ```
5. **Start the Application**:
   ```bash
   mvn spring-boot:run
   ```
   - The application will be running on `localhost:3000`. Note: This port might change if already in use.

### Database Access

- **H2 In-Memory DB Dashboard**: Navigate to `http://localhost:8080/h2-console/`.
  - Driver: `org.h2.Driver`
  - URL: `jdbc:h2:mem:emidb`
  - Username: `rabobank`
  - Password: `rabobank`

### Back-End Architecture

- **Documentation**: Complete Javadoc for context.
- **Components**:
  - **Controller**: Manages the API.
  - **EmiEntity**: Used for processing.
  - **Models**: For API requests and responses.
  - **Repository**: For DB management.
  - **Service**: Contains the actual EMI logic.
  - **ValidationException**: Throwns an Exception if the request validation is invalid.
- **Testing**: Includes 2 unit tests.

### Additional Notes

- **Environment**: Java application was run in Windows, and the front-end in a WSL environment. This setup led to CORS issues (blocked requests), resolved by allowing specific origins (internal IP and localhost). Adjust the `@CrossOrigin` annotation as needed if this issue also occurs for you. For a wildcard use `@CrossOrigin(origins = "*")`
- **Development Tools**: PhpStorm for the front-end and IntelliJ for the back-end. API testing done using Postman and built-in tests.

### Contact & Acknowledgements

- **Contact**: For any queries or feedback regarding the code or decisions made, please feel free to reach out.
- **Duration**: Approximately 8 hours spent on development.
- **Closing Remarks**: Enjoyed working on this project and appreciate the opportunity.


## Extra commands I ran for context

**mvn --version**:

- Apache Maven 3.8.5 (3599d3414f046de2324203b78ddcf9b5e4388aa0)
- Maven home: C:\Program Files\apache-maven-3.8.5
- Java version: 17.0.1, vendor: Eclipse Adoptium, runtime: C:\Program Files\Eclipse Adoptium\jdk-17.0.1.12-hotspot
- Default locale: en_GB, platform encoding: Cp1252
- OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"

**java --version**:

- openjdk 17.0.1 2021-10-19
- OpenJDK Runtime Environment Temurin-17.0.1+12 (build 17.0.1+12)
- OpenJDK 64-Bit Server VM Temurin-17.0.1+12 (build 17.0.1+12, mixed mode, sharing)

**npm --version**:

- 10.2.5

**node --version**:

- v20.5.0
