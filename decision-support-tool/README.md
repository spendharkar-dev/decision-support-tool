# Decision Support Tool

This monorepo contains multiple services that together form the Decision Support Tool. Each service is containerized using Docker and can be orchestrated using Docker Compose.

## Services

- **Auth Service**: Handles authentication and authorization.
- **Questionnaire Service**: Manages questionnaires and user responses.
- **Reporting Service**: Generates reports based on data.
- **Data Storage Service**: Provides data storage capabilities.
- **UI**: A React-based frontend for interacting with the services.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd decision-support-tool
   ```

3. **Build and start the services**:
   ```bash
   docker-compose up --build
   ```

4. **Access the UI**:
   Open your browser and go to `http://localhost:8080`.

## Directory Structure

- `auth-service/`: Authentication service code and Dockerfile.
- `questionnaire-service/`: Questionnaire service code and Dockerfile.
- `reporting-service/`: Reporting service code and Dockerfile.
- `data-storage-service/`: Data storage service code and Dockerfile.
- `ui/`: React frontend code and Dockerfile.
- `db/`: Database migration and seed files.
- `shared/`: Shared utilities and configuration.
- `scripts/`: Automation and maintenance scripts.

## Prerequisites

- Docker
- Docker Compose

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.