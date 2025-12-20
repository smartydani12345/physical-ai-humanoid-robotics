# MCP (Model Context Protocol) Servers

This directory contains the configuration for MCP servers used in the Physical AI & Humanoid Robotics project.

## Available Servers

### 1. Context7 Server
- **Name**: `context7`
- **Purpose**: Provides access to project files, specifications, and code
- **Resources**:
  - `context7:files` - Project files and documentation
  - `context7:specs` - Project specifications
  - `context7:code` - Source code access

### 2. GitHub Server
- **Name**: `github`
- **Purpose**: Provides access to GitHub repositories, issues, and pull requests
- **Resources**:
  - `github:repos` - GitHub repositories
  - `github:issues` - GitHub issues
  - `github:pulls` - GitHub pull requests
  - `github:commits` - GitHub commits

## Configuration

The main configuration file is `config.json` which references the individual server configurations.

## Usage

To use these MCP servers, ensure your MCP client is configured to read from this directory.